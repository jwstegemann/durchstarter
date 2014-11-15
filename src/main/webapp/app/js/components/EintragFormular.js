/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var request = require('superagent');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      checked: false,
      msg: 'ANGEBOT ANFORDERN'
    };
  },

  angebot: function(e) {
    var form = this.refs.ef.getDOMNode();

    if (!form.checkValidity || form.checkValidity()) {
      this.setState({
        checked: false,
        msg: 'VIELEN DANK FÜR IHR INTERESSE!'
      });

      var name = this.refs.name.getDOMNode().value;
      var anschrift = this.refs.anschrift.getDOMNode().value;
      var ansprechpartner = this.refs.ansprechpartner.getDOMNode().value;
      var telefon = this.refs.telefon.getDOMNode().value;
      var fax = this.refs.fax.getDOMNode().value;
      var email = this.refs.email.getDOMNode().value;
      var postleitzahlen = this.refs.postleitzahlen.getDOMNode().value;

      request
           .put('/angebot/2')
           .send({
              name: name,
              anschrift: anschrift,
              ansprechpartner: ansprechpartner,
              telefon: telefon,
              fax: fax,
              eMail: email,
              postleitzahlen: postleitzahlen
            })
           .end(function(result){
//                console.log(result)
           });

      form.reset();

    } else {
      this.setState({
        checked: true
      });
    }
  },

  render: function() {
    var classes = React.addons.classSet({
                'checked': this.state.checked,
                'form-horizontal': true ,
                'angebot': true
    });

    return (
      <form ref="ef" role="form" className={classes} >
        <span className="help-block form-title">Fordern Sie noch heute unser Angebot für Sie an:</span>

        <div className="form-group">
          <label className="col-sm-2 control-label">Name</label>
          <div className="col-sm-10">
            <input ref="name" required type="text" className="form-control" id="inputName" placeholder="... des Unternehmens"></input>
          </div>
        </div>
      <div className="form-group">
          <label className="col-sm-2 control-label">Anschrift</label>
          <div className="col-sm-10">
            <input ref="anschrift" required type="text" className="form-control" id="inputAnschrift" placeholder=""></input>
          </div>
        </div>
      <div className="form-group">
          <label className="col-sm-2 control-label">Ansprechpartner</label>
          <div className="col-sm-10">
            <input ref="ansprechpartner" type="text" className="form-control" id="inputAnsprechpartner" placeholder=""></input>
          </div>
        </div>
      <div className="form-group">
          <label className="col-sm-2 control-label">Telefon</label>
          <div className="col-sm-10">
            <input ref="telefon" required type="text" className="form-control" id="inputTelefon" placeholder=""></input>
          </div>
        </div>
      <div className="form-group">
          <label className="col-sm-2 control-label">Fax</label>
          <div className="col-sm-10">
            <input ref="fax" type="text" className="form-control" id="inputFax" placeholder=""></input>
          </div>
        </div>
      <div className="form-group">
          <label className="col-sm-2 control-label">Email</label>
          <div className="col-sm-10">
            <input ref="email" required type="email" className="form-control" id="inputEmail" placeholder=""></input>
          </div>
        </div>
      <div className="form-group">
          <label className="col-sm-2 control-label">Postleitzahlen</label>
          <div className="col-sm-10">
            <input ref="postleitzahlen" required type="text" className="form-control" id="inputStandorte" placeholder="... aller Standorte des Unternehmens"></input>
          </div>
        </div>            
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="button" className="btn btn-default" onClick={this.angebot}>{this.state.msg}</button>
          </div>
        </div>
      </form>
    );
  }
});