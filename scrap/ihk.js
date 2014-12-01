var request = require('superagent');
var cheerio = require('cheerio');


var plz = '38159';
var url = 'http://www.dihk.de/ihk-finder/ihk-finder-dihk.html?tx_wisihkdihk_pi1%5Bsword%5D='+plz+'&tx_wisihkdihk_pi1%5Bihk%5D=&tx_wisihkdihk_pi1%5Bbundesland%5D=';

request.get(url)
  .end(function(res){
    if (res.ok) {
      domPlz = cheerio.load(res.text);
      ihkUrl = domPlz('#ergebniss_liste_table tr:nth-child(2) td:nth-child(2) a').attr('href');

      request.get(ihkUrl)
        .end(function(details) {

          if(res.ok){
            domDetails = cheerio.load(details.text);

            name = domDetails('h2#titlee');
            adresse = domDetails('td:has(p:contains("Adresse")) + td');

            console.log(name.text());
            console.log(adresse.text());

          }
          else {
            console.log('Details-Fehler:' + res.error.message);      
          }

        });

    }
    else {
      console.log('Fehler:' + res.error.message);
    }
  });