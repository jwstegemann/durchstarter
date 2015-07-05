package durchstarter.api

import scala.concurrent.duration._
import scala.util.{ Success, Failure }
import akka.pattern.ask
import akka.actor.ActorLogging
import spray.routing.{ HttpService, RequestContext }
import spray.routing.directives.CachingDirectives
import spray.util._
import spray.http._
import MediaTypes._
import CachingDirectives._
import spray.http.HttpHeaders._
import spray.http.CacheDirectives._
import spray.httpx.encoding.Gzip
import spray.httpx.TwirlSupport
import spray.httpx.TwirlSupport._


// this trait defines our service behavior independently from the service actor
trait TwirlHttpService extends HttpService with TwirlSupport { self : ActorLogging =>

  //TODO: configure cache
  lazy val twirlCache = routeCache(maxCapacity = 200, timeToIdle = Duration("12 h"))

  val twirlRoute = {
    pathPrefix("info") {
      path(Segment) { ort: String =>
        get {
          dynamic {
            respondWithMediaType(`text/html`) {
              respondWithHeader(`Cache-Control`(`max-age`(86400))) {
                encodeResponse(Gzip) {
                  cache(twirlCache) {
                    complete(durchstarter.info.html.info(ort).toString)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
