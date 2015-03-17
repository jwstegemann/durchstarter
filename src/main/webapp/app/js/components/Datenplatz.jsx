/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Datenplatz',

  render: function() {

    var urlText;
    if (this.props.datenplatz.url.length > 35) urlText = this.props.datenplatz.url.substr(0,35) + "...";
    else urlText = this.props.datenplatz.url;

    var emailText;
    if (this.props.datenplatz.email.length > 35) emailText = this.props.datenplatz.email.substr(0,35) + "...";
    else emailText = this.props.datenplatz.email;

    var classLeer0 = (!this.props.datenplatz.ansprechpartner && !this.props.datenplatz.anschrift1 && !this.props.datenplatz.anschrift2 && !this.props.datenplatz.anschrift3)?"ausgeblendet":"";
    var classAnsprechpartner = (!this.props.datenplatz.ansprechpartner)?"ausgeblendet":"";
    var classAnschrift = (!this.props.datenplatz.anschrift1 && !this.props.datenplatz.anschrift2 && !this.props.datenplatz.anschrift3)?"ausgeblendet":"";
    var classLeer1 = (!this.props.datenplatz.telefon && !this.props.datenplatz.fax)?"ausgeblendet":"";
    var classTelefon = (!this.props.datenplatz.telefon)?"ausgeblendet":"";
    var classTelefax = (!this.props.datenplatz.fax)?"ausgeblendet":"";
    var classLeer2 = (!this.props.datenplatz.email && !this.props.datenplatz.url)?"ausgeblendet":"";
    var classEmail = (!this.props.datenplatz.email)?"ausgeblendet":"";
    var classUrl = (!this.props.datenplatz.url)?"ausgeblendet":"";


    return (
      <div className="col-md-6 dp">

          <div className="row">
              <div className="col-xs-8">
                <table>
                  <tr><td className="kategorie" colSpan="2">{this.props.datenplatz.kategorie}</td></tr>
                  <tr><td className="name" colSpan="2">{this.props.datenplatz.name}<br/>{this.props.datenplatz.name2}</td></tr>
                  <tr className={"leer-row " + classLeer0}><td colSpan="2" /></tr>
                  <tr className={classAnsprechpartner}><td className="icon-col" ><i className="fa fa-user fa-fw icon-grey"></i></td><td className="ansprechpartner">{this.props.datenplatz.ansprechpartner}</td></tr>
                  <tr className={classAnschrift}><td className="icon-col" ><i className="fa fa-home fa-fw icon-grey"></i></td><td className="anschrift">{this.props.datenplatz.anschrift1}<br/>{this.props.datenplatz.anschrift2}<br/>{this.props.datenplatz.anschrift3}</td></tr>
                  <tr className={"leer-row " + classLeer1}><td colSpan="2" /></tr>
                  <tr className={classTelefon}><td className="icon-col" ><i className="fa fa-fw fa-phone icon-grey"></i></td><td className="telefon">{this.props.datenplatz.telefon}</td></tr>
                  <tr className={classTelefax}><td className="icon-col" ><i className="fa fa-fw fa-fax icon-grey"></i></td><td className="telefax">{this.props.datenplatz.fax}</td></tr>
                  <tr className={"leer-row " + classLeer2}><td colSpan="2" /></tr>
                  <tr className={classEmail}><td className="icon-col" ><i className="fa fa-fw fa-envelope-o icon-grey"></i></td><td className="email"><a href={'mailto:' + this.props.datenplatz.email}>{emailText}</a></td></tr>
                  <tr className={classUrl}><td className="icon-col" ><i className="fa fa-fw fa-globe icon-grey"></i></td><td className="url"><a href={'http://' + this.props.datenplatz.url} target="_blank">{urlText}</a></td></tr>
                </table>
              </div>
              <div className="col-xs-2">
                  <img className="platzlogo" src={'img/logos/' + this.props.datenplatz.icon} />
              </div>
          </div>


      </div>
    );
  }
});
