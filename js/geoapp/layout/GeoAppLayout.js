/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:25
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette',
    './MainLayout',
    './SideLayout',
    'templates/appTemplates'
], function (Marionette, MainLayout, SideLayout, template) {
    'use strict';

    return Marionette.Layout.extend({

        // set the template to use in this view, file name is used as identifier
        template: template['_geoAppLayout.hbs'],

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