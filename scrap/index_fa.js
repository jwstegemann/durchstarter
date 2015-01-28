//var process = require('process');
var _ = require('highland');
var request = require('request');
var util = require('util');
var cheerio = require('cheerio');
var bunyan = require('bunyan');
var es = require('elasticsearch');
var fs = require('fs');
var nl = require('os').EOL;
var extend = require('util')._extend;

var orte = require('./orte.js');
var kategorien = require('./kategorien.js')


var client = new es.Client({
  host: 'localhost:9200',
  log: 'warning'
});


var doBulk = _.wrapCallback(function(bulk, callback) {
      client.bulk({body: bulk}, function(err, res, status) {
        if (err) log.error(err);
        else log.info("index erfolgreich... " + status);
        callback(err,res);
      });
});

var log = bunyan.createLogger({name: "index_fa"});

orte.map(function(gemeinden) {

  _(fs.createReadStream('dp_finanzamt.csv'))
    .split()
//    .take(1000)
    .map(function(line) {
      fields = line.split('^');

      return {
        _id: 'fa_' + fields[0],
        kategorie: fields[9],
        prio: kategorien[fields[9]],
        name: fields[1],
        anschrift1: fields[2],
        anschrift2: fields[3],
        anschrift3: fields[4],
        telefon: fields[5],
        fax: fields[6],
        email: fields[7],
        url: fields[8],
        icon: 'fa.jpg',
        gemeinde: fields[10]
      }
    })
    .reject(function(fa) {
      return fa._id === 'fa_id';
    })
    .flatMap(function(fa) {
      if (!gemeinden[fa.gemeinde]) return _([]);
      else return _(gemeinden[fa.gemeinde])
        .map(function(ort) {
          doc = extend({
            ort: ort.id
          }, fa);
          doc._id = doc._id + '_' + ort.id;
          return doc;
        })
    })
/*    .each(function(dp) {
      log.info("DP: " + dp._id + ", ort=" + dp.ort);
    })
*/
    .batch(1000)
    .flatMap(function(batch) {
      return _(batch).reduce([],function(bulk,doc) {

        bulk.push({index: {_index: 'datenplaetze', _type: 'datenplatz', _id: doc._id}});
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

})


