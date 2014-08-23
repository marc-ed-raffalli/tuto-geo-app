/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:41
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return  Backbone.Marionette.ItemView.extend({

        // set the template to use in this view, file name is used as identifier
        template: require('templates/main/_countryNameView.hbs'),

        modelEvents: {
            'change:countryName': 'render'
        }
    });
});
