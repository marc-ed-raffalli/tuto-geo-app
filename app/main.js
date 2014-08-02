/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:21
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'GeoApp'                    // get GeoApp, it is defined above in the paths
], function (geoAppInstance) {   // load the application object
    'use strict';
    require('style/style.less');
    require('vendor/bootstrap/css/bootstrap.min.css');
    require('vendor/bootstrap/css/bootstrap-theme.min.css');
    require('vendor/bootstrap/js/bootstrap.min');
    require('vendor/leaflet/css/leaflet.css');

    geoAppInstance.start();     // start the application
});