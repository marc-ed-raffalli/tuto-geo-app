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

        // set the template to use in this view, file name is used as identifier
        template: template['_countryNameView.hbs'],

        // Set the ui elements that we will use
        ui: {
            countryName: '.mr-geoappMain-countryName'
        },
        onRender: function () {
            // set default values on show
            this.setCountryNameText('');
        },
        setCountryNameText: function (cName) {
            // access to the element and set the text
            this.ui.countryName.text(cName);
        }
    });
});