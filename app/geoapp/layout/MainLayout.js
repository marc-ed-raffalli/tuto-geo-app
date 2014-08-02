/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:25
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'backbone',
    'region/main/HeaderRegion',
    'view/main/IntroView',
    'view/main/CountryNameView',
    'view/main/MapView'
], function (Backbone, HeaderRegion, IntroView, CountryNameView, MapView) {
    'use strict';

    return Backbone.Marionette.LayoutView.extend({

        // Backbone automatically wrap the View into a div tag, we need that tag to be position relative and taking full height of its parent.
        // It is possible to specify the tag name and class name in the View and remove the root element of the template.
        // However, I don't like to mix markup and styling with logic side of the code.
        // This css class name only provides the position and height.
        className: 'mr-geoapp-elt',

        // set the template to use in this template, file name is used as identifier
        template: require('templates/main/_mainLayout.hbs'),

        regions: {
            // split the application screen in two regions, identifier point to the element in template
            headerRegion: HeaderRegion,
            bodyRegion: '.mr-geoappMain-bodyHolder'
        },
        initialize: function () {
            this.mapView = new MapView();

            var gameChannel = Backbone.Wreqr.radio.channel('game');
            gameChannel.vent.on('intro', this.displayIntro, this);
            gameChannel.vent.on('mode', this.displayGame, this);

            // Use Backbone.Wreqr for the event mechanism
            // https://github.com/marionettejs/backbone.wreqr
            this.gameModel = gameChannel.reqres.request('gameModel');
        },
        onShow: function () {
            this.bodyRegion.show(this.mapView);
        },
        displayIntro: function () {
            this.headerRegion.show(new IntroView());
            this.bodyRegion.$el.addClass('mr-geoappMain-bodyHolder_reduced');
            this.headerRegion.$el.addClass('mr-geoappMain-headerHolder_large');
            this._isGameMode = false;
        },
        displayGame: function () {
            if (!this._isGameMode) {
                this.headerRegion.show(new CountryNameView({model: this.gameModel}));
                this.bodyRegion.$el.removeClass('mr-geoappMain-bodyHolder_reduced');
                this.headerRegion.$el.removeClass('mr-geoappMain-headerHolder_large');
                Backbone.Wreqr.radio.vent.trigger('map', 'resize');
                this._isGameMode = true;
            }
        }
    });
});