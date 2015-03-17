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
               .get('/ort/suggest/' + text)
               .end(function(result){
                    var orte = result.body.suggest[0].options;
                    //console.log("got orte: " + orte);
                    self.trigger(orte);
                    //console.log("getriggert");
               });
        }
    }

});
