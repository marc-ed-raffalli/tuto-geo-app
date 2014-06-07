/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:41
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette',
    'templates/mainTemplates'
], function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({

        className:'mr-geoapp-elt',

        // set the template to use in this view, file name is used as identifier
        template: template['_mapView.hbs'],

        // Set the ui elements that we will use
        ui: {
            map: '.mr-geoappMain-map'
        },

        onRender: function () {
            // The map will be integrated in a later stage

            //mr-geoappMain-map
        },
        getMapElement: function () {
            return this.ui.map;
        }
    });
});