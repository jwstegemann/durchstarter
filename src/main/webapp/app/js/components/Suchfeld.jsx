/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Actions = require('../Actions');
var OrteStore = require('../stores/OrteStore');
var Router = require('react-router');


module.exports = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      plz: '',
      orte: [],
      selectedOrt: undefined
    };
  },

  suggestTimeout: undefined,

  handleChange: function(e) {
    var newPlz = event.target.value;

    if ((newPlz.length < 6) && (newPlz.match(/^[0-9]{0,5}$/))) {
      this.setState(React.addons.update(this.state, {
        plz: {$set: newPlz}
      }));
    }

    if (newPlz.length > 0) {
      if (this.suggestTimeout != undefined) {
        clearTimeout(this.suggestTimeout);
      }
      this.suggestTimeout = setTimeout(function() {
        Actions.zeigeOrte(newPlz);
      }, 250);
    }

    if (newPlz == undefined || newPlz.length == 0) {
      this.setState(React.addons.update(this.state, {
        orte: {$set: []},
        plz: {$set: ''}
      }));      
    }

  },

  onOrteChange: function(orte) {
    this.setState(React.addons.update(this.state, {
      orte: {$set: orte}
    }));

    if ((this.state.orte.length <= this.state.selectedOrt) || (!this.state.selectedOrt)) {
      this.setState(React.addons.update(this.state, {
        selectedOrt: {$set: 0}
      }));
    }
  },

  componentDidMount: function() {
      this.unsubscribeOrte = OrteStore.listen(this.onOrteChange);

      this.refs.searchinput.getDOMNode().focus();
  },

  componentWillUnmount: function() {
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
    if (index != undefined && index >= 0 && index < this.state.orte.length) {
      var ortId = this.state.orte[index].payload.id;

      this.setState(React.addons.update(this.state, {
        plz: {$set: this.state.orte[index].text},
        orte: {$set: []},
        selectedOrt: {$set: undefined}
      }));

      this.refs.searchbutton.getDOMNode().focus();
      
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
/*    this.setState(React.addons.update(this.state, {
      orte: {$set: []},
      selectedOrt: {$set: undefined}
    }));     
  */
  },

  handleFocus: function() {
    if (this.state.plz.length > 5) {
      this.setState(React.addons.update(this.state, {
        plz: {$apply: function(plz) {
          return undefined; //plz.substr(0,5);
        }}
      }));      

      console.log("sss" + this.refs.searchinput);

      Actions.zeigeOrte(this.state.plz);
    }

//    this.refs.searchinput.getDOMNode().select();
  },

  handleClickOrt: function(index) {
    this.navigateToOrt(index);
  },

  render: function() {
    var self = this;

    var suggestions;
    if (this.state.orte.length > 0) {
      suggestions =   
        <ul className="suggestions">
          { this.state.orte.map(function(ort, index) {
              var classes = React.addons.classSet({
                'suggestion-item': true,
                'active': (index == self.state.selectedOrt)
              });
             return <li onClick={self.handleClickOrt.bind(self,index)} key={ort.payload.id} className={classes}>{ort.text}</li>;
          })}              
        </ul>
    }


    return (
      <div className="search col-md-8 col-md-offset-2">
        <p className="search-header">Ihre Suche hat ein Ende:</p>
        <form className="form-inline" role="form">
          <div className="form-group col-sm-8">
            <input ref="searchinput" className="form-control input-lg" id="exampleInputEmail2" 
              value={this.state.plz} placeholder="Postleitzahl Ihres Unternehmensstandortes" 
              onChange={this.handleChange} onKeyDown={this.handleOnKeyDown} 
              onFocus={this.handleFocus} onBlur={this.handleBlur} />

              {suggestions}

          </div>
          <button ref="searchbutton" type="submit" className="btn btn-lg btn-default">
            KONTAKTE FINDEN
          </button>
        </form>
      </div>
    );
  }
});
