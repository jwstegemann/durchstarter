/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Actions = require('../Actions');
var OrteStore = require('../stores/OrteStore');


module.exports = React.createClass({

  getInitialState: function() {
    return {
      plz: '',
      orte: []
    };
  },

  suche: function() {

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

  onOrteChange: function(orte) {
    console.log("orte changed: " + orte);

    this.setState(React.addons.update(this.state, {
      orte: {$set: orte}
    }));

    //TODO: hier ggf. weiteren Event auslösen

    /*
    if ((this.state.orte.length <= this.state.selectedOrt) || (!this.state.selectedOrt)) {
      this.setState(React.addons.update(this.state, {
        selectedOrt: {$set: 0}
      }));
    }
    */
  },

  componentDidMount: function() {
      console.log("mounting Suchfeld...");

      this.unsubscribeOrte = OrteStore.listen(this.onOrteChange);
      console.log("mounting Suchfeld done.");

      this.refs.searchinput.getDOMNode().focus();
  },

  componentWillUnmount: function() {
      console.log("unmounting Suchfeld");
      this.unsubscribeOrte();
  },

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

  handleEnter: function(e) {
    this.navigateToOrt(this.state.selectedOrt);
  },

  navigateToOrt: function(index) {
//    console.log('navigating to ' + index + ' of ' + this.state.orte);

    if (index != undefined && index >= 0 && index < this.state.orte.length) {
      var ortId = this.state.orte[index].payload.id;

      this.setState(React.addons.update(this.state, {
        plz: {$set: this.state.orte[index].text},
        orte: {$set: []},
        selectedOrt: {$set: undefined},
        showSuggestions: {$set: false}
      }), function() {
        this.refs.searchbutton.getDOMNode().focus();
      });

      Router.transitionTo('ergebnis', {ortId: ortId}, {name: this.state.orte[index].text});
    }
  },

  handleUp: function() {
    if (this.state.selectedOrt > 0) {
      this.setState(React.addons.update(this.state, {
        selectedOrt: {$apply: function(index) {
          return index-1;
        }}
      }));
    }
  },

  handleDown: function() {
    if (this.state.selectedOrt < this.state.orte.length-1) {
      this.setState(React.addons.update(this.state, {
        selectedOrt: {$apply: function(index) {
          return index+1;
        }}
      }));
    }
  },

  handleBlur: function() {
    this.setState(React.addons.update(this.state, {
        showSuggestions: {$set: false}
    }));
  },

  handleFocus: function() {
    this.handleChange({
      target: {
        value: this.state.plz.substr(0,5)
      }
    });
  },

  handleClickOrt: function(index, event) {
//  console.log('clicked');
    event.preventDefault();
    this.navigateToOrt(index);
  },

  render: function() {
    //console.log("focus: " + this.state.showSuggestions + ", orte:" + this.state.orte);

    var self = this;

    var suggestions;
    if (this.state.showSuggestions) {
      if (this.state.orte.length > 0) {
        suggestions =
          <ul className="suggestions">
            { this.state.orte.map(function(ort, index) {
                var classes = React.addons.classSet({
                  'suggestion-item': true,
                  'active': (index == self.state.selectedOrt)
                });
               return <li onMouseDown={self.handleClickOrt.bind(self,index)} key={ort.payload.id} className={classes}>{ort.text}</li>;
            })}
          </ul>
      }
      else {
        suggestions =
          <ul className="suggestions">
            <li className="suggestionItem">Bitte geben Sie eine gültige Postleitzahl ein.</li>
          </ul>
      }
    }

    return (
      <div className="search col-md-10 col-md-offset-1">
        <p className="search-header">Ihre Suche hat ein Ende:</p>
        <form className="form-inline" role="form">
          <div className="form-group col-sm-7 col-sm-offset-1">
            <input ref="searchinput" className="form-control input-lg"
              value={this.state.plz} placeholder="Postleitzahl Ihres Unternehmensstandortes"
              autoComplete="off"
              onChange={this.handleChange}
              onPropertyChange={this.handleChange} onKeyDown={this.handleOnKeyDown}
              onFocus={this.handleFocus} onBlur={this.handleBlur} />

              {suggestions}

          </div>
          <button ref="searchbutton" type="submit" className="btn btn-lg btn-default" onClick={this.handleEnter}>
            KONTAKTE FINDEN
          </button>
        </form>
      </div>
    );
  }
});
