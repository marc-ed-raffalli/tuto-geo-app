/**
 * User: Marc Edouard Raffalli
 * Date: 08/06/14
 * Time: 02:26
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        // Set the default values for the game score
        defaults: {
            score: {
                correct: 0,
                error: 0
            },
            countryName: '',
            countryInfo: {}

        },
        //---------------------------------------
        getScore: function () {
            return this.get('score');
        },
        //---------------------------------------
        increaseCorrect: function () {
            scoreUpdate.call(this, 1, 0);
        },
        increaseError: function () {
            scoreUpdate.call(this, 0, 1);
        },
        //---------------------------------------
        setCountryName: function (countryName) {
            this.set('countryName', countryName);
        },
        resetScore: function () {
            this.setScore({
                correct: 0,
                error: 0
            });
        },
        setScore: function (score) {
            this.set('score', score);
        },
        setCountryInfo: function (countryInfo) {
            this.set('countryInfo', countryInfo);
        }
        //---------------------------------------
    });

    function scoreUpdate(c, e) {
        var oldScore = this.getScore(),
            newScore = {
                correct: oldScore.correct + c,
                error: oldScore.error + e
            };
        this.setScore(newScore);
    }
});