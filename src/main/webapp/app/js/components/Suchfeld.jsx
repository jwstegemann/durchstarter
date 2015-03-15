/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Actions = require('../Actions');
var OrteStore = require('../stores/OrteStore');


module.exports = React.createClass({

  getInitialState: function() {
    return {
      plz: ''
    };
  },

  suche: function() {
    console.log("suche: " + this.refs.searchinput.getDOMNode().value);

    Actions.suchePlz(this.refs.searchinput.getDOMNode().value);
    Actions.resetDatenplaetze();
  },

  handleChange: function(e) {
  /*  var newPlz = e.target.value;

    console.log(e.target.value);

    if ((newPlz.length < 6) && (newPlz.match(/^[0-9]{0,5}$/))) {
      this.setState(React.addons.update(this.state, {
        plz: {$set: newPlz},
        showSuggestions: {$set: true}
      }));

      this.updateOrte(newPlz);
    }
    else if (newPlz.length > 5) {
      this.updateOrte(this.state.plz.substr(0,5));

      this.setState(React.addons.update(this.state, {
        plz: {$apply: function(plz) {
          return (plz.substr(0,5));
        }},
        showSuggestions: {$set: true}
      }));
    }

    if (newPlz == undefined || newPlz.length == 0) {
      this.setState(React.addons.update(this.state, {
        orte: {$set: []},
        plz: {$set: ''},
        showSuggestions: {$set: false}
      }));
    }
    */

  },


  componentDidMount: function() {
      console.log("mounting Suchfeld...");

      console.log("mounting Suchfeld done.");

      this.refs.searchinput.getDOMNode().focus();
  },

  componentWillUnmount: function() {
      console.log("unmounting Suchfeld");
  },

/*
  handleOnKeyDown: function(e) {
    var handled = false;

    switch(e.which) {

      case 13:  this.handleEnter(e);
                handled = true;
                break;

      case 38:  this.handleUp();
                handled = true;
                break;
      case 40:  this.handleDown();
                handled = true;
                break;
    }

    if (handled) {
      e.preventDefault();
    }
  },

*/


  render: function() {
    var self = this;

    return (
        <form className="form-inline" role="form">
            <input ref="searchinput"
              placeholder="Postleitzahl Ihres Unternehmensstandortes"
              autoComplete="off" />
            <button ref="searchbutton" type="button" className="btn btn-lg btn-default" onClick={this.suche}>
            KONTAKTE FINDEN
          </button>
        </form>
    );
  }
});
