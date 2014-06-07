/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:25
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette',
    'view/side/PlayerScoreView',
    'view/side/CountryInfoView',
    'templates/sideTemplates'
], function (Marionette, PlayerScoreView, CountryInfoView, template) {
    'use strict';

    return Marionette.Layout.extend({

        className:'mr-geoapp-elt',

        // set the template to use in this view, file name is used as identifier
        template: template['_sideLayout.hbs'],

        regions: {
            // split the application screen in two regions, identifier point to the element in template
            scoreRegion: '.mr-geoappSide-playerScoreHolder',
            infoRegion: '.mr-geoappSide-countryInfoHolder'
        },
        onShow: function () {
            // instantiate and show view
            this.scoreRegion.show(new PlayerScoreView());
            this.infoRegion.show(new CountryInfoView());
        }
    });
});