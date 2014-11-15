/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Routes = require('react-router/Routes');
var Route = require('react-router/Route');
var DefaultRoute = require('react-router/DefaultRoute');

var Info = require('./components/Info');
var Ergebnis = require('./components/Ergebnis');
var EintragFormular = require('./components/EintragFormular');

var Actions = require('./Actions');

var Suchfeld = require('./components/Suchfeld');


var container = document.getElementById('container')
  if (container) {
  var App = React.createClass({
    render: function() {
      return (
        <CSSTransitionGroup transitionName="example">
          <this.props.activeRouteHandler />
        </CSSTransitionGroup>
      );
    }
  });

  var routes = (
    <Routes location="hash">
      <Route name="eintrag" path="/eintrag" handler={EintragFormular} addHandlerKey={true} />
      <Route handler={App}>
        <Route name="info" path="/" handler={Info} addHandlerKey={true} />
        <Route name="ergebnis" path="/ort/:ortId" handler={Ergebnis} addHandlerKey={true} />
      </Route>
    </Routes>
  );

  var result = React.renderComponent(
    routes,
    container
  );
}



var sf = document.getElementById('searchfield')
if (sf) {
  var suchfeld = (
      <Suchfeld />
  );

  var suche = React.renderComponent(
    suchfeld, sf
  );
}


var ef = document.getElementById('eintragformular')
if (ef) {
  var eintragformular = (
      <EintragFormular />
  );

  var suche = React.renderComponent(
    eintragformular, ef
  );
}