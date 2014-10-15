package durchstarter.api

import scala.language.postfixOps

import akka.actor.{ActorLogging, Actor}
import akka.pattern._
import akka.util.Timeout

import scala.concurrent.duration.DurationInt
import scala.concurrent.Future

import spray.http.StatusCodes._
import spray.http._
import spray.routing._
import spray.util.{SprayActorLogging, LoggingContext}
import spray.httpx.SprayJsonSupport
import spray.routing.authentication._
import scala.concurrent.ExecutionContext
import spray.httpx.marshalling.Marshaller
import spray.http.HttpHeaders.RawHeader

import spray.http.HttpHeaders._

class RootServiceActor extends Actor with ActorLogging with HttpService with SprayJsonSupport 
  with StaticHttpService with QueryHttpService {

  def actorRefFactory = context
  implicit def executionContext = context.dispatcher

  //FixMe: reduce it again!
  private implicit val timeout = new Timeout(60 seconds)


  def receive = runRoute(
    queryRoute ~
    staticRoute ~
    pathSingleSlash {
      redirect("/app/index.html", MovedPermanently)
    }
  )
}
