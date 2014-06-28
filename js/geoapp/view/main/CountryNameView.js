/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:41
 * Website: http://marc-ed-raffalli.com/
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

        initialize: function(){
            // Listen to the change event on the coutryName attribute of the Model
            // render will be called every time the value of the countryName changes
            this.model.on('change:countryName', this.render, this);
        }
    });
});