/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Routes = require('react-router/Routes');
var Route = require('react-router/Route');
var DefaultRoute = require('react-router/DefaultRoute');

var Info = require('./components/Info');
var Ergebnis = require('./components/Ergebnis');

var Actions = require('./Actions');

var Suchfeld = require('./components/Suchfeld');


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
    <Route handler={App}>
      <Route name="info" path="/" handler={Info} addHandlerKey={true} />
      <Route name="ergebnis" path="/ort/:ortId" handler={Ergebnis} addHandlerKey={true} />
    </Route>
  </Routes>
);

var result = React.renderComponent(
  routes,
  document.getElementById('container')
);

var suchfeld = (
    <Suchfeld />
);

var suche = React.renderComponent(
  suchfeld,
  document.getElementById('searchfield')
);
