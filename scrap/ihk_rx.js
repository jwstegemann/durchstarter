//var process = require('process');
var highland = require('highland');
var request = require('request');


var cache = {};

var getDetails = function(url, callback) {
  return request.get(url)
    .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1')
    .end(callback)
};

var details = Rx.Observable.fromCallback(getDetails);

/*
 * main
 */

var source = Rx.Node.fromEvent(process.stdin.pipe(split()), 'data')
  .map(function(line) {
    return line.split('^');
  })
  .do(function(input) {
    details(input[2]);
  })


Rx.Node.writeToStream(details
  .map(function(a,b) {
    console.log("###a " + a);
    console.log("###b " + b);
  })
  ,process.stdout);


/*
  .subscribe(
    function(x) {
      console.log("Next: " + x);
    },
    function(err) {
      console.error("Error: " + err);
    },
    function() {
      console.log("Completed.");
    }
  );
*/


  