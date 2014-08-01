/**
 * User: Marc Edouard Raffalli
 * Date: 08/06/14
 * Time: 02:26
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'backbone',
    'backbone.wreqr',
    '../model/GameModel',
    'data/countriesData',
    'data/worldGeoJson'
], function (Backbone, Wreqr, GameModel, countriesData, worldGeoJson) {
    'use strict';

    return Backbone.Marionette.Controller.extend({

        // All the game business is abstracted in this Controller.
        // The targeted result is to separate the game logic from the Views,
        // so that it is very easy to reuse in another Application.

        initialize: function () {
            this.gameModel = new GameModel();
            this.countriesIdArr = Object.keys(countriesData);
            this.gameSupportedModes = ['explore', 'relax', 'challenge'];

            // Use Backbone.Wreqr for the event mechanism
            // https://github.com/marionettejs/backbone.wreqr
            var mapChannel = Wreqr.radio.channel('map'),
                gameChannel = Wreqr.radio.channel('game');

            //-----------------------------------------------
            mapChannel.vent.on('countrySelected', countrySelected, this);
            //-----------------------------------------------
            mapChannel.reqres.setHandler('mapGeoJson', function () {
                return worldGeoJson;
            });
            //-----------------------------------------------
            gameChannel.vent.on('mode', changeMode, this);
            //-----------------------------------------------
            gameChannel.reqres.setHandler('gameModel', function () {
                return this.gameModel;
            }, this);
            //-----------------------------------------------
            gameChannel.reqres.setHandler('gameSupportedModes', function () {
                return this.gameSupportedModes;
            }, this);
        },
        //----------------------------------------------------------------
        selectNewCountry: function () {
            this.currentId = getRandomId.call(this);
            setCountryInfoOnModel.call(this, this.currentId);
        },
        //----------------------------------------------------------------
        startGame: function () {
            this.gameModel.resetScore();

            switch (this.gameModel.getMode()) {
                case 'explore':
                    this.gameModel.setCountryName('Select a country');
                    this.gameModel.setCountryInfo({});
                    break;
                case 'relax':
                case 'challenge':
                    this.selectNewCountry();
                    break;
            }
        }
    });

    //----------------------------------------------------------------
    //----------------------------------------------------------------
    function changeMode(mode) {
        /*jshint validthis: true */
        if (this.gameSupportedModes.indexOf(mode) !== -1) {
            this.gameModel.setMode(mode);
            this.startGame();
        }
    }

    //----------------------------------------------------------------
    function countrySelected(selectedCountryId) {
        /*jshint validthis: true */

        switch (this.gameModel.getMode()) {
            case 'explore':
                setCountryInfoOnModel.call(this, selectedCountryId);
                break;
            case 'relax':
            case 'challenge':
                evaluateAnswer.call(this, selectedCountryId);
                break;
        }
    }

    //----------------------------------------------------------------
    function evaluateAnswer(selectedCountryId) {
        if (this.currentId === selectedCountryId) {
            this.gameModel.increaseCorrect();
            this.selectNewCountry();
        } else {
            this.gameModel.increaseError();
        }
    }

    //----------------------------------------------------------------
    function setCountryInfoOnModel(countryId) {
        var newCountry = countriesData[countryId],
            countryData = {
                capital: newCountry.capital,
                currency: newCountry.currency,
                language: newCountry.language,
                area: (newCountry.area !== -1) ? newCountry.area : null
            };
        this.gameModel.setCountryName(newCountry.name);
        this.gameModel.setCountryInfo(countryData);
    }

    //----------------------------------------------------------------
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