/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:41
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'marionette',
    'templates/sideTemplates'
], function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({

        // Backbone automatically wrap the View into a div tag, we need that tag to be position relative and taking full height of its parent.
        // It is possible to specify the tag name and class name in the View and remove the root element of the template.
        // However, I don't like to mix markup and styling with logic side of the code.
        // This css class name only provides the position and height.
        className:'mr-geoapp-elt',

        // set the template to use in this view, file name is used as identifier
        template: template['_playerScoreView.hbs'],

        initialize: function(){
            this.model.on('change:score', this.render, this);
        }
    });
});