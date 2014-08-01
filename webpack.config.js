module.exports = {
    context: __dirname,
    entry: './js/main.js',
    output: {
        path: './dist',
        filename: 'geoapp.js'
    },
    module: {
        loaders: [
            { test: /jquery/, loader: 'expose?jQuery' },
            { test: /underscore/, loader: 'expose?_' },
            { test: /backbone/, loader: 'imports?jQuery=jquery,_=underscore!expose?Backbone' },
            { test: /backbone\.wreqr/, loader: 'imports?Backbone=backbone!expose?Backbone.Wreqr' },
            { test: /marionette/, loader: 'imports?Backbone=backbone,jQuery=jquery!expose?Marionette' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.png/, loader: 'url?minetype=image/png' },
            { test: /\.svg/, loader: 'url?minetype=image/svg+xml' },
            { test: /\.woff/, loader: 'url?minetype=application/font-woff' },
            { test: /\.ttf/, loader: 'url?minetype=application/x-font-ttf' },
            { test: /\.eot/, loader: 'url?minetype=application/vnd.ms-fontobject' },
            { test: /\.hbs$/, loader: 'handlebars-loader' }
        ]
    },
    resolve: {
        alias: {
            'jquery': __dirname + '/vendor/jquery/jquery.js',
            'underscore': __dirname + '/vendor/underscore/underscore.js',
            'text': __dirname + '/vendor/require/text.js',
            'backbone': __dirname + '/vendor/backbone/backbone.js',
            'backbone.wreqr': __dirname + '/vendor/marionette/backbone.wreqr.js',
            'backbone.babysitter': __dirname + '/vendor/marionette/backbone.babysitter.js',
            'marionette': __dirname + '/vendor/marionette/backbone.marionette.js',
            'leaflet': __dirname + '/vendor/leaflet/js/leaflet.js',

            'GeoApp': __dirname + '/js/geoapp/GeoApp.js',
            'templates': __dirname + '/js/geoapp/templates',
            'view': __dirname + '/js/geoapp/view',
            'region': __dirname + '/js/geoapp/region',
            'data': __dirname + '/js/geoapp/data',
            'style': __dirname + '/style',
            'vendor': __dirname + '/vendor'
        }
    }
};