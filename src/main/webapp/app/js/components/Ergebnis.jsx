/** @jsx React.DOM */
'use strict';

var React = require('react');
var Reflux = require('reflux');
var Actions = require('../Actions');
var DatenplaetzeStore = require('../stores/DatenplaetzeStore');
var Datenplatz = require('./Datenplatz');


function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

module.exports = React.createClass({
  mixins: [Reflux.connect(DatenplaetzeStore,"datenplaetze")],

  logoList: shuffle([1,2,3,4,5,6,7,8,9,10,11]),

  getInitialState: function() { 
    return {datenplaetze: []};
  },

  componentWillMount: function() {
    Actions.zeigeDatenplaetze(this.props.params.ortId);
  },

  printMe: function() {
    window.print();
  },

  render: function() {
    var self = this;

    var ortName = (this.props.query.name != undefined)?'in ' + this.props.query.name:'';

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
              <Datenplatz datenplatz={object} key={index} logoFile={'img/logos/logo' + self.logoList[index] + '.jpg'}/>,
              (index%2)?<div className="clearfix visible-md-block"></div>:undefined
            ];
          })}
        </div>

      </div>
    );
  }
});
