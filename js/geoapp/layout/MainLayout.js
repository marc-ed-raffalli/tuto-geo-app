/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:25
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette',
    'backbone.wreqr',
    'view/main/CountryNameView',
    'region/main/MapRegion',
    'view/main/MapView',
    'templates/mainTemplates'
], function (Marionette, Wreqr, CountryNameView, MapRegion, MapView, template) {
    'use strict';

    return Marionette.Layout.extend({

        className: 'mr-geoapp-elt',

        // set the template to use in this template, file name is used as identifier
        template: template['_mainLayout.hbs'],

        regions: {
            // split the application screen in two regions, identifier point to the element in template
            countryNameRegion: '.mr-geoappMain-countryNameHolder',
            mapRegion: MapRegion
        },
        onShow: function () {
            // Use Backbone.Wreqr for the event mechanism
            // https://github.com/marionettejs/backbone.wreqr
            var gameModel = Wreqr.radio.reqres.request('game', 'gameModel');

            // instantiate and show view
            this.countryNameRegion.show(new CountryNameView({
                model: gameModel
            }));
            this.mapRegion.show(new MapView());
        }
    });
});