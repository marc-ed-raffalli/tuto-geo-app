/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:25
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'backbone',
    'backbone.wreqr',
    'region/side/TopRegion',
    'region/side/MiddleRegion',
    'region/side/BottomRegion',
    'view/side/InstructionsView',
    'view/side/SelectModeView',
    'view/side/PlayerScoreView',
    'view/side/CountryInfoView'
], function (Backbone, Wreqr, TopRegion, MiddleRegion, BottomRegion, InstructionsView, SelectModeView, PlayerScoreView, CountryInfoView) {
    'use strict';

    return Backbone.Marionette.LayoutView.extend({

        // Backbone automatically wrap the View into a div tag, we need that tag to be position relative and taking full height of its parent.
        // It is possible to specify the tag name and class name in the View and remove the root element of the template.
        // However, I don't like to mix markup and styling with logic side of the code.
        // This css class name only provides the position and height.
        className: 'mr-geoapp-elt',

        template: require('templates/side/_sideLayout.hbs'),

        regions: {
            top: TopRegion,
            middle: MiddleRegion,
            bottom: BottomRegion
        },
        initialize: function () {
            // Use Backbone.Wreqr for the event mechanism
            // https://github.com/marionettejs/backbone.wreqr
            this.gameModel = Wreqr.radio.reqres.request('game', 'gameModel');
            this.gameModel.on('change:mode', this.displayGame, this);

            Backbone.Wreqr.radio.vent.on('game', 'intro', this.displayIntro, this);
        },
        onShow: function () {
            // Use Backbone.Wreqr for the event mechanism
            // https://github.com/marionettejs/backbone.wreqr
            this.gameModel = Wreqr.radio.reqres.request('game', 'gameModel');
        },
        displayIntro: function () {
            this._isGameMode = false;
            this.top.show(new InstructionsView());
            this.middle.reset();
            this.bottom.reset();
        },
        displayGame: function () {
            if (!this._isGameMode) {
                this.top.show(createSelectModeView.call(this));
            }

            switch (this.gameModel.getMode()) {
                case 'explore':
                    this.middle.reset();
                    this.bottom.show(createCountryInfoView.call(this));
                    break;
                case 'relax':
                    this.middle.show(createPlayerScoreView.call(this));
                    this.bottom.show(createCountryInfoView.call(this));
                    break;
                case 'challenge':
                    this.middle.show(createPlayerScoreView.call(this));
                    this.bottom.reset();
                    break;
            }
            this._isGameMode = true;
        }
    });

    //----------------------------------------------------------------
    //----------------------------------------------------------------

    function createSelectModeView() {
        return new SelectModeView({
            model: this.gameModel
        });
    }

    //------------------------------------------------
    function createCountryInfoView() {
        return new CountryInfoView({
            model: this.gameModel
        });
    }

    //------------------------------------------------
    function createPlayerScoreView() {
        return new PlayerScoreView({
            model: this.gameModel
        });
    }

});