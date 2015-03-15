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
  },

  printMe: function() {
    window.print();
  },

  render: function() {
    var self = this;

    var ortName = 'Hallo'; //(this.props.query.name != undefined)?'in ' + this.props.query.name:'';

    return (
      <div>
        <div className="row">
            <div className="col-md-10 col-md-offset-1">
                <p className="ergebnis-titel">Ihre Ansprechpartner {ortName}:&nbsp;&nbsp;<i className="print-me fa fa-print hidden-print" onClick={this.printMe}></i></p>
            </div>
        </div>

        <div className="row ergebnis-zeile">
          { this.state.datenplaetze.map(function(object, index) {
            return [
              <Datenplatz datenplatz={object} key={index} />,
              (index%2)?<div className="clearfix visible-md-block"></div>:undefined
            ];
          })}
        </div>

      </div>
    );
  }
});
