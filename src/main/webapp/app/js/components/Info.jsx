/** @jsx React.DOM */
'use strict';

var React = require('react');


module.exports = React.createClass({
  render: function() {
    return (
      <div>
      <div className="row">
          <div className="col-md-10 col-md-offset-1">  
              <p className="uvp">Das Onlineverzeichnis mit regionalen Kontakten für Gründer und Unternehmer in ganz Deutschland</p>
          </div>
      </div>            

      <div className="row">
          <div className="col-md-10 col-md-offset-1">
              <p className="narrative">Sie erhalten ganz einfach mit der Eingabe der Postleitzahl die für Ihre Region vorhandenen Kontaktdaten</p>
              <p className="narrative">eine Eingabe = alle Kontakte</p>
              <p className="narrative">natürlich auch zum ausdrucken und somit jederzeit griffbereit</p>
              <p className="narrative">und natürlich kostenlos</p>
          </div>
      </div>        

      <a name="features"></a>
      <div className="row section section">
          <div className="col-md-5 col-md-offset-1 left-column">
              <img className="section-image" src="img/foto2.jpg"></img>
          </div>
          <div className="col-md-5">
              <p className="section-header">Sie sind Gründer oder Unternehmer und suchen Ansprechpartner?</p>
              <p className="section-details">Wir haben für jede Postleitzahl in Deutschland die folgenden Kontakte recherchiert:</p>
                <ul className="section-list">
                  <li>Finanzamt</li>
                  <li>Industrie- und Handelskammer</li>
                  <li>Handwerkskammer</li>
                  <li>Wirtschaftsförderungen in Stadt und Landkreis</li>
                  <li>Gewerbeamt</li>
                  <li>Arbeitsamt</li>
                  <li>Jobcenter</li>    
                  <li>Startercenter</li>
                  <li>Gründerzentren Hochschulen</li>       
                  <li>Förderbanken von Bund und Land</li>
                </ul>
          </div>
      </div>

      <div className="row section">
          <div className="col-md-5 col-md-offset-1 left-column">
              <p className="section-header">Weitere Kontakte für Sie:</p>
              <p className="section-details">Außerdem haben Dienstleister folgender Kategorien die Möglichkeit ihre Kontaktdaten in ihrer Kategorie und ihrer Region exklusiv und kostenpflichtg zu präsentieren:</p>
                <ul className="section-list">
                <li>Banken</li>  
                <li>Krankenkassen</li>    
                <li>Steuerberater</li>      
                <li>Rechtsanwälte</li>      
                <li>Unternehmensberater</li>  
                <li>Versicherungsmakler/-vermittler</li>      
                <li>Marketingagenturen</li>   
                <li>Immobilienmakler</li>
                <li>Finanzmakler</li>    
                <li>Personaldienstleister</li>    
                <li>IT-Spezialisten</li>    
                <li>Bürodienstleister</li>
                <li>Krisenmanager</li>   
                <li>Einkaufsverbände</li>  
                <li>Reinigungsfirmen</li>
              </ul>
          </div>
          <div className="col-md-5">
              <img className="section-image" src="img/meeting.jpg"></img>
              <img className="section-image second-foto" src="img/foto1.jpg"></img>
          </div>
      </div>

      <div className="row section section">
          <div className="col-md-5 col-md-offset-1 left-column">
              <img className="section-image" src="img/foto3.jpg"></img>
          </div>
          <div className="col-md-5">
              <p className="section-header">Ihr Vorteil:</p>
              <p className="section-details">Sie erhalten auf einen Blick und ohne Mühe zahlreiche Kontaktdaten von Dienstleistern, die speziell an Ihnen als Kunden interessiert sind - pro Kategorie jedoch immer nur einen.</p>
          </div>
      </div>

      <div className="row section">
          <div className="col-md-5 col-md-offset-1 left-column">
              <p className="section-header">Immer und überall für Sie da!</p>
              <p className="section-details">Unser Team ist bemüht alle Kontaktdaten ständig aktuell zu halten. Sollte Ihnen doch einmal ein Fehler auffallen, so würden wir uns über eine kurze Nachricht freuen.</p>
              <p className="section-details">Für Fragen und Anregungen stehen wir Ihnen jederzeit gerne per email zur Verfügung.</p>
          </div>
          <div className="col-md-5">
              <img className="section-image" src="img/kaffee.jpg"></img>
          </div>
      </div>

      <div className="row section section">
          <div className="col-md-5 col-md-offset-1 left-column">
              <img className="section-image" src="img/foto4.jpg"></img>
          </div>
          <div className="col-md-5">
              <p className="section-header">Unser Newsletter</p>
              <p className="section-details">Gerne informieren wir Sie automatisch mit unserem Newsletter über Änderungen bzw. Neuigkeiten bei unseren Kontaktdaten.</p>
          </div>
      </div>

      <a name="register"></a>
      <div className="row section register">
          <div className="col-md-6 col-md-offset-3">
              <form className="form-inline" role="form">
                <div className="form-group col-sm-7">
                  <input type="email" className="form-control input-lg" id="exampleInputEmail2" placeholder="Ihre eMail-Adresse" />
                </div>
                <button type="submit" className="btn btn-lg btn-default">
                  NEWSLETTER ABONNIEREN
                </button>
              </form>
          </div>
      </div>
      </div>
    );
  }
});