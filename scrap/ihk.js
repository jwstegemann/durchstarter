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

  var telPattern = /\+49\s(\d+)\s(.*)/;
  var lineFeed = /\n/;

  request.get(url)
    .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1')
    .end(function(err, res){
      if (!err) {

        domPlz = cheerio.load(res.text);
        ihkId = domPlz('#ergebniss_liste_table tr:nth-child(2) td:nth-child(2) a').text();
        ihkUrl = domPlz('#ergebniss_liste_table tr:nth-child(2) td:nth-child(2) a').attr('href');

        console.log("# IHK(" + plz + ") -> " + ihkId);

        if (!cache[ihkId]) {

          console.log("# lade neu...");

          request.get(ihkUrl)
            .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1')
            .end(function(error, details) {

            /*console.log("plz: " + plz);
            console.log("ihk: " + url);
            console.log("details: " + ihkUrl);
            console.log(""); */

              if(!error){

                console.log("# ...geladen!");
      
                domDetails = cheerio.load(details.text);

                name = domDetails('h2#titlee').text();

                // Anschrift

                adresse = domDetails('td:has(p:contains("Adresse")) + td p');

                adressFelder = adresse.text().split(lineFeed);

                anschrift1 = adressFelder[0].trim();
                anschrift2 = adressFelder[1].trim();
                anschrift3 = adressFelder[2].trim();

                // Kontakt

                kontakt = domDetails('td:has(p:contains("Kontakt")) + td p');

                telElements = telPattern.exec(kontakt.find('span.detailLabel_tel').text());
                tel = "(0" + telElements[1] + ") " + telElements[2]; 

                faxElements = telPattern.exec(kontakt.find('span.detailLabel_fax').text());
                fax = "(0" + faxElements[1] + ") " + faxElements[2]; 

                email = kontakt.find('span.detailLabel_email').text().replace("(at)","@");
                www = kontakt.find('span.detailLabel_www').text();


                // Ausgabe

                id = "ihk" + idx;

                result = name + "^" + anschrift1 + "^" + anschrift2 + "^" + anschrift3
                   + "^" + tel + "^" + fax + "^" + email + "^" + www;

                cache[ihkId] = result;

                console.log("" + idx + "^"+ result + "^" + plz);

                idx++;
                callback();

                /* console.log(anschrift1);
                console.log(anschrift2);
                console.log(anschrift3);

                console.log(tel);
                console.log(fax);
                console.log(email);
                console.log(www);
                */
              }
              else {
                console.log('### Details-Fehler@'+plz+':' + error.message);      
                callback();
              }

            });
        }
        else {

          console.log("" + idx + "^"+ cache[ihkId] + "^" + plz);

          idx++;
          callback();          
        }
        

      }
      else {
        console.log('### Fehler'+plz+':' + err.message);
        callback();
      }
    });
}

// handle file

var plzPattern = /\d{5}$/;

var plzs = fs.readFileSync('./plzs.csv').toString().split(nl);

async.eachSeries(plzs, function(plzLine, callback) {

  plz = plzLine.match(plzPattern);

  try {
    if (plz) scrap(plz[0], callback);
  }
  catch (err) {
    console.log('### ERROR: ' + err);
  }

  if (idx !== 0 && (idx % 100) === 0) sleep.sleep(60);

})