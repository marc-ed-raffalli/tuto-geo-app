/**
 * User: Marc Edouard Raffalli
 * Date: 28/06/14
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var GeoAppRouter = Backbone.Marionette.AppRouter.extend({
        routes: {
            'geoApp': 'showIntro',
            'geoApp/': 'showIntro',
            'geoApp/:mode': 'showGame',
            'geoApp/:mode/': 'showGame',
            '*path': 'defaultRoute'
        },
        //----------------------------------------------------------------
        initialize: function () {
            this.gameSupportedModes = Backbone.Wreqr.radio.reqres.request('game', 'gameSupportedModes');
            Backbone.Wreqr.radio.vent.on('hashLocation', 'changeTo', navigate, this);
        },
        //----------------------------------------------------------------
        defaultRoute: function () {
            navigate.call(this, 'geoApp');
        },
        //----------------------------------------------------------------
        showIntro: function () {
            Backbone.Wreqr.radio.vent.trigger('game', 'intro');
        },
        //----------------------------------------------------------------
        showGame: function (mode) {
            if (this.gameSupportedModes.indexOf(mode) !== -1) {
                Backbone.Wreqr.radio.vent.trigger('game', 'mode', mode);
            } else {
                navigate.call(this, 'geoApp');
            }
        },
        //----------------------------------------------------------------
        startHistory: function () {
            if (Backbone.history) {
                Backbone.history.start();
            }
        }
    });

    function navigate(hash) {
        this.navigate(hash, {trigger: true});
    }

    return GeoAppRouter;
});