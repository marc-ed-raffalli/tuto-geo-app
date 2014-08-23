/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:25
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'backbone',
    './MainLayout',
    './SideLayout'
], function (Backbone, MainLayout, SideLayout) {
    'use strict';

    return Backbone.Marionette.LayoutView.extend({

        className: 'mr-geoapp-elt',

        // set the template to use in this view, file name is used as identifier
        template: require('templates/app/_geoAppLayout.hbs'),

        regions: {
            // split the application screen in two regions, identifier point to the element in the template
            mainRegion: '.mr-geoappMainHolder',
            sideRegion: '.mr-geoappSideHolder'
        },
        onShow: function () {
            // instantiate and show layout
            this.mainRegion.show(new MainLayout());
            this.sideRegion.show(new SideLayout());
        }
    });
});