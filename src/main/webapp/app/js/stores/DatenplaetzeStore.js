'use strict';

var Reflux = require('reflux');
var Actions = require('../Actions');
var request = require('superagent');


module.exports = Reflux.createStore({

    // Initial setup
    init: function() {
        console.log("init DatenplaetzeStore");

        // Register statusUpdate action
        this.listenTo(Actions.zeigeDatenplaetze, this.update);
    },

    // Callback
    update: function(ortId) {
        console.log("Bin in update Ort: " + ortId);
        console.log("This.before: " + this);

        self = this;
        request
           .get('/datenplaetze/' + ortId)
           .end(function(result){
                var datenplaetze = result.body.hits.hits.map(function(hit, id) {
                    return hit._source;
                });
                console.log(datenplaetze);
                console.log("This.after: " + self);
                self.trigger(datenplaetze);
           });
    }

});