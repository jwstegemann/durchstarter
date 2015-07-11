/** @jsx React.DOM */
'use strict';

var es5Shim = require('es5-shim');
var es5Sham = require('es5-shim/es5-sham');

var React = require('react/addons');

var Suchfeld = require('./components/Suchfeld');
var OrteAuswahl = require('./components/OrteAuswahl');
var Ergebnis = require('./components/Ergebnis');

var Actions = require('./Actions');


var sucheContainer = document.getElementById('sucheContainer')
var orteContainer = document.getElementById('orteContainer')
var datenplaetzeContainer = document.getElementById('datenplaetzeContainer')


var param = window.location.search;

if (location.pathname.indexOf('/info/') === -1) {

  if (param) {
    React.render(<Suchfeld plz={param.substring(1)} />, sucheContainer);
  }
  else {
    React.render(<Suchfeld />, sucheContainer);
  }

}
else {
  var segments = location.pathname.split( '/' );

  Actions.suchePlz(segments[segments.length-1]);
}


React.render(<OrteAuswahl />, orteContainer);
React.render(<Ergebnis />, datenplaetzeContainer);
