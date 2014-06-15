/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:41
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette',
    'templates/sideTemplates'
], function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({

        className:'mr-geoapp-elt',

        template: template['_playerScoreView.hbs'],

        initialize: function(){
            this.model.on('change:score', this.render, this);
        }
    });
});