/**
 * User: Marc Edouard Raffalli
 * Date: 08/06/14
 * Time: 02:26
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'backbone',
    'backbone.wreqr',
    'leaflet'
], function (Backbone, Wreqr, Leaflet) {
    'use strict';

    var mapServiceUrl = 'http://{s}.tiles.mapbox.com/v3/YOUR-MAP-ID/{z}/{x}/{y}.png',
        defaultMaxZoom = 8,
        defaultMapParams = {
            center: [50, 0],    // center the map over Europe region
            maxBounds: [        // set the map bounds so that the user cannot navigate outside the map
                [90, 180],
                [-90, -180]
            ],
            zoom: 3,            // set the zoom, minZoom and maxZoom
            minZoom: 2,
            maxZoom: defaultMaxZoom
        },
        defaultStyle = {
            fillColor: 'transparent',
            weight: 1,
            opacity: 1,
            color: '#aaa',
            dashArray: '3'
        },
        defaultHighlightStyle = {
            fillColor: '#ccc',
            weight: 2,
            color: '#888',
            fillOpacity: 0.5
        };

    //----------------------------------------------------------------
    //----------------------------------------------------------------

    return Backbone.Marionette.Controller.extend({

        // All the Map display and interaction handling is abstracted in this Controller.
        // The targeted result is to separate the map logic from the Views,
        // so that it is very easy to reuse in another Application.

        initialize: function () {

            // Leaflet.js
            // Leaflet tuto:
            // http://leafletjs.com/examples/quick-start.html
            // http://leafletjs.com/examples/choropleth.html
            //
            // you can create your custom map here:
            // https://www.mapbox.com/
            //
            // Use Backbone.Wreqr for the event mechanism
            // https://github.com/marionettejs/backbone.wreqr
            //
            // we select a channel that will be dedicated to the map events
            var mapChannel = Wreqr.radio.channel('map'),
                geoJsonData = mapChannel.reqres.request('mapGeoJson'),
                onEachFeature = function (feature, layer) {
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: function (e) {
                            geoJsonLayer.resetStyle(e.target);
                        },
                        click: function (e) {
                            mapChannel.vent.trigger('countrySelected', e.target.feature.id);
                        }
                    });
                },
                geoJsonLayer = Leaflet.geoJson(geoJsonData, {
                    style: style,
                    onEachFeature: onEachFeature
                });


            this._tileLayer = Leaflet.tileLayer(mapServiceUrl);
            this._geoJsonLayer = geoJsonLayer;
        },
        //----------------------------------------------------------------
        attachMapTo: function (elt) {
            var map = Leaflet.map(elt, defaultMapParams);
            this._tileLayer.addTo(map);
            this._geoJsonLayer.addTo(map);
        }
    });

    //----------------------------------------------------------------
    //----------------------------------------------------------------
    function style() {
        // Set the area with a transparent background, bordered with dash colored in #aaa
        return defaultStyle;
    }

    //----------------------------------------------------------------

    function highlightFeature(e) {
        var layer = e.target;

        // When the user mouses over a specific area, this one gets the background changed to #ccc and the border weight increased.
        layer.setStyle(defaultHighlightStyle);

        if (!Leaflet.Browser.ie && !Leaflet.Browser.opera) {
            layer.bringToFront();
        }
    }
});