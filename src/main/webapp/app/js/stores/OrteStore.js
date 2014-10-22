'use strict';

var Reflux = require('reflux');
var Actions = require('../Actions');
var request = require('superagent');


module.exports = Reflux.createStore({

    // Initial setup
    init: function() {
        console.log("init OrteStore");

        // Register statusUpdate action
        this.listenTo(Actions.zeigeOrte, this.update);
    },

    // Callback
    update: function(text) {
        console.log("Bin in update Orteliste: " + text);
        console.log("This.before: " + this);

        self = this;
        request
           .get('/ort/suggest/' + text)
           .end(function(result){
                var orte = result.body;
                console.log(orte);
                console.log("This.after: " + self);
                self.trigger(datenplaetze);
           });
    }

});