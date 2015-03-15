/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var Actions = require('../Actions');
var DatenplaetzeStore = require('../stores/DatenplaetzeStore');
var Datenplatz = require('./Datenplatz');


module.exports = React.createClass({
  mixins: [Reflux.connect(DatenplaetzeStore,"ort")],

  getInitialState: function() {
    return {ort: {
      id: undefined,
      dps: [],
      name: ''
    }};
  },

  componentWillMount: function() {
  },

  printMe: function() {
    window.print();
  },

  render: function() {
    var self = this;

    if (self.state.ort.id && self.state.ort.name) {
      return (
        <div>
          <div className="row">
              <div className="col-md-10 col-md-offset-1">
                  <p className="ergebnis-titel">Ihre Ansprechpartner in {self.state.ort.name}:&nbsp;&nbsp;<i className="print-me fa fa-print hidden-print" onClick={this.printMe}></i></p>
              </div>
          </div>

          <div className="row ergebnis-zeile">
            { self.state.ort.dps.map(function(object, index) {
              return [
                <Datenplatz datenplatz={object} key={index} />,
                (index%2)?<div className="clearfix visible-md-block"></div>:undefined
              ];
            })}
          </div>

        </div>
      );
    }
    else {
      return <div className="row ausgeblendet" />
    }

  }
});
