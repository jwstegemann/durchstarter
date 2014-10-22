/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var OrteStore = require('../stores/OrteStore');


module.exports = React.createClass({

  getInitialState: function() {
    return {
      plz: '',
      orte: [],
      selectedOrt: undefined
    };
  },

  handleChange: function(e) {
    var newPlz = event.target.value;

    if ((newPlz.length < 6) && (newPlz.match(/^[0-9]{0,5}$/))) {
      this.setState(React.addons.update(this.state, {
        plz: {$set: newPlz}
      }));
    }

  },

  handleOnKeyDown: function(e) {
    console.log(e.which);

    var handled = false;

    switch(e.which) {

      case 13:  this.handleEnter();
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

  handleEnter: function() {
    console.log('enter');
  },

  handleUp: function() {
    console.log('up');
  },

  handleDown: function() {
    console.log('down');
  },

  render: function() {
    return (
      <div className="search col-md-8 col-md-offset-2">
        <p className="search-header">Ihre Suche hat ein Ende:</p>
        <form className="form-inline" role="form">
          <div className="form-group col-sm-8">
            <input type="email" className="form-control input-lg" id="exampleInputEmail2" 
              value={this.state.plz} placeholder="In welcher Postleitzahlen möchten Sie suchen?" 
              onChange={this.handleChange} onKeyDown={this.handleOnKeyDown} />
          </div>
          <button type="submit" className="btn btn-lg btn-default">
            FINDEN
          </button>
        </form>
      </div>
    );
  }
});
