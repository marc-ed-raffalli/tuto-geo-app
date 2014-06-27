/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:21
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'marionette',
    './layout/GeoAppLayout'
], function (Marionette, GeoAppLayout) {  // getting Marionette dependency
    'use strict';

    var geoApp = new Marionette.Application();      // instantiate new Marionette application

    // define the application container, refers here to the #appContainer in index.html
    geoApp.addRegions({
        appContainer: '#appContainer'
    });

    // instantiate and show the GeoAppLayout
    geoApp.appContainer.show(new GeoAppLayout());

    // return the application instance without calling start, start is called in the main.js
    // this allows later to create a more global application-manager and run multiple applications based on the #hash value
    return geoApp;
});
