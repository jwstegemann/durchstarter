package durchstarter

import durchstarter.api.Api
import durchstarter.core.{BootedCore, CoreActors}
import durchstarter.web.Web


object Rest extends App with BootedCore with CoreActors with Api with Web {
  
}
