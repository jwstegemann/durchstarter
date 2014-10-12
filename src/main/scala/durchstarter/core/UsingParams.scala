package durchstarter.core

import spray.json._

trait UsingParams {
  type Param = (String, JsValue)
}