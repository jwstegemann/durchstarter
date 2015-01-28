var _ = require('highland');
var fs = require('fs');
var nl = require('os').EOL;
var bunyan = require('bunyan');

var log = bunyan.createLogger({name: "orte"});

function readOrte() {
  return _(fs.createReadStream('orte.csv'))
    .split()
    .map(function(line) {
      fields = line.split('^');
      return {
        id: fields[0],
        plz: fields[1],
        bundesland: fields[2],
        landkreis: fields[3],
        gemeinde: fields[4],
        longitude: fields[11],
        latitude: fields[12],
        gemeindeverwaltung: fields[15]
      }
    })
}

module.exports = {
  map : function(callback) {
    readOrte()
      .group('gemeindeverwaltung')
      .pull(function(err,orte) {
        if (err) log.error(err);
        else callback(orte);
      })    
  },
  each: function(callback) {
    readOrte()
      .each(function(ort) {
        callback(ort);
      })
  },
  stream: readOrte
}  
