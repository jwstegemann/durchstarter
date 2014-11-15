package durchstarter.core

import akka.actor.{Actor, ActorLogging}
import akka.pattern._

import durchstarter.core.util.Failable

import durchstarter.core.elasticsearch._
import durchstarter.domain._

import courier._, Defaults._

import scala.language.reflectiveCalls

import spray.json._


/**
 * Sending eMail...
 */
class EmailActor extends Actor with ActorLogging with Failable {

  import DurchstarterProtocol._

  implicit def executionContext = context.dispatcher
  implicit val system = context.system

  val mailer = Mailer("smtp.1und1.de", 587)
    .auth(true)
    .as("formular@beratung-stegemann.de", "DId(q<QD")
    .startTtls(true)()


  override def preStart =  {
    log.info(s"EmailActor started at: {}", self.path)
  }

  def receive = {
    case n:NewsletterRequest => sendNewsletter(n)
    case a:AngebotRequest => sendAngebot(a)
  }

  def sendNewsletter(req: NewsletterRequest) = {
    mailer(Envelope.from("formular" `@` "beratung-stegemann.de")
      .to("jwstegemann" `@` "gmail.com")
      .subject("durchstarter24.de - Newsletter")
      .content(Text(req.toJson.prettyPrint))
    )   

    log.info(s"sent newsletter-email for {}", req)
  }

  def sendAngebot(req: AngebotRequest) = {
    mailer(Envelope.from("formular" `@` "beratung-stegemann.de")
      .to("jwstegemann" `@` "gmail.com")
      .subject("durchstarter24.de - Angebot")
      .content(Text(req.toJson.prettyPrint))
    )   

    log.info(s"sent angebot-email for {}", req)
  }
}