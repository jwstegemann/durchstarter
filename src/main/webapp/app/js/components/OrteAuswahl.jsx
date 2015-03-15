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
      orte: []
    };
  },

  componentDidMount: function() {
    console.log("mounting OrteAuswahl");
    this.unsubscribeOrte = OrteStore.listen(this.onOrteChange);
    console.log("OrteAuswahl gemountet");
  },

  onOrteChange: function(orte) {
    console.log("orte changed: " + orte);

    this.setState(React.addons.update(this.state, {
      orte: {$set: orte}
    }));

    if (orte.length === 1) {
        console.log("lade DPs");
      Actions.sucheDatenplaetze(orte[0].payload.id);
    }
  },

  onClickOrt: function(ort) {
    this.setState(React.addons.update(this.state, {
      orte: {$set: []}
    }));

    Actions.sucheDatenplaetze(ort.payload.id, ort);
  },

  render: function() {
    var self = this;

    if (this.state.orte.length === 0) {
      return <div />;
    }
    else if (this.state.orte.length === 1) {
      return <div />;
    }
    else {
      return (
        <div>
          <p>Es gibt mehrere Orte zu Ihrer Postleitzahl. Meinen Sie: </p>
          <ul>
            {this.state.orte.map(function(ort) {
              return <li key={ort.payload.id}><a onClick={self.onClickOrt.bind(self,ort)}>{ort.text}</a></li>;
            })}
          </ul>
        </div>
      );
    }
  }
});
