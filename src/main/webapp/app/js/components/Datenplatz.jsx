/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="col-md-6 dp">

          <div className="row">
              <div className="col-md-8">
                  <p className="kategorie">{this.props.datenplatz.kategorie}</p>
                  <p className="name">{this.props.datenplatz.name}</p>
              </div>
              <div className="col-md-2">
                  <img className="platzlogo" src="img/content/stegun.png" />
              </div>
          </div>
                
          <p className="anschrift"><i className="fa fa-home icon-grey"></i>&nbsp;{this.props.datenplatz.anschrift1} - {this.props.datenplatz.anschrift2}</p>

          <p className="telefon"><i className="fa fa-phone icon-grey"></i>&nbsp;{this.props.datenplatz.telefon}</p>
          <p className="telefax"><i className="fa fa-file-photo-o icon-grey"></i>&nbsp;{this.props.datenplatz.fax}</p>
          <p className="email"><i className="fa fa-envelope-o icon-grey"></i>&nbsp;
              <a href="mailto:info@test.de">{this.props.datenplatz.email}</a>
          </p>
          <p className="url"><i className="fa fa-globe icon-grey"></i>&nbsp;<a href="test.de">{this.props.datenplatz.url}</a></p>
      </div>
    );
  }
});
