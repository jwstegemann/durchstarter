package durchstarter.domain

import spray.json.DefaultJsonProtocol


case class Ort(
  id : String
)

case class Datenplatz(
  id : String
)


object DurchstarterProtocol extends DefaultJsonProtocol {

  // JSON-Serialization
  implicit val ortJsonFormat = jsonFormat1(Ort.apply)
  implicit val datenplatzJsonFormat = jsonFormat1(Datenplatz.apply)
}
