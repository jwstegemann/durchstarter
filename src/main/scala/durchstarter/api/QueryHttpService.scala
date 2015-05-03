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
  import DurchstarterProtocol._

  private val queryDatenplaetzeActor = actorRefFactory.actorSelection("/user/queryDatenplaetze")
//  private val emailActor =

  private implicit val timeout = new Timeout(5.seconds)
  private implicit def executionContext = actorRefFactory.dispatcher


  def queryRoute =
    pathPrefix("datenplaetze") {
      path(Segment) { ort: String =>
        get {
          dynamic {
            //FixMe: we do not need a Message-Type Fulltext here...
            complete((queryDatenplaetzeActor ? GetDatenplaetze(ort)).mapTo[QueryResult[Datenplatz]])
          }
        }
      }
    } ~
    pathPrefix("orte") {
      path(Segment) { text: String =>
        get {
          dynamic {
            //FixMe: we do not need a Message-Type Fulltext here...
            complete((queryDatenplaetzeActor ? QueryOrte(text)).mapTo[QueryResult[Ort]])
          }
        }
      }
    } ~
    path("newsletter" / "1") {
      put {
        entity(as[NewsletterRequest]) { newsletter =>
          val emailActor = actorRefFactory.actorSelection("/user/email")

          emailActor ! newsletter
          complete(StatusCodes.OK)
        }
      }
    } ~
    path("angebot" / "2") {
      put {
        entity(as[AngebotRequest]) { angebot =>
          val emailActor = actorRefFactory.actorSelection("/user/email")

          emailActor ! angebot
          complete(StatusCodes.OK)
        }
      }
    }
}
