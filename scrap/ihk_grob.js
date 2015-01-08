var request = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');
var async = require('async');
var nl = require('os').EOL;
var sleep = require('sleep');

var idx = 1;

var cache = {};


function scrap(plz, callback) {

  var url = 'http://www.dihk.de/ihk-finder/ihk-finder-dihk.html?tx_wisihkdihk_pi1%5Bsword%5D='+plz+'&tx_wisihkdihk_pi1%5Bihk%5D=&tx_wisihkdihk_pi1%5Bbundesland%5D=';

  request.get(url)
    .end(function(err, res){
      if (!err) {

        domPlz = cheerio.load(res.text);
        ihkId = domPlz('#ergebniss_liste_table tr:nth-child(2) td:nth-child(2) a').text();
        ihkUrl = domPlz('#ergebniss_liste_table tr:nth-child(2) td:nth-child(2) a').attr('href');

        console.log(plz + "^" + ihkId + "^" + ihkUrl);
      }
      else {
        console.log('### Fehler@'+plz+':' + err.message);
      }

      idx++;
      callback();
    });
}

// handle file

var plzPattern = /\d{5}$/;

var plzs = fs.readFileSync('./plzs.csv').toString().split(nl);

async.eachSeries(plzs, function(plzLine, callback) {

  plz = plzLine.match(plzPattern);

  if (plz) scrap(plz[0], callback);

  if (idx !== 0 && (idx % 100) === 0) sleep.sleep(20);

})