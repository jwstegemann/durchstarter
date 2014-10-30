'use strict';

var Reflux = require('reflux');
var Actions = require('../Actions');
var request = require('superagent');


module.exports = Reflux.createStore({

    // Initial setup
    init: function() {
        // Register statusUpdate action
        this.listenTo(Actions.zeigeOrte, this.update);
    },

    // Callback
    update: function(text) {
        self = this;
        request
           .get('/ort/suggest/' + text)
           .end(function(result){
                var orte = result.body.suggest[0].options;
                self.trigger(orte);
           });
    }

});