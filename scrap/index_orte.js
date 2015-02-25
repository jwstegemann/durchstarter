//var process = require('process');
var _ = require('highland');
var request = require('request');
var util = require('util');
var cheerio = require('cheerio');
var bunyan = require('bunyan');
var es = require('elasticsearch');

var orte = require('./orte.js');


var client = new es.Client({
  host: process.argv[2],
  log: 'warning'
});


var doBulk = _.wrapCallback(function(bulk, callback) {
      client.bulk({body: bulk}, function(err, res, status) {
        if (err) log.error(err);
        else log.info("index erfolgreich... " + status);
        callback(err,res);
      });

});

var log = bunyan.createLogger({name: "index_orte"});

orte.stream()
  .reject(function(ort) {
    return ort.id === 'id';
  })
  .batch(1000)
  .flatMap(function(batch) {
    return _(batch).reduce([],function(bulk,ort) {
      titel = ort.plz + ' (Gemeinde ' + ort.gemeinde + ', Landkreis ' + ort.landkreis + ' in ' + ort.bundesland + ')';
      koord = "13.000,51.000"; //ort.latitude.replace(',','.') + ',' + ort.longitude.replace(',','.');

      doc = {
        _id: ort.id,
        bezeichnung: {
          input: titel,
          payload: {
            id: ort.id,
            koordinaten: koord
          }
        },
        plz: ort.plz,
        land: ort.bundesland,
        gemeinde: ort.gemeinde,
        koordinaten: koord      
      }

      bulk.push({index: {_index: 'orte', _type: 'ort', _id: doc._id}});
      bulk.push(doc);

      return bulk;    
    })
  })
  .map(doBulk)
  .flatten()
  .toArray(function(results) {
    log.info("beende Client");
    client.close();
  });

