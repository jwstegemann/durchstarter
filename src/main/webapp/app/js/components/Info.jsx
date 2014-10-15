/** @jsx React.DOM */
'use strict';

var React = require('react');


module.exports = React.createClass({
  render: function() {
    return (
      <div>
      <div className="row">
          <div className="col-md-10 col-md-offset-1">  
              <p className="uvp">Ihr Online-Verzeichnis für Unternehmer mit Kontaktdaten aus Ihrer Region</p>
          </div>
      </div>            

      <div className="row">
          <div className="col-md-10 col-md-offset-1">
              <p className="narrative">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus...</p>
              <p className="narrative">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>                    
          </div>
      </div>        

      <a name="features"></a>
      <div className="row section section">
          <div className="col-md-5 col-md-offset-1 left-column">
              <img className="section-image" src="img/screen_suche.png"></img>
          </div>
          <div className="col-md-5">
              <p className="section-header">Sie sind Gründer oder Unternehmer und suchen Ansprechpartner?</p>
              <p className="section-details">Mit einem Klick und der Eingabe ihrer Postleitzahl erhalten Sie völlig kostenfrei die Kontaktdaten von folgenden für Sie zuständigen Institutionen:</p>
                      <ul>
                      <li>Finanzamt</li>
                      <li>Industrie- und Handelskammer</li>
                      <li>Handwerkskammer</li>
                      <li>Gewerbeamt</li>
                      <li>Arbeitsamt</li>
                      <li>Jobcenter</li>
                      <li>Wirtschaftsförderung des Landkreises</li>
                      <li>Wirtschaftsförderung der Stadt</li>
                      <li>Förderbank des Landes</li>
                      <li>Förderbank des Bundes</li>
                      <li>den Banken vor Ort</li>
                  </ul>
          </div>
      </div>

      <div className="row section">
          <div className="col-md-5 col-md-offset-1 left-column">
              <p className="section-header">Haben Sie im Meeting immer alle Informationen parat!</p>
              <p className="section-details">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus...</p>                    
          </div>
          <div className="col-md-5">
              <img className="section-image" src="img/meeting.jpg"></img>
          </div>
      </div>

      <div className="row section section">
          <div className="col-md-5 col-md-offset-1 left-column">
              <img className="section-image" src="img/screen_share.png"></img>
          </div>
          <div className="col-md-5">
              <p className="section-header">Teilen Sie Ihre Daten mit wem sie wollen!</p>
              <p className="section-details">Tauschen Sie sicher und zuverlässig Daten, Ideen, Dokumente, etc. mit Ihren Geschäftspartnern, Familienmitgliedern, Nachbarn oder Freunden aus.</p>
          </div>
      </div>

      <div className="row section">
          <div className="col-md-5 col-md-offset-1 left-column">
              <p className="section-header">Arbeiten Sie wann und wo Sie möchten</p>
              <p className="section-details">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</p>                    
          </div>
          <div className="col-md-5">
              <img className="section-image" src="img/kaffee.jpg"></img>
          </div>
      </div>

      <div className="row section section">
          <div className="col-md-5 col-md-offset-1 left-column">
              <img className="section-image" src="img/screen_assist.png"></img>
          </div>
          <div className="col-md-5">
              <p className="section-header">Am Ende noch mal was Grandioses</p>
              <p className="section-details">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</p>
          </div>
      </div>

      <a name="register"></a>
      <div className="row section register">
          <div className="col-md-6 col-md-offset-3">
              <form className="form-inline" role="form">
                <div className="form-group col-sm-8">
                  <input type="email" className="form-control input-lg" id="exampleInputEmail2" placeholder="Ihre eMail-Adresse" />
                </div>
                <button type="submit" className="btn btn-lg btn-default">
                  JETZT ANMELDEN
                </button>
              </form>
          </div>
      </div>
      </div>
    );
  }
});
