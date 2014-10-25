package durchstarter.api

import spray.http._
import spray.routing._
import scala.concurrent.ExecutionContext
import akka.actor.{Actor, ActorRef, ActorLogging}
import akka.pattern.ask
import akka.util.Timeout
import scala.concurrent.duration.DurationInt
import spray.json._
import spray.httpx.marshalling._
import spray.httpx.SprayJsonSupport

import scala.concurrent.future

import durchstarter.core.elasticsearch._
import durchstarter.core.QueryDatenplaetzeActor._
import durchstarter.domain._

import StatusCode._


trait QueryHttpService extends HttpService with SprayJsonSupport { 

  import ElasticSearchProtocol._

  private val queryDatenplaetzeActor = actorRefFactory.actorSelection("/user/queryDatenplaetze")

  private implicit val timeout = new Timeout(5.seconds)
  private implicit def executionContext = actorRefFactory.dispatcher


  def queryRoute =
    pathPrefix("datenplaetze") {
      path(Segment) { ort: String =>
        get {
          dynamic {
            //FixMe: we do not need a Message-Type Fulltext here...
            complete((queryDatenplaetzeActor ? GetDatenplaetze(ort)).mapTo[QueryResult])
          }
        }
      }
    } ~
    pathPrefix("ort") {
      path("suggest" / Segment) { text: String =>
        get {
          dynamic {
            //FixMe: we do not need a Message-Type Fulltext here...
            complete((queryDatenplaetzeActor ? SuggestOrte(text)).mapTo[SuggestResult[Ort]])
          }
        }
      }
    } 
}