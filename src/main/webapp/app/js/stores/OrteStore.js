'use strict';

var Reflux = require('reflux');
var Actions = require('../Actions');
var request = require('superagent');


module.exports = Reflux.createStore({

    // Initial setup
    init: function() {
        // Register statusUpdate action
        this.listenTo(Actions.suchePlz, this.update);
    },

    // Callback
    update: function(text) {
        //console.log("update orte " + text);
        if (text.length > 0) {
            var self = this;
            request
               .get('/orte/' + text)
               .end(function(result){
                   var orte = result.body.hits.hits.map(function(hit, id) {
                       return hit._source;
                   });
                    //console.log("got orte: " + orte);
                    self.trigger(orte.sort(function(a,b) {
                      return a.plz < b.plz?-1:1;
                    }));
                    //console.log("getriggert");
               });
        }
    }

});
