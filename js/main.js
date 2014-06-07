/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:21
 * Website: http://raffalli-marc-ed.com/
 */
/* global require */
require.config({
    name: 'main',
    baseUrl: 'js/geoapp/',
    paths: {
        // "moduleName" : "path/to/module/js/file/without/extension"
        // Vendors
        'jquery': '../../vendor/jquery/jquery.min',
        'underscore': '../../vendor/underscore/underscore.min',
        'text': '../../vendor/require/text',
        'backbone': '../../vendor/backbone/backbone.min',
        'backbone.wreqr': '../../vendor/marionette/backbone.wreqr.min',
        'backbone.babysitter': '../../vendor/marionette/backbone.babysitter.min',
        'marionette': '../../vendor/marionette/backbone.marionette.min',
        'handlebars.runtime': '../../vendor/handlebars/handlebars.runtime.amd.min',
        'leaflet': '../../vendor/leaflet/js/leaflet',
        //App
        'GeoApp': './GeoApp',
        'templates': './templates', // added to ease the access to templates folder
        'view': './view',           // views folder
        'region': './region',       // regions folder
        'data': './data'            // data folder
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
        },
        'leaflet': {
            exports: 'Leaflet'
        }
    }
});
/* global define */
define([
    'GeoApp'                    // get GeoApp, it is defined above in the paths
], function (geoAppInstance) {   // load the application object
    'use strict';
    geoAppInstance.start();     // start the application
});