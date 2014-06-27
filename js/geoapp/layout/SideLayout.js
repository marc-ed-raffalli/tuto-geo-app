/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:25
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'marionette',
    'backbone.wreqr',
    'view/side/PlayerScoreView',
    'view/side/CountryInfoView',
    'templates/sideTemplates'
], function (Marionette, Wreqr, PlayerScoreView, CountryInfoView, template) {
    'use strict';

    return Marionette.Layout.extend({

        // Backbone automatically wrap the View into a div tag, we need that tag to be position relative and taking full height of its parent.
        // It is possible to specify the tag name and class name in the View and remove the root element of the template.
        // However, I don't like to mix markup and styling with logic side of the code.
        // This css class name only provides the position and height.
        className: 'mr-geoapp-elt',

        // set the template to use in this view, file name is used as identifier
        template: template['_sideLayout.hbs'],

        regions: {
            // split the application screen in two regions, identifier point to the element in template
            scoreRegion: '.mr-geoappSide-playerScoreHolder',
            infoRegion: '.mr-geoappSide-countryInfoHolder'
        },
        onShow: function () {
            // Use Backbone.Wreqr for the event mechanism
            // https://github.com/marionettejs/backbone.wreqr
            var gameModel = Wreqr.radio.reqres.request('game', 'gameModel');

            // instantiate and show view
            this.scoreRegion.show(new PlayerScoreView({
                model: gameModel
            }));
            this.infoRegion.show(new CountryInfoView({
                model: gameModel
            }));
        }
    });
});