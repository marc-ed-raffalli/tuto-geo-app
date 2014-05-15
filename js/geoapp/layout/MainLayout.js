/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:25
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette',
    'view/main/CountryNameView',
    'view/main/MapView',
    'templates/mainTemplates'
], function (Marionette, CountryNameView, MapView, template) {
    'use strict';

    return Marionette.Layout.extend({

        // set the template to use in this template, file name is used as identifier
        template: template['_mainLayout.hbs'],

        regions: {
            // split the application screen in two regions, identifier point to the element in template
            countryNameRegion: '.mr-geoappMain-countryNameHolder',
            mapRegion: '.mr-geoappMain-mapHolder'
        },
        onShow: function () {
            // instantiate and show view
            this.countryNameRegion.show(new CountryNameView());
            this.mapRegion.show(new MapView());
        }
    });
});