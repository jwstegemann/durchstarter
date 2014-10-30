/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {

    var anschrift1, anschrift2, anschrift3;
    if (this.props.datenplatz.anschrift1 != '') {
      anschrift1 = (<span><i className="fa fa-home fa-fw icon-grey"></i>&nbsp;{this.props.datenplatz.anschrift1}<br/></span>)
    }
    if (this.props.datenplatz.anschrift2 != '') {
      anschrift2 = (<span><i className="fa fa-fw"></i>&nbsp;{this.props.datenplatz.anschrift2}<br/></span>)
    }
    if (this.props.datenplatz.anschrift3 != '') {
      anschrift3 = (<span><i className="fa fa-fw"></i>&nbsp;{this.props.datenplatz.anschrift3}<br/></span>)
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

          <p className="telefon"><i className="fa fa-fw fa-phone icon-grey"></i>&nbsp;{this.props.datenplatz.telefon}</p>
          <p className="telefax"><i className="fa fa-fw fa-file-photo-o icon-grey"></i>&nbsp;{this.props.datenplatz.fax}</p>
          <p className="email"><i className="fa fa-fw fa-envelope-o icon-grey"></i>&nbsp;
              <a href={'mailto:' + this.props.datenplatz.email}>{this.props.datenplatz.email}</a>
          </p>
          <p className="url"><i className="fa fa-fw fa-globe icon-grey"></i>&nbsp;<a href={'http://' + this.props.datenplatz.url} target="_blank">{this.props.datenplatz.url}</a></p>
              </div>
              <div className="col-xs-2">
                  <img className="platzlogo" src={this.props.logoFile} />
              </div>
          </div>
                
          
      </div>
    );
  }
});
