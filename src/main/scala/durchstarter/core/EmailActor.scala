package durchstarter.core

import akka.actor.{Actor, ActorLogging}
import akka.pattern._

import durchstarter.core.util.Failable

import durchstarter.core.elasticsearch._
import durchstarter.domain._

import courier._, Defaults._

import scala.language.reflectiveCalls

import spray.json._

import scala.annotation.tailrec


trait NoUnicodeEscJsonPrinter extends JsonPrinter {
  protected def printString(s: String,sb: StringBuilder): Unit = {
    @tailrec
    def printEscaped(s: String, ix: Int) {

      println("Bin da!!!!!!!!!!!!!!!!!!")

      if (ix < s.length) {
        s.charAt(ix) match {
          case '"' => sb.append("\\\"")
          case '\\' => sb.append("\\\\")
          case x if 0x20 <= x && x < 0x7F => sb.append(x)
          case '\b' => sb.append("\\b")
          case '\f' => sb.append("\\f")
          case '\n' => sb.append("\\n")
          case '\r' => sb.append("\\r")
          case '\t' => sb.append("\\t")
          case x => sb.append(x)
        }
        printEscaped(s, ix + 1)
      }
    }
    sb.append('"')
    printEscaped(s, 0)
    sb.append('"')
  }
}

trait NoUnicodeEscPrettyPrinter  extends PrettyPrinter with NoUnicodeEscJsonPrinter
object NoUnicodeEscPrettyPrinter extends NoUnicodeEscPrettyPrinter


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
      .to("jst" `@` "beratung-stegemann.de")
      .subject("durchstarter24.de - Newsletter")
      .content(Text(NoUnicodeEscPrettyPrinter(req.toJson)))
    )   

    log.info(s"sent newsletter-email for {}", req)
  }

  def sendAngebot(req: AngebotRequest) = {

    implicit def noUnicodeEscPrettyPrinter(json: JsValue): String = NoUnicodeEscPrettyPrinter(json)

    mailer(Envelope.from("formular" `@` "beratung-stegemann.de")
      .to("jst" `@` "beratung-stegemann.de")
      .subject("durchstarter24.de - Angebot")
      .content(Text(req.toJson.prettyPrint))
    )   

    log.info(s"sent angebot-email for {}", req)
  }
}