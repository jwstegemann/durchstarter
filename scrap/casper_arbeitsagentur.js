var casper = require('casper').create({
  viewportSize: { width: 400, height: 600 },
  pageSetting: {
    loadImages: false,
    loadPlugins: false
  }
});


/*
 * scraping
 */
function scrapArbeitsamt(ort) {

  results = jQuery('.ba_searchresult_group.af_panelGroupLayout');

  results.each(function(index, element) {

    titelElement = jQuery(element).find('.ba_searchresult_top_header');

    name = titelElement.text();
    url = titelElement.attr('href');

    adresseHeaderDiv = jQuery(element).find('span:contains("Besucheradresse")').parent();
    kontaktHeaderDiv = jQuery(element).find('span:contains("Kontaktmöglichkeiten")').parent();

    anschrift1 = adresseHeaderDiv.next().text();
    anschrift2 = adresseHeaderDiv.next().next().text();
    anschrift3 = '';

    tel = '0800 / 4 5555 20';
    fax = kontaktHeaderDiv.next().next().text().substr(5);

    email = '';

    console.log( '####' 
      + 'aa_' + ort + '_' + index + '^'
      + name + '^'
      + anschrift1 + '^'
      + anschrift2 + '^'
      + anschrift3 + '^'
      + tel + '^'
      + fax + '^'
      + email + '^'
      + url + '^'
      + 'Arbeitsamt' + '^'
      + ort + '^'
      + 'arbeitsamt.jpg'
    );

  });  
}

function scrapJobcenter(ort) {
  results = jQuery('.ba_searchresult_group.af_panelGroupLayout');

  results.each(function(index, element) {

    titelElement = jQuery(element).find('.ba_searchresult_top_header');

    name = titelElement.text();
    url = titelElement.attr('href');

    adresseHeaderDiv = jQuery(element).find('span:contains("Besucheradresse")').parent();
    kontaktHeaderDiv = jQuery(element).find('span:contains("Kontaktmöglichkeiten")').parent();


    anschrift1 = adresseHeaderDiv.next().text();
    anschrift2 = adresseHeaderDiv.next().next().text();
    anschrift3 = '';

    telElement = kontaktHeaderDiv.parent().find('div:contains("Tel")')
    if (telElement.length) tel = telElement.text().substr(5);
    else tel = '';

    faxElement = kontaktHeaderDiv.parent().find('div:contains("Fax")')
    if (faxElement.length) fax = faxElement.text().substr(5);
    else fax = '';

    emailElement = kontaktHeaderDiv.parent().find('div:contains("Email")')
    if (emailElement.length) email = emailElement.text().substr(6);
    else email = '';


    console.log( '####' 
      + 'jc_' + ort + '_' + index + '^'      
      + name + '^'
      + anschrift1 + '^'
      + anschrift2 + '^'
      + anschrift3 + '^'
      + tel + '^'
      + fax + '^'
      + email + '^'
      + url + '^'
      + 'Jobcenter' + '^'
      + ort + '^'
      + 'jobcenter.jpg'
    );

  });
}

/*
 * casper
 */

casper.on('remote.message', function(msg) {
    this.echo('CONSOLE: >' + msg);
})

casper.start('http://www.arbeitsagentur.de/apps/faces/home/pvo', function() {
});

function handleOrt(ort, plz, selectorInputPLZ) {
  casper.echo('scraping ort=' + ort + ', plz=' + plz);

  casper.wait(5000);
  casper.thenEvaluate(function(plz, selectorInputPLZ) {
      document.querySelector(selectorInputPLZ).value=plz;
      document.querySelector('button[title="Suche ausführen und Suchergebnisse anzeigen"]').click();
    }, plz, selectorInputPLZ
  );

  casper.wait(250);
  casper.thenClick('div[title="Ergebnisliste der Arbeitsagenturen"]');

  casper.waitForSelector('div#pt1\\:r1\\:1\\:pvoTmpl\\:Arbeitsagentur > div', 
    function() {
//      casper.echo('Ergebnisse für Arbeitsagenturen gefunden');
    },
    function() {
      casper.echo('ERROR: Ergebnisse für Arbeitsagenturen nicht gefunden');
    },
    1000);


  casper.thenEvaluate(scrapArbeitsamt, ort);

  casper.wait(250);
  casper.thenClick('div[title="Ergebnisliste der Jobcenter und optierenden Kommunen"]');

  casper.waitForSelector('div#pt1\\:r1\\:1\\:pvoTmpl\\:Jobcenter > div', 
    function() {
//      casper.echo('Ergebnisse für Jobcenter gefunden');
    },
    function() {
      casper.echo('ERROR: Ergebnisse für Jobcenter nicht gefunden');
    },
    1000
  );

  casper.thenEvaluate(scrapJobcenter, ort);

  casper.wait(500);

}


handleOrt('123','38685','#pt1\\:r1\\:0\\:pvoTmpl\\:s1\\:dc2\\:pvosubf\\:Suche_OrtPlz\\:\\:content');
handleOrt('888','38100','#pt1\\:r1\\:1\\:pvoTmpl\\:dc2\\:pvosubf\\:Suche_OrtPlz\\:\\:content');

casper.run();