/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:21
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'marionette',
    'controller/GameController',
    './GeoAppRouter',
    './layout/GeoAppLayout'
], function (Marionette, GameController, GeoAppRouter, GeoAppLayout) {  // getting Marionette dependency
    'use strict';

    require('./geoapp.less');

    var geoApp = new Marionette.Application(),      // instantiate new Marionette application
        gameController = new GameController(),
        appRouter = new GeoAppRouter();

    // define the application container, refers here to the #appContainer in index.html
    geoApp.addRegions({
        appContainer: '#appContainer'
    });

    // instantiate and show the GeoAppLayout
    geoApp.appContainer.show(new GeoAppLayout());

    // geoApp.onStart: fires after the Application has started and after the initializers have been executed.
    //
    // see Marionette App events:
    // https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md#application-event
    geoApp.onStart = function () {
        appRouter.startHistory();

    };

    // return the application instance without calling start, start is called in the main.js
    // this allows later to create a more global application-manager and run multiple applications based on the #hash value
    return geoApp;
});
