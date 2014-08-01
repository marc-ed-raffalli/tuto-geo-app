/**
 * User: Marc Edouard Raffalli
 * Date: 01/08/14
 * Time: 18:20
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Marionette.Region.extend({
        attachHtml: function (view) {
            this.hideCurrentView({
                complete: function () {
                    this.$el.append(view.$el);
                    this.showCurrentView();
                }.bind(this)
            });
        },
        hideCurrentView: function (options) {
            options = options || {};
            this.$el.fadeOut(200, options.complete);
        },
        showCurrentView: function (options) {
            options = options || {};
            this.$el.fadeIn(500, options.complete);
        }
    });
});
