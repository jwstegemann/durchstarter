 
var system = require('system');

var ort = system.args[1];
var plz = system.args[2];
var id = system.args[3];

console.error('scraping ort=' + ort + ', plz=' + plz);


var page = new WebPage(), testindex = 0, loadInProgress = false;


page.onConsoleMessage = function(msg) {
  console.error(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.error("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.error("load finished");
};

var steps = [
  function() {
    //Load Login Page
    page.open("http://www.arbeitsagentur.de/", function(status) {

      var plz = '8888';

    });
  },
  function() {
    //Enter PLZ
    page.evaluate(function(ort, plz) {

      input = document.querySelector('#pvoq');
      input.value = plz;

      doSearchPvo(document.getElementById('pvoq'));

    }, ort, plz);
  }, 
  function() {
    //Login
    loadInProgress = true;

    page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function() {

      loadInProgress = false;

      system.myOffset = page.evaluate(function(ort, plz, id) {

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

          console.log( '####' + id + '_' + index + '^'
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

        // navigate to 
        jQuery('div[title="Ergebnisliste der Jobcenter und optierenden Kommunen"]').click();
//        jobCenterTab = jQuery('a:contains("Jobcenter")');

//        console.log('attr='+jobCenterTab.attr('_afrptkey'));

/*        console.log('tabs='+jobCenterTab.length);

        offset = jobCenterTab.offset();

        console.log('offset innen (' + offset.left + ', ' + offset.top + ')');

        return offset; */

      },ort, plz, id);

      page.sendEvent('click',194,477, button='left');
    page.sendEvent('mouseup',194,477, button='left');

    });

  }, 
  function() {

    page.sendEvent('mouseup',194,477, button='left');
      page.sendEvent('click',194,477, button='left');

    page.render('aa.jpg', {format: 'jpeg', quality: '100'});
  },
  function() {

    page.render('bb.jpg', {format: 'jpeg', quality: '100'});

    page.evaluate(function(ort, plz, id) {

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
        if (telElement.length) tel = telElement.text();
        else tel = '';

        faxElement = kontaktHeaderDiv.parent().find('div:contains("Fax")')
        if (faxElement.length) fax = faxElement.text();
        else fax = '';

        emailElement = kontaktHeaderDiv.parent().find('div:contains("Email")')
        if (emailElement.length) email = emailElement.text();
        else email = '';


        console.log( '####' + id + '_' + index + '^'
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
    },ort, plz, id);
  }
];


interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    console.error("step " + (testindex + 1));
    steps[testindex]();
    testindex++;
  }
  if (!loadInProgress && typeof steps[testindex] != "function") {
    console.error("test complete!");
    phantom.exit();
  }
}, 200000);

