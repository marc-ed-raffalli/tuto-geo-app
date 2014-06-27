/**
 * User: Marc Edouard Raffalli
 * Date: 28/05/14
 * Time: 19:20
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'marionette',
    'backbone.wreqr',
    'leaflet'
], function (Marionette, Wreqr, Leaflet) {
    'use strict';

    return  Marionette.Region.extend({

        el: '.mr-geoappMain-mapHolder',

        onShow: function (view) {

            // view.getMapElement() will return the map element in the template
            // we need to use get(0) because of JQuery, as the element returned is the Jquery wrapped element.
            var mapElt = view.getMapElement().get(0),
                map = Leaflet.map(mapElt, {
                    center: [50, 0],    // center the map over Europe region
                    maxBounds: [        // set the map bounds so that the user cannot navigate outside the map
                        [90, 180],
                        [-90, -180]
                    ],
                    zoom: 3,            // set the zoom, minZoom and maxZoom
                    minZoom: 2,
                    maxZoom: 8
                }),
            // Use Backbone.Wreqr for the event mechanism
            // https://github.com/marionettejs/backbone.wreqr
            //
            // we select a channel that will be dedicated to the map events
                mapChannel = Wreqr.radio.channel('map');

            // Leaflet.js
            // see tutorial at
            // http://leafletjs.com/examples/quick-start.html
            //
            // you can create your custom map here:
            // https://www.mapbox.com/

            Leaflet.tileLayer('http://{s}.tiles.mapbox.com/v3/YOUR-MAP-ID/{z}/{x}/{y}.png', {
                maxZoom: 10
            }).addTo(map);

            // Leaflet tuto:
            // http://leafletjs.com/examples/choropleth.html
            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: function (e) {
                        geoJsonLayer.resetStyle(e.target);
                    },
                    click: function (e) {
                        mapChannel.vent.trigger('countrySelected', e.target.feature.id);
                    }
                });
            }

            var geoJsonData = mapChannel.reqres.request('mapGeoJson'),
                geoJsonLayer = Leaflet.geoJson(geoJsonData, {
                    style: style,
                    onEachFeature: onEachFeature
                }).addTo(map);
        }
    });

    function style() {
        // Set the area with a transparent background, bordered with dash colored in #aaa
        return {
            fillColor: 'transparent',
            weight: 1,
            opacity: 1,
            color: '#aaa',
            dashArray: '3'
        };
    }

    function clickEvt(e) {
        // We will handle the click event here
        // This currently displays the name of the clicked area
        console.log('Click on ' + e.target.feature.properties.name);
    }

    function highlightFeature(e) {
        var layer = e.target;

        // When the user mouses over a specific area, this one gets the background changed to #ccc and the border weight increased.
        layer.setStyle({
            fillColor: '#ccc',
            weight: 2,
            color: '#888',
            fillOpacity: 0.5
        });

        if (!Leaflet.Browser.ie && !Leaflet.Browser.opera) {
            layer.bringToFront();
        }
    }
});