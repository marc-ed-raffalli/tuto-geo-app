/**
 * User: Marc Edouard Raffalli
 * Date: 08/06/14
 * Time: 02:26
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette',
    'backbone.wreqr',
    '../model/GameModel',
    'data/countriesData',
    'data/worldGeoJson'
], function (Marionette, Wreqr, GameModel, countriesData, worldGeoJson) {
    'use strict';

    return Marionette.Controller.extend({

        // All the game business is abstracted in this Controller.
        // The targeted result is to separate the game logic from the Views,
        // so that it is very easy to reuse in another Application.

        initialize: function () {
            this.gameModel = new GameModel();
            this.countriesIdArr = Object.keys(countriesData);

            // Use Backbone.Wreqr for the event mechanism
            // https://github.com/marionettejs/backbone.wreqr
            var mapChannel = Wreqr.radio.channel('map'),
                gameChannel = Wreqr.radio.channel('game');

            //-----------------------------------------------
            mapChannel.vent.on('countrySelected', evaluateSelection, this);
            //-----------------------------------------------
            mapChannel.reqres.setHandler('mapGeoJson', function () {
                return worldGeoJson;
            });
            //-----------------------------------------------
            gameChannel.reqres.setHandler('gameModel', function () {
                return this.gameModel;
            }, this);
        },
        selectNewCountry: function () {
            this.currentId = getRandomId.call(this);
            this.gameModel.setCountryName(countriesData[this.currentId].name);
        },
        startGame: function () {
            // When the game starts, set the score to zero, and select a new country to find
            this.gameModel.resetScore();// The score reset will be part of a next coming feature
            this.selectNewCountry();
        }
    });

    function evaluateSelection(selectedCountryId) {
        if (this.currentId === selectedCountryId) {
            this.gameModel.increaseCorrect();
            this.selectNewCountry();
        } else {
            this.gameModel.increaseError();
        }
    }

    function getRandomId() {
        /*jshint validthis: true */

        // The jshint validthis: true is necessary when it will come to code quality testing using JSHint,
        // This step will come at a later stage.

        var max = this.countriesIdArr.length,
            randomIndex = Math.floor(Math.random() * (max - 1));
        // Return a randomly selected country from the list.
        return this.countriesIdArr[randomIndex];
    }
});