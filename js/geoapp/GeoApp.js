/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:21
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette',
    './controller/GameController',
    './layout/GeoAppLayout'
], function (Marionette, GameController, GeoAppLayout) {  // getting Marionette dependency
    'use strict';

    var geoApp = new Marionette.Application(),      // instantiate new Marionette application
        gameController = new GameController();

    // define the application container, refers here to the #appContainer in index.html
    geoApp.addRegions({
        appContainer: '#appContainer'
    });

    // We call start of the gamecontroller when the application starts
    //
    // see Marionette App events:
    // https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md#application-event
    geoApp.onStart = function () {
        gameController.startGame();
    };

    // instantiate and show the GeoAppLayout
    geoApp.appContainer.show(new GeoAppLayout());

    // return the application instance without calling start, start is called in the main.js
    // this allows later to create a more global application-manager and run multiple applications based on the #hash value
    return geoApp;
});
