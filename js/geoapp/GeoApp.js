/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:41
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette'
], function (Marionette) {  // getting Marionette dependency
    'use strict';

    var geoApp = new Marionette.Application(),      // instantiate new Marionette application
        DummyView = Marionette.ItemView.extend({    // extend ItemView to add customized content
            template: function () {                 // template will provide the view with content
                return 'Congratulation !!! the application has started';
            }
        });

    // define the application container, refers here to the #appContainer in index.html
    geoApp.addRegions({
        appContainer: '#appContainer'
    });

    // instantiate and show our custom DummyView
    geoApp.appContainer.show(new DummyView());

    // return the application instance without calling start, start is called in the main.js
    // this allows later to create a more global application manager and run multiple applications based on the #hash value
    return geoApp;
});