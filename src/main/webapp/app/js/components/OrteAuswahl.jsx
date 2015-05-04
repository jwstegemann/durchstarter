/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Actions = require('../Actions');
var OrteStore = require('../stores/OrteStore');
var Datenplatz = require('./Datenplatz');


module.exports = React.createClass({

  getInitialState: function() {
    return {
      orte: undefined
    };
  },

  componentDidMount: function() {
    //console.log("mounting OrteAuswahl");
    this.unsubscribeOrte = OrteStore.listen(this.onOrteChange);
    //console.log("OrteAuswahl gemountet");
  },

  onOrteChange: function(orte) {
    //console.log("orte changed: " + orte);

    this.setState(React.addons.update(this.state, {
      orte: {$set: orte}
    }));

    if (orte.length === 1) {
        //console.log("lade DPs");
      Actions.sucheDatenplaetze(orte[0]);
    }
  },

  onClickOrt: function(ort) {
    this.setState(React.addons.update(this.state, {
      orte: {$set: undefined}
    }));

    Actions.sucheDatenplaetze(ort);
  },

  render: function() {
    var self = this;

    if (!this.state.orte) {
      return (<div className="row ausgeblendet">
      </div>);
    }
    else if (this.state.orte.length === 0) {
      return (<div className="row orte-meldung">
        <div className="col-md-10 col-md-offset-1 section-details">
        <p>Zu der von Ihnen eingegebenen Suche konnten wir leider keinen Ort in unserer Datenbank ermitteln.</p>
        <p>Bitte versuchen Sie eine andere Postleitzahl in Ihrer Nähe.</p>
        </div>
      </div>);
    }
    else if (this.state.orte.length === 1) {
      return <div className="row ausgeblendet"/>;
    }
    else {
      return (
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <p className="ort-titel">Es gibt mehrere Orte zu Ihrer Suche. Meinen Sie: </p>
            <ul className="orte-auswahl">
              {this.state.orte.map(function(ort) {
                return <li key={ort._id}><a className="ort-item" onClick={self.onClickOrt.bind(self,ort)}>{ort.bezeichnung}</a></li>;
              })}
            </ul>
          </div>
        </div>
      );
    }
  }
});
