package durchstarter.core

import akka.actor.{Actor, ActorLogging}
import akka.pattern._

import durchstarter.core.util.Failable

import durchstarter.core.elasticsearch._


object QueryDatenplaetzeActor {

  case class SuggestOrte(text: String)
  case class GetDatenplaetze(ort: String)
  case class QueryOrte(text: String)
}

/**
 * Registers the users. Replies with
 */
class QueryDatenplaetzeActor extends Actor with ActorLogging with Failable {

  import QueryDatenplaetzeActor._

  implicit def executionContext = context.dispatcher
  implicit val system = context.system

  final val server = ElasticSearchServer.default

	override def preStart =  {
    log.info(s"QueryDatenplaetzeActor started at: {}", self.path)
  }

  def receive = {
    case GetDatenplaetze(ort: String) => server.queryDatenplaetze(ort) pipeTo sender
    case QueryOrte(text: String) => server.queryOrte(text) pipeTo sender
    case SuggestOrte(text: String) => server.suggestOrte(text) pipeTo sender
  }

}
