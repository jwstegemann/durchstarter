//var process = require('process');
var _ = require('highland');
var request = require('request');
var util = require('util');
var cheerio = require('cheerio');
var bunyan = require('bunyan');
var es = require('elasticsearch');
var nl = require('os').EOL;
var extend = require('util')._extend;

var orte = require('./orte.js');


var log = bunyan.createLogger({name: "index_ihk", src: true});

cache = {};

var getGemeinde = _.wrapCallback(function(ort, callback) {

  if (cache[ort.gemeinde]) {

    details = extend({},cache[ort.gemeinde]);

    callback(null, details)
  }
  else {

    url = "http://de.wikipedia.org/wiki/" + ort.gemeinde.replace(" ","_");

    request.get(url, function(err, res, body) {
        if (!err) {
          domDetails = cheerio.load(body);

          // Anschrift

          titel = domDetails('#firstHeading').text();

          adresse = domDetails('td:contains("verwaltung:") + td');
          adressFelder = adresse.text().split( /\n/);

          plzs = domDetails('td:contains("Postleitzahlen:") + td')
            .first().contents().filter(function() {
              return this.name !== 'span';
            }).text();

          details = {
               ort: ort.id,
               plz: ort.plz,
               gemeinde: ort.gemeinde,
               titel: titel,
               anschrift1: adressFelder[0],
               anschrift2: adressFelder[1],
               postleitzahlen: plzs.replaceAll('\n',''),
               url: domDetails('td:contains("Webpräsenz:") + td').text().replaceAll('\n','')
          }

          cache[ort.gemeinde] = details;

          callback(err, details);
        }
        else {
          callback(err, res);
        }
      });
    }
});


var index = 0;

orte.stream()
  .reject(function(ort) {
    return ort.id === 'id';
  })
//  .take(50)
  .flatMap(getGemeinde)
  .map(function(gemeinde) {
    return ''
      + gemeinde.ort + '^'
      + gemeinde.plz + '^'
      + gemeinde.gemeinde + '^'
      + gemeinde.titel + '^'
      + gemeinde.anschrift1 + '^'
      + gemeinde.anschrift2 + '^'
      + gemeinde.url + '^'
      + gemeinde.postleitzahlen + nl;
  })
  .pipe(process.stdout);
