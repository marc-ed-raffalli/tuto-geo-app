/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:25
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'marionette',
    'view/main/CountryNameView',
    'region/main/MapRegion',
    'view/main/MapView',
    'templates/mainTemplates'
], function (Marionette, CountryNameView, MapRegion, MapView, template) {
    'use strict';

    return Marionette.Layout.extend({

        // Backbone automatically wrap the View into a div tag, we need that tag to be position relative and taking full height of its parent.
        // It is possible to specify the tag name and class name in the View and remove the root element of the template.
        // However, I don't like to mix markup and styling with logic side of the code.
        // This css class name only provides the position and height.
        className: 'mr-geoapp-elt',

        // set the template to use in this template, file name is used as identifier
        template: template['_mainLayout.hbs'],

        regions: {
            // split the application screen in two regions, identifier point to the element in template
            countryNameRegion: '.mr-geoappMain-countryNameHolder',
            mapRegion: MapRegion
        },
        onShow: function () {
            // instantiate and show view
            this.countryNameRegion.show(new CountryNameView());
            this.mapRegion.show(new MapView());
        }
    });
});