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
  url: String
)

case class NewsletterRequest(
  eMail: String
)

case class AngebotRequest(
  name: String,
  anschrift: String,
  ansprechpartner: String,
  telefon: String,
  fax: String,
  eMail: String,
  postleitzahlen: String
)

object DurchstarterProtocol extends DefaultJsonProtocol {

  // JSON-Serialization
  implicit val ortJsonFormat = jsonFormat2(Ort.apply)
  implicit val datenplatzJsonFormat = jsonFormat11(Datenplatz.apply)

  implicit val newsletterJsonFormat = jsonFormat1(NewsletterRequest.apply)
  implicit val angebotJsonFormat = jsonFormat7(AngebotRequest.apply)
}
