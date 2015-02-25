'use strict';

var Reflux = require('reflux');
var Actions = require('../Actions');
var request = require('superagent');


module.exports = Reflux.createStore({

    // Initial setup
    init: function() {
        // Register statusUpdate action
        this.listenTo(Actions.zeigeDatenplaetze, this.update);
    },

    // Callback
    update: function(ortId) {
        self = this;
        request
           .get('/datenplaetze/' + ortId)
           .end(function(result){
                var datenplaetze = result.body.hits.hits.map(function(hit, id) {
                    return hit._source;
                });
                //console.log("update dps");
                self.trigger(datenplaetze.sort(function(a,b) {
                    return (a.prio <= b.prio)?-1:1;    
                }));
           });
    }

});