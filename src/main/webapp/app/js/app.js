/** @jsx React.DOM */
'use strict';

var es5Shim = require('es5-shim');

var React = require('react/addons');

var Suchfeld = require('./components/Suchfeld');
var OrteAuswahl = require('./components/OrteAuswahl');
var Ergebnis = require('./components/Ergebnis');

var Actions = require('./Actions');


var sucheContainer = document.getElementById('sucheContainer')
var orteContainer = document.getElementById('orteContainer')
var datenplaetzeContainer = document.getElementById('datenplaetzeContainer')

React.render(<Suchfeld />, sucheContainer);
React.render(<OrteAuswahl />, orteContainer);
React.render(<Ergebnis />, datenplaetzeContainer);
