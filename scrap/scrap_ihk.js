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


var client = new es.Client({
  host: 'localhost:9200',
  log: 'error'
});

var log = bunyan.createLogger({name: "index_ihk", src: true});


var findIhk = _.wrapCallback(function(ort, callback) {
  url = 'http://www.dihk.de/ihk-finder/ihk-finder-dihk.html?tx_wisihkdihk_pi1%5Bsword%5D='+ort.plz+'&tx_wisihkdihk_pi1%5Bihk%5D=&tx_wisihkdihk_pi1%5Bbundesland%5D=';

  request.get(url, function(err, res, body) {
      if (!err) {

        domPlz = cheerio.load(body);

        callback(err, {
          ort: ort.id,
          plz: ort.plz,
          id: domPlz('#ergebniss_liste_table tr:nth-child(2) td:nth-child(2) a').text(),
          url: domPlz('#ergebniss_liste_table tr:nth-child(2) td:nth-child(2) a').attr('href')
        });
      }
      else {
        callback(err, res);
      }
    });
});

var cache = {};

var telPattern = /\+49\s(\d+)\s(.*)/;

var getDetails = _.wrapCallback(function(ihk, callback) {

  if (cache[ihk.id]) {

    details = extend({},cache[ihk.id]);
    details.ort = ihk.ort;

    callback(null, details)
  }
  else {
    request.get(ihk.url, function(err, res, body) {
        if (!err) {
          domDetails = cheerio.load(body);

          // Anschrift

          adresse = domDetails('td:has(p:contains("Adresse")) + td p');
          adressFelder = adresse.text().split( /\n/);

          // Kontakt

          kontakt = domDetails('td:has(p:contains("Kontakt")) + td p');
          telElements = telPattern.exec(kontakt.find('span.detailLabel_tel').text());
          faxElements = telPattern.exec(kontakt.find('span.detailLabel_fax').text());


          details = {
            ort: ihk.ort,
            name: domDetails('h2#titlee').text(),
            anschrift1: adressFelder[0].trim(),
            anschrift2: adressFelder[1].trim(),
            anschrift3: adressFelder[2].trim(),
            telefon: "(0" + telElements[1] + ") " + telElements[2],
            fax: "(0" + faxElements[1] + ") " + faxElements[2],
            email: kontakt.find('span.detailLabel_email').text().replace("(at)","@"),
            url: kontakt.find('span.detailLabel_www').text(),
            kategorie: 'Industrie- und Handelskammer',
            icon: 'ihk.jpg'
          }

          cache[ihk.id] = details;

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
//  .take(3)
  .flatMap(findIhk)
  .reject(function(ihk) {
    if (!ihk.url || !ihk.id) {
      log.error({falsche_ihk: ihk});
      return true;
    }
    else {
      return false;
    }
  })
  .flatMap(getDetails)
  .map(function(ihk) {
    return ''
      + (++index) + '^'
      + ihk.name + '^'
      + ihk.anschrift1 + '^'
      + ihk.anschrift2 + '^'
      + ihk.anschrift3 + '^'
      + ihk.telefon + '^'
      + ihk.fax + '^'
      + ihk.email + '^'
      + ihk.url + '^'
      + ihk.kategorie + '^'
      + ihk.ort + '^'
      + ihk.icon + nl;
  })
  .pipe(process.stdout);
