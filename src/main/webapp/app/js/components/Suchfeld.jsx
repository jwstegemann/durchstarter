/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Actions = require('../Actions');
var OrteStore = require('../stores/OrteStore');


module.exports = React.createClass({
  displayName: 'Suchfeld',

  getInitialState: function() {
    return {
      plz: ''
    };
  },

  suche: function() {

    var form = this.refs.suchform.getDOMNode();

    if (!form.checkValidity || form.checkValidity()) {
      //console.log("suche: " + this.refs.searchinput.getDOMNode().value);
      Actions.suchePlz(this.refs.searchinput.getDOMNode().value);
    }

    Actions.resetDatenplaetze();
  },


  componentDidMount: function() {
  //    console.log("mounting Suchfeld...");

  //    console.log("mounting Suchfeld done.");

      if (this.props.plz) {
        this.suche();
        this.refs.searchinput.getDOMNode().focus();
      }
      else {
        window.location.href="./index.html";
      }
  },

  componentWillUnmount: function() {
  //    console.log("unmounting Suchfeld");
  },


  handleKeyDown: function(e) {
    var handled = false;

    switch(e.which) {

      case 13:  this.suche();
                handled = true;
                break;
    }

    if (handled) {
      e.preventDefault();
    }
  },


  render: function() {
    var self = this;

    return (
      <form ref="suchform" className="navbar-form navbar-right" role="search">
        <div className="form-group">
          <input ref="searchinput" type="text" className="form-control suche-input"
            placeholder="PLZ"
            autoComplete="off"
            defaultValue={self.props.plz}
            required pattern="[0-9]{5}" maxLength="5" size="5"
            onKeyDown={self.handleKeyDown} />
        </div>
        <button ref="searchbutton" type="button" className="btn btn-default suche-button" onClick={this.suche}>KONTAKTE FINDEN</button>
      </form>

    );
  }
});
