//var process = require('process');
var _ = require('highland');
var request = require('request');
var util = require('util');
var cheerio = require('cheerio');


var cache = {};

var telPattern = /\+49\s(\d+)\s(.*)/;


function formatDetails(details) {

  domDetails = cheerio.load(details);

  name = domDetails('h2#titlee').text();

  // Anschrift

  adresse = domDetails('td:has(p:contains("Adresse")) + td p');

  adressFelder = adresse.text().split( /\n/);

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

  return name + "^" + anschrift1 + "^" + anschrift2 + "^" + anschrift3 + "^" + tel + "^" + fax + "^" + email + "^" + www;
}

function getDetails(plz,name,url) {
  if (cache[name]) return plz + "^" + cache[name];
  else {
    return _(request.get(url))
      .collect()
      .map(function(chunks) {
        return plz + "^" + (cache[name] = formatDetails(Buffer.concat(chunks).toString()));  
      })
  }
}


var res = _(process.stdin)
  .split()
  .map(function(line) {
    return line.split('^');  
  })
  .uniq(function(i,j) {
    return i[0] === j[0];
  })
  .map(function(input) {
    return getDetails(input[0],input[1],input[2])
  })
  .flatten()
  .map(function(line) {
    return line + '\n';
  })
  .pipe(process.stdout);




  