/** @jsx React.DOM */
'use strict';

var React = require('react');

var Routes = require('react-router/Routes');
var Route = require('react-router/Route');

var Info = require('./components/Info');
var Ergebnis = require('./components/Ergebnis');

var Actions = require('./Actions');



var routes = (
  <Routes location="hash">
    <Route name="info" path="/" handler={Info} />
    <Route name="ergebnis" path="/ort/:ortId" handler={Ergebnis} />
  </Routes>
);

var app = React.renderComponent(
  routes,
  document.getElementById('container')
);
