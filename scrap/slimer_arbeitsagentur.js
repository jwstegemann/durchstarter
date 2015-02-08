 
var system = require('system');

var ort = system.args[1];
var plz = system.args[2];
var id = system.args[3];

console.error('scraping ort=' + ort + ', plz=' + plz);


var page = require("webpage").create(), testindex = 0, loadInProgress = false;

page.viewportSize = { width: 400, height: 400 };
page.settings.loadImages = false;

page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

  console.error(msgStack.join('\n'));

};

page.onResourceError = function(resourceError) {
  console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
  console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};

page.onResourceTimeout = function(request) {
    console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
};

/* page.onResourceRequested = function(requestData, networkRequest) {
  console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
};

page.onResourceReceived = function(response) {
  console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
};

*/

page.onConsoleMessage = function(msg) {
  console.error(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.error("load started");
};

page.onLoadFinished = function(status) {
  loadInProgress = false;
  console.error("load finished: " + status);
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
    //loadInProgress = true;

//    page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function() {

      //loadInProgress = false;

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

        $('div[title="Ergebnisliste der Jobcenter und optierenden Kommunen"]').click();

      }, ort, plz, id);

//   });

  },
  function() {

//    page.render('bb.jpg', {format: 'jpeg', quality: '100'});

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
        if (telElement.length) tel = telElement.text().substr(5);
        else tel = '';

        faxElement = kontaktHeaderDiv.parent().find('div:contains("Fax")')
        if (faxElement.length) fax = faxElement.text().substr(5);
        else fax = '';

        emailElement = kontaktHeaderDiv.parent().find('div:contains("Email")')
        if (emailElement.length) email = emailElement.text().substr(7);
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
  },
  function() {

    page.render('cc.jpg', {format: 'jpeg', quality: '100'});
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
}, 6000);

