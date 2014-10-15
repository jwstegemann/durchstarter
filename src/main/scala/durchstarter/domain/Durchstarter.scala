package durchstarter.domain

import spray.json.DefaultJsonProtocol


case class Ort(
  id : String,
  bezeichnung : String,
  plz : String,
  land : String,
  gemeinde : String,
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

object DurchstarterProtocol extends DefaultJsonProtocol {

  // JSON-Serialization
  implicit val ortJsonFormat = jsonFormat6(Ort.apply)
  implicit val datenplatzJsonFormat = jsonFormat11(Datenplatz.apply)
}
