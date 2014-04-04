/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:43
 * Website: http://raffalli-marc-ed.com/
 */
/* global require */
require.config({
    name: 'main',
    baseUrl: 'js/geoapp/',
    paths: {
        // Vendors
        'jquery': '../../vendor/jquery/jquery.min',
        'underscore': '../../vendor/underscore/underscore.min',
        'text': '../../vendor/require/text',
        'backbone': '../../vendor/backbone/backbone.min',
        'backbone.wreqr': '../../vendor/marionette/backbone.wreqr.min',
        'backbone.babysitter': '../../vendor/marionette/backbone.babysitter.min',
        'marionette': '../../vendor/marionette/backbone.marionette.min',
        //App
        'GeoApp': './GeoApp',
        'data': '../../data/'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Backbone.Marionette'
        }
    }
});
/* global define */
define([
    'GeoApp'
], function(geoAppInstance) {
    'use strict';
    geoAppInstance.start();
});