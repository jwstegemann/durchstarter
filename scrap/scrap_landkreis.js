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


var getLandkreise = _.wrapCallback(function(callback) {

  request.get('http://de.wikipedia.org/wiki/Liste_der_Landkreise_in_Deutschland', function(err, res, body) {
      if (!err) {

        dom = cheerio.load(body);

        lks = [];

        lk_rows = dom('#mw-content-text > table tr').each(function(index, element) {
          
          lk_cols = cheerio(element).find('td').map(function(i,e) {
            return cheerio(e).text();
          });

          url = cheerio(element).find('td:nth-of-type(2) > a').attr('href');

          lks.push({
            krs: lk_cols[0],
            landkreis: lk_cols[1],
            bundesland: lk_cols[2],
            kreissitz: lk_cols[3],
            url: url
          });
        });

        callback(err, lks);
      }
      else {
        callback(err, res);
      }
    });
});


var getDetails = _.wrapCallback(function(lk, callback) {

  request.get('http://de.wikipedia.org' + lk.url, function(err, res, body) {
      if (!err) {
        domDetails = cheerio.load(body);

//        log.info(body);

        // Anschrift

        adresse = domDetails('td:contains("verwaltung:") + td');
        adressFelder = adresse.text().split( /\n/);

        url = domDetails('td:contains("Webpräsenz:") + td').text().replace('\n','');

        details = extend({
          anschrift1: adressFelder[0],
          anschrift2: adressFelder[1],
          anschrift3: (adressFelder[2])?(adressFelder[2]):'',
          web: url
        },lk);


        callback(err, details);
      }
      else {
        callback(err, res);
      }
    });
});


getLandkreise()
  .flatten()
  .reject(function(lk) {
    return (!lk.krs || !lk.url)
  })
//  .take(1)
  .flatMap(getDetails)
  .map(function(lk) {
    return lk.krs + "^"
      + lk.kreissitz + "^"
      + lk.landkreis + "^"
      + lk.bundesland + "^"
      + lk.anschrift1 + "^"
      + lk.anschrift2 + "^"
      + lk.anschrift3 + "^"
      + lk.web + nl;
  })
  .pipe(process.stdout);
