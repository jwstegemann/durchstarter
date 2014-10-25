package durchstarter.core.elasticsearch

import spray.json.DefaultJsonProtocol
import durchstarter.domain._

case class QueryRequest(query: String)

case class QueryResult(took: Int, hits: Hits)

case class Hits(total: Int, max_score: Double, hits: Seq[Hit])

case class Hit(_id: String, _score: Double, _source: Datenplatz)

case class Facets(tags: Tags, dates: Dates)

case class Tags(total: Int, terms: Seq[Term])

case class Term(term: String, count: Int)

case class Dates(ranges: Seq[Range])

case class Range(from_str: String, count: Int)

case class SuggestResult[T](suggest: Seq[Suggestion[T]])

case class Suggestion[T](options: Seq[SuggestOption[T]])

case class SuggestOption[T](text: String, score: Double, payload: T)


object ElasticSearchProtocol extends DefaultJsonProtocol {
  import DurchstarterProtocol._

  // JSON-Serialization
  implicit val hitJsonFormat = jsonFormat3(Hit)
  implicit val hitsJsonFormat = jsonFormat3(Hits)
  implicit val queryRequestJsonFormat = jsonFormat1(QueryRequest)
  
  implicit val termJsonFormat = jsonFormat2(Term)
  implicit val tagsJsonFormat = jsonFormat2(Tags)

  implicit val rangeJsonFormat = jsonFormat2(Range)
  implicit val datesJsonFormat = jsonFormat1(Dates)

  implicit val facetsJsonFormat = jsonFormat2(Facets)
  implicit val queryResultJsonFormat = jsonFormat2(QueryResult)

  implicit val suggestOrtOptionJsonFormat = jsonFormat3(SuggestOption[Ort])
  implicit val suggestionOrtJsonFormat = jsonFormat1(Suggestion[Ort])
  implicit val SuggestOrtResultJsonFormat = jsonFormat1(SuggestResult[Ort])
}