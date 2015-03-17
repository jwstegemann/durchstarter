/** @jsx React.DOM */
'use strict';

var es5Shim = require('es5-shim');

var React = require('react/addons');

var EintragFormular = require('./components/EintragFormular');


var ef = document.getElementById('eintragformular');

React.render(<EintragFormular />, ef);
