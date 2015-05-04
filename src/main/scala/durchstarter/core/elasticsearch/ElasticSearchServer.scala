package durchstarter.core.elasticsearch

import scala.concurrent.Future

import spray.httpx.SprayJsonSupport
import spray.json._
import spray.http._

import spray.client.pipelining._

import spray.can.Http
import spray.httpx.SprayJsonSupport
import spray.client.pipelining._
import spray.util._
import spray.httpx.unmarshalling.FromResponseUnmarshaller

import akka.actor.ActorSystem
import akka.event.Logging

import durchstarter.domain._

import durchstarter.core.util.Converters
import durchstarter.core.UsingParams

import org.joda.time.{DateTime, Years, Months, Weeks, Days}


case class ElasticSearchException(val message: String) extends Exception


object ElasticSearchServer {
  //ToDo: externalize this for both server types
  val WithCredentials = """(http|https)://([\w\.-]+):([\w\.-]+)@([\w\.-]+):(\d+)""".r
  val WithoutCredentials = """(http|https)://([\w\.-]+):(\d+)""".r

  def default(implicit actorSystem: ActorSystem) : ElasticSearchServer = {
    val db_server = scala.util.Properties.envOrElse("ELASTICSEARCH_URL", "http://localhost:9200")

    db_server match {
      case WithCredentials(protocol,username,password,host,port) =>
        ElasticSearchServer(s"$protocol://$host:$port", Some(BasicHttpCredentials(username, password)))
      case WithoutCredentials(protocol,host,port) =>
        ElasticSearchServer(s"$protocol://$host:$port", None)
      case _ => throw ElasticSearchException(s"invalid url for ElasticSearchServer: $db_server")
    }

  }

}

case class ElasticSearchServer(url: String, credentialsOption: Option[BasicHttpCredentials])(implicit val actorSystem: ActorSystem) extends DefaultJsonProtocol with SprayJsonSupport with UsingParams {

  import actorSystem.dispatcher

  import ElasticSearchProtocol._
  import DurchstarterProtocol._

  val log = Logging(actorSystem, classOf[ElasticSearchServer])

  log.info(s"created ElasticSearchServer @ $url with credentials: $credentialsOption")


  val queryDatenplaetzeUrl = s"$url/datenplaetze/datenplatz/_search"
  val queryOrteUrl = s"$url/orte/ort/_search"
  val orteSuggestUrl = s"$url/orte/_suggest"

  // interpret the HttpResponse and throw a Neo4JException if necessary
  val mapToElasticSeachException: HttpResponse => HttpResponse = { response =>
    log.debug("Elastic-Search-Response: {}", response)
    if (!response.status.isSuccess) throw new Exception(response.entity.asString)
    response
  }

  // just forget the Response
  val forgetResponse: HttpResponse => Unit = {
    response => Unit
  }

  val send = credentialsOption match {
    case Some(credentials) => (addCredentials(credentials) ~> sendReceive)
    case None => sendReceive
  }

  // pipeline for queries that should return something
  final def pipeline[T]()(implicit unmarshaller: FromResponseUnmarshaller[QueryResult[T]]): HttpRequest => Future[QueryResult[T]] = (
    addHeader("Accept","application/json; charset=UTF-8")
    ~> send
    ~> mapToElasticSeachException
    ~> unmarshal[QueryResult[T]]
  )

  // pipeline for queries that should return something
  final def pipelineSuggest: HttpRequest => Future[SuggestResult[Ort]] = (
    addHeader("Accept","application/json; charset=UTF-8")
    ~> send
    ~> mapToElasticSeachException
    ~> unmarshal[SuggestResult[Ort]]
  )

  // pipeline for queries just to be executed
  final val pipelineRaw: HttpRequest => Future[Unit] = (
    send
    ~> mapToElasticSeachException
    ~> forgetResponse
  )


  def queryDatenplaetze(ort: String): Future[QueryResult[Datenplatz]] = {
    val queryObject = JsObject(
      ("query", JsObject(
        ("term", JsObject(
          ("ort", JsString(ort))
        ))
      )),
      ("size", JsNumber(50))
    )

    log.debug("ElasticSearch-QueryDatenplaetze-Request: {}", queryObject)
    val p2 = pipeline[Datenplatz]();
    p2(Get(queryDatenplaetzeUrl, queryObject)) recover {
        case x => throw ElasticSearchException(s"Error retrieving response from ElasticSearch-server: $x")
    }
  }

  def queryOrte(query: String): Future[QueryResult[Ort]] = {
    val queryObject = JsObject(
      ("query", JsObject(
        ("multi_match", JsObject(
          ("fields", JsArray(
            JsString("plz"),
            JsString("gemeinde")
          )),
          ("query", JsString(query)),
          ("type", JsString("phrase_prefix"))
        ))
      )),
      ("size", JsNumber(100))
    )

    log.debug("ElasticSearch-QueryOrte-Request: {}", queryObject)
    val p2 = pipeline[Ort]()
    p2(Get(queryOrteUrl, queryObject)) recover {
        case x => throw ElasticSearchException(s"Error retrieving response from ElasticSearch-server: $x")
    }
  }


  def suggest(url: String, field: String, text: String): Future[SuggestResult[Ort]] = {
    val queryObject = JsObject(
      ("suggest", JsObject(
        ("text", JsString(text)),
        ("completion", JsObject(
          ("field", JsString(field)),
          ("size", JsNumber(10))
        ))
    )))

    log.debug("ElasticSearch-Suggestion-Request: {}", queryObject)
    pipelineSuggest(Get(url, queryObject)) recover {
      case x => throw ElasticSearchException(s"Error retrieving response from ElasticSearch-server: $x")
    }
  }

  def suggestOrte(text: String) = suggest(orteSuggestUrl, "bezeichnung", text)

}
