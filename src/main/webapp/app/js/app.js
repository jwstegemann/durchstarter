/** @jsx React.DOM */
'use strict';

var React = require('react');
var Comment = require('./components/comment');

var Routes = require('react-router/Routes');
var Route = require('react-router/Route');

var Info = require('./components/Info');
var Ergebnis = require('./components/Ergebnis');



var routes = (
  <Routes location="hash">
    <Route name="info" path="/" handler={Info} />
    <Route name="ergebnis" path="/ort/:ortId" handler={Ergebnis} />
  </Routes>
);

//      <Route name="calendar" path="/search" handler={Search}/>
//      <DefaultRoute handler={Welcome}/>

/*AppBar({
    key: "12345",
    author: "ich",
    text: "Dies ist ein Test1"
  })*/

var app = React.renderComponent(
  routes,
  document.getElementById('container')
);
