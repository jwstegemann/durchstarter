/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var Actions = require('../Actions');
var DatenplaetzeStore = require('../stores/DatenplaetzeStore');
var Datenplatz = require('./Datenplatz');


module.exports = React.createClass({
  mixins: [Reflux.connect(DatenplaetzeStore,"datenplaetze")],

  getInitialState: function() { 
    return {datenplaetze: []};
  },

  componentWillMount: function() {
    Actions.zeigeDatenplaetze(this.props.params.ortId);
  },

  render: function() {
    return (
      <div>
        <div className="row">
            <div className="col-md-10 col-md-offset-1">  
                <p className="ergebnis-titel">Ihre Ansprechpartner in 38685 Langelsheim&nbsp;&nbsp;<i className="fa fa-print"></i></p>
            </div>
        </div>

        <div className="row ergebnis-zeile">
          {console.log(this.state)}

          { this.state.datenplaetze.map(function(object, index) {
            return <Datenplatz datenplatz={object} key={index} />;
          })}

        </div>

      </div>   
    );
  }
});
