/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:41
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'backbone',
    '../../controller/MapController'
], function (Backbone, MapController) {
    'use strict';

    return  Backbone.Marionette.ItemView.extend({

        // Backbone automatically wrap the View into a div tag, we need that tag to be position relative and taking full height of its parent.
        // It is possible to specify the tag name and class name in the View and remove the root element of the template.
        // However, I don't like to mix markup and styling with logic side of the code.
        // This css class name only provides the position and height.
        className: 'mr-geoapp-elt',

        // set the template to use in this view, file name is used as identifier
        template: require('templates/main/_mapView.hbs'),

        // Set the ui elements that we will use
        ui: {
            map: '.mr-geoappMain-map'
        },
        onBeforeShow: function () {
            var mapCtrl = new MapController();
            mapCtrl.attachMapTo(this.ui.map.get(0));
        }
    });
});