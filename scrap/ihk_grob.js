//var process = require('process');
var _ = require('highland');
var request = require('request');
var util = require('util');
var cheerio = require('cheerio');
var bunyan = require('bunyan');

var orte = require('./orte.js');


var log = bunyan.createLogger({name: "ihk_grob"});



function formatDetails(details) {

  domDetails = cheerio.load(details);

  ihkId = domDetails('#ergebniss_liste_table tr:nth-child(2) td:nth-child(2) a').text();
  ihkUrl = domDetails('#ergebniss_liste_table tr:nth-child(2) td:nth-child(2) a').attr('href');

  return ihkId + '^' + ihkUrl;

}

function getDetails(plz) {
  url = 'http://www.dihk.de/ihk-finder/ihk-finder-dihk.html?tx_wisihkdihk_pi1%5Bsword%5D='+plz+'&tx_wisihkdihk_pi1%5Bihk%5D=&tx_wisihkdihk_pi1%5Bbundesland%5D=';

  return _(request.get(url))
    .collect()
    .map(function(chunks) {
      return plz + "^" + (cache[name] = formatDetails(Buffer.concat(chunks).toString()));  
    })
}


/* var res = _(process.stdin)
  .split()
  .map(function(line) {
    return line.split('^');  
  })
  .uniq(function(i,j) {
    return i[0] === j[0];
  })
  .map(function(input) {
    return getDetails(input[0])
  })
  .flatten()
  .map(function(line) {
    return line + '\n';
  })
  .pipe(process.stdout); */


orte.each(function(ort) {
  log.info(ort.plz);
});

orte.map(function(gemeinden) {
  log.info(gemeinden['Dresden(1067)'][0]);
})

