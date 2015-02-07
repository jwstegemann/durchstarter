package durchstarter.domain

import spray.json.DefaultJsonProtocol


case class Ort(
  id : String,
/*  bezeichnung : String,
  plz : String,
  land : String,
  gemeinde : String,
*/
  koordinaten: Option[String]
)

case class Datenplatz(
  ort: String,
  kategorie: String,
  prio: Int,
  name: String,
  anschrift1: String,
  anschrift2: String,
  anschrift3: String,
  telefon: String,
  fax: String,
  email: String,
  url: String,
  icon: String
)

case class NewsletterRequest(
  eMail: String
)

case class AngebotRequest(
  name: String,
  slogan: String,
  kategorie: String,
  anschrift: String,
  ansprechpartner: String,
  telefon: String,
  fax: String,
  eMail: String,
  url: String,
  postleitzahlen: String
)

object DurchstarterProtocol extends DefaultJsonProtocol {

  // JSON-Serialization
  implicit val ortJsonFormat = jsonFormat2(Ort.apply)
  implicit val datenplatzJsonFormat = jsonFormat12(Datenplatz.apply)

  implicit val newsletterJsonFormat = jsonFormat1(NewsletterRequest.apply)
  implicit val angebotJsonFormat = jsonFormat10(AngebotRequest.apply)
}
