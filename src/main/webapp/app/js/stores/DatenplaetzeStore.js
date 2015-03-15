'use strict';

var Reflux = require('reflux');
var Actions = require('../Actions');
var request = require('superagent');


module.exports = Reflux.createStore({

    // Initial setup
    init: function() {
        // Register statusUpdate action
        this.listenTo(Actions.sucheDatenplaetze, this.update);
        this.listenTo(Actions.resetDatenplaetze, this.reset);
    },

    // Callback
    update: function(ort) {
        self = this;
        request
           .get('/datenplaetze/' + ort.payload.id)
           .end(function(result){
                var datenplaetze = result.body.hits.hits.map(function(hit, id) {
                    return hit._source;
                });
                //console.log("update dps");
                self.trigger({
                  id: ort.payload.id,
                  dps: datenplaetze.sort(function(a,b) {
                        return (a.prio <= b.prio)?-1:1;
                    }),
                  name: ort.text
                });
           });
    },

    reset: function() {
      this.trigger({
        id: undefined,
        dps: [],
        name: ''
      });
    }

});
