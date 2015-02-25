/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {

    var urlText;
    if (this.props.datenplatz.url.length > 35) urlText = this.props.datenplatz.url.substr(0,35) + "...";
    else urlText = this.props.datenplatz.url;

    var emailText;
    if (this.props.datenplatz.email.length > 35) urlText = this.props.datenplatz.email.substr(0,35) + "...";
    else emailText = this.props.datenplatz.email;

    var anschrift1, anschrift2, anschrift3, telefon, fax, email, url;
    if (this.props.datenplatz.anschrift1 != '') {
      anschrift1 = (<span><i className="fa fa-home fa-fw icon-grey"></i>&nbsp;{this.props.datenplatz.anschrift1}<br/></span>)
    }
    if (this.props.datenplatz.anschrift2 != '') {
      anschrift2 = (<span><i className="fa fa-fw"></i>&nbsp;{this.props.datenplatz.anschrift2}<br/></span>)
    }
    if (this.props.datenplatz.anschrift3 != '') {
      anschrift3 = (<span><i className="fa fa-fw"></i>&nbsp;{this.props.datenplatz.anschrift3}<br/></span>)
    }
    if (this.props.datenplatz.telefon != '') {
      telefon = (<p className="telefon"><i className="fa fa-fw fa-phone icon-grey"></i>&nbsp;{this.props.datenplatz.telefon}</p>)
    }
    if (this.props.datenplatz.fax != '') {
      fax = (<p className="telefax"><i className="fa fa-fw fa-file-photo-o icon-grey"></i>&nbsp;{this.props.datenplatz.fax}</p>)
    }        
    if (this.props.datenplatz.email != '') {
      email = (<p className="email"><i className="fa fa-fw fa-envelope-o icon-grey"></i>&nbsp;
              <a href={'mailto:' + this.props.datenplatz.email}>{emailText}</a>
          </p>)
    }
    if (this.props.datenplatz.url != '') {
      url = (<p className="url"><i className="fa fa-fw fa-globe icon-grey"></i>&nbsp;<a href={'http://' + this.props.datenplatz.url} target="_blank">{urlText}</a></p>)
    }

    return (
      <div className="col-md-6 dp">

          <div className="row">
              <div className="col-xs-8">
                  <p className="kategorie">{this.props.datenplatz.kategorie}</p>
                  <p className="name">{this.props.datenplatz.name}</p>

                  <p className="anschrift">
                    {anschrift1}
                    {anschrift2}
                    {anschrift3}
                  </p>

          {telefon}
          {fax}
          
          {email}
          {url}
              </div>
              <div className="col-xs-2">
                  <img className="platzlogo" src={'img/logos/' + this.props.datenplatz.icon} />
              </div>
          </div>
                
          
      </div>
    );
  }
});
