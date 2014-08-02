# Introduction

**Hi everybody and welcome to this first tutorial !** This will be the first chapter of the tutorial covering the development of the "Geo App".

> What is the "*Geo App*" about ?
> 
> The "*Geo App*" is a web browser game built as a single page JavaScript application. Two modes will be implemented, relax and challenge.  
> The relax mode will display the country's information when the user selects it on the map.  
> The challenge mode will ask the user to find a randomly selected country in the world map. 

The code is available on <a title="tuto-geo-app" href="https://github.com/chi-mai2b/tuto-geo-app" target="_blank">GitHub (tuto-geo-app)</a> else [download .zip][1]

In order to achieve this project, we will use the following libraries / tools:

*   [Backbone Marionette][2] *v1.7.3*
*   [Bootstrap 3][3] *v3.1.1*
*   [Handlebars][4] *2\.0.0-alpha.2*
*   [Less][5] *v1.7.0*
*   [Requirejs][6] *v2.1.11*
*   [Leaflet][7] *v0.7.3*

## Who is this tutorial for ?

The targeted audience of this tutorial will be mainly developers, students in programming, geeks... The code will be explained and commented so you can read over and complete your understanding of the logic. It is recommended that you have at least a basic understanding of JavaScript, HTML and CSS.

## What is this tutorial about ?

This tutorial will go through the different steps of development of a *single page web application*.

Comments will cover the following aspects:

*   How to *use the different libraries* listed previously
*   How to *structure the application code* so that it does not turn into a single file of 300000 lines.
*   How to use *custom JS events* to avoid a maze of function and callback.
*   How to avoid having a single HTML file with an endless list of scripts tags.

## What is this tutorial NOT about ?

This tutorial is not covering the basics of HTML, CSS or JavaScript. You will be expected to be familiar with the basics of web development.

<!-- ==================================================================== -->

<!--nextpage-->

<!-- ==================================================================== -->

# Getting started

First let's start by setting up the development environment.

## Text editor / IDE

Let's start simple with a simple text editor or IDE. You won't need any specific IDE to write the code. However, Windows Notepad may not help you a lot / (at all).  
If you are not sure on which one you should use, I would recommend the following ones:

*   [Sublime Text][8]: **(+)** *free, lightweight, customizable, simple* || **(-)** *feature available through plugins*
*   [IntelliJ][9] / [WebStorm][10] **(+)** *very good auto-complete / intellisense feature for CSS and JS* || **(-)** *heavy, advanced features require license*

## CLI tools

The project will require a CLI (Command Line Interface) to run different commands. If you have Windows, I recommend **NOT** using the cmd.exe but rather another alternative.
Since you probably have Git, you may have Git Bash installed also, it will be enough to run the commands we need.

## Node and NPM packages

In the tutorial, we will use nodejs and npm so you will need to install it.

> [Nodejs][11] *(v0.10.26 used)*

At the end of the installation you should be able to run:

    node --version
    

From there, install handlebars and less using the following commands:

### **Linux**

    sudo npm install -g less
    sudo npm install -g handlebars
    

### **MS Windows**

    npm install -g less
    npm install -g handlebars
    

<u>Note:</u> Handlebar version will be discussed in the chapter dedicated to its use. If you wish to install a specific version, use the following command:

    npm install -g <name>@<version>
    

See more in [NPM install docs][12]

## Virtual server

The application will be AJAX based content loading, we need a web server. You can use the server of your choice. As indication, the tuto has been realized using both [Lampp][13] and [Xampp][14]. *It is recommended to use Apache aliases to map different URLs to different location in your drive. It allows to keep your work tidy without having to put everything inside the htdocs folder.*

Good, you should now be ready to get your hands into some code !

<!-- ==================================================================== -->

<!--nextpage-->

<!-- ==================================================================== -->

# Application base

You will find the code for the application *base* on <a title="Github Application base branch" href="https://github.com/chi-mai2b/tuto-geo-app/tree/0-app-base" target="_blank">Github</a>.

## Purpose

This version is the foundation of the future code, all configured to run normally. It has none of the feature implemented, it is a basic skeleton where the application will be built from.

## Folder structure

The application's folder structure has been planned for further expansion. This is why the application has been structured in the following way:

[expand title="Expand folder structure"]

    tuto-geo-app/
      css/
        images/ /* CSS related images */
        /* less and css files here */
      js/
        geoapp/
          /* Geo App JS code here */
        main.js /* require js config */
      vendor/
        backbone/
        bootstrap/
        jquery/
        marionette/
        require/
        underscore/
        /* more 3PPs will be added as we go along */
    

[/expand]


### css/

This folder will store the styles for the application container.

Important: None of the application specific styling should go in this folder. The aim is to ensure the application modularity and avoid dependencies others than 3PPs outside the application folder.  
As for the folder structure, the CSS folder is planned for further expansion with application specific style sheets on the application folder.

### js/

This folder contains application specific JavaScript code along with the requirejs configuration. All the application code is grouped in the *geoapp* folder.  
In the case we want to add a second application, the code would go in *secondApplicationName* folder.

### vendor/

Grouped in this folder will be all the 3PPs used for this project.

## Code at a glance

### main.js

[expand title="Expand code"]

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
    

[/expand]

The <a title="Requirejs config doc" href="http://requirejs.org/docs/api.html#config" target="_blank"><em>require.config</em></a> object configures the following options:

*   The `baseUrl` will used when we will query the different files. It is set here to *js/geoapp/* which is the application script folder.
*   The list of paths works as follow `"moduleName" : "path/to/module/js/file/without/extension"` We set here the default name and relative path of the different 3PPs

<a title="Requirejs shim doc" href="http://requirejs.org/docs/api.html#config-shim" target="_blank">Shim</a> object configure the dependencies and export for the non AMD modules

[expand title="Expand code"]

    /* global define */
    define([ // start of the module definition
        'GeoApp'
    ], function(geoAppInstance) { // load the application object
        'use strict';
        geoAppInstance.start(); // start the application
    }); // end of the module
    

[/expand]

On the previous code snippet you can see the <a title="Requirejs define doc" href="http://requirejs.org/docs/api.html#define" target="_blank"><em>define</em></a> function. You will provide here the dependencies of your module, they will be available through the function arguments.  
Here *GeoApp* is defined as dependency and made available by *geoAppInstance.*

### GeoApp.js

[expand title="Expand code"]

    /* global define */
    define([
        'marionette'
    ], function (Marionette) {
        'use strict';
    
        var geoApp = new Marionette.Application(),      // instantiate new application
            DummyView = Marionette.ItemView.extend({    // extend view to add customized content
                template: function () {                 // template will provide the view with content
                    return 'Congratulation !!! the application has started';
                }
            });
    
        // define the application container, refers here to the #appContainer in index.html
        geoApp.addRegions({
            appContainer: '#appContainer'
        });
    
        // instantiate and show our custom DummyView
        geoApp.appContainer.show(new DummyView());
    
        // return the application instance without calling start, start is called in the main.js
        // this allows later to create a more global application manager and run multiple applications based on the #hash value
        return geoApp;
    });
    

[/expand]

<!-- ==================================================================== -->

<!--nextpage-->

<!-- ==================================================================== -->

# Introduction to Handlebars Templates

> *Why should I use a template where a simple HTML string build does the job?*
> 
> *Well, the choice is all yours, but a good few points may change your mind:*

*   It is good practice to keep the markup separated from the logic, so you end up with cleaner code
*   It is easier to reuse and adapt
*   Using this method, you will be able to pass variables to your template saving you from having to write supplementary code
*   From a security aspect, Handlebars escapes string variables; this lowers the risk of injection
*   more...

You will see in this page how to create an HTML template using Handlebars (.hbs file) and use it in your application with Requirejs. Splitting the HTML templates in different files allows for more modularity and reusability of your code.

The code for the examples and template configuration is available on <a title="Github Intro to template branch" href="https://github.com/chi-mai2b/tuto-geo-app/tree/1-intro-to-hb-template" target="_blank">Github</a>. We will cover how to display the template in the application on the next chapter.

Handlebars will be used in two parts. First we will *compile* the templates using the CLI, then we will use it in the JavaScript code (*runtime*).

As we precompile the templates in AMD modules, the Handlebars used in the project is Runtime and AMD, if you wish to download a newer version, make sure to get the Runtime and AMD as well.

## Compile the Templates

Compiling template or static HTML could sound strange but the idea behind is to transform the markup in a JS function where a string is returned. It will make much more sense when we will use them later on in the tutorial.

<u>Note:</u> You should have Handlebars installed with *npm* before continuing (see Getting Started).

The templates should be saved in a dedicated folder, it makes the compilation process easier. In this project, templates are saved under `js/geoapp/templates`.  
Open the CLI and navigate to the `js/geoapp/` folder. Then run the following command to compile all template in the folder:

    handlebars -a -m templates/*.hbs -f compiledTemplates.js
    handlebars <params> <input> -f <outputFile>
    

*   params: 
    *   **--amd** / **-a** is used to get the templates compiled as AMD
    *   **--min** / **-m** minifies the js output.
*   input: 
    *   **templates/*.hbs** select all .hbs files inside \*templates\* folder
*   outputFile: 
    *   **compiledTemplates.js** will be generated in the current location (e.g. js/geoapp/)

You should read <a title="Handlebars" href="http://handlebarsjs.com/" target="_blank">Handlebars</a> and <a title="Handlebars precompile" href="http://handlebarsjs.com/precompilation.html" target="_blank">Handlebars precompilation</a> for more details.

### Examples

In the following examples we will compile some templates for the next chapter.

[expand title="_geoAppLayout.hbs"]

    <div class="mr-geoapp">
        <section class="mr-geoappMain col-lg-10 col-md-10 col-sm-12 col-xs-12"></section>
        <section class="mr-geoappSide col-lg-2 col-md-2 col-sm-12 col-xs-12"></section>
    </div>
    

[/expand]

[expand title="_mainView.hbs"]

    <div class="mr-geoappMain panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Geo Map</h3>
        </div>
        <div class="panel-body mr-geoappMain-map"></div>
    </div>
    

[/expand]

[expand title="_sideBarView.hbs"]

    <aside class="mr-geoappSide">
        <div class="panel">
            <div class="mr-geoappSide-countryName panel-body">Country name</div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Score</h3>
            </div>
            <div class="panel-body">Player's score</div>
        </div>
    </aside>
    

[/expand]

<u>Note:</u> There is apparently a bug in the compiler that cause the template to be invalid if it is compiled alone. The simplest solution is to create a dummy hbs file if you have a single template in a folder.

<!-- ==================================================================== -->

<!--nextpage-->

<!-- ==================================================================== -->

# Application UI Design

> UI: User Interface

## UI Layout

Let's visualize how the application UI will be structured.

[<img src="http://marc-ed-raffalli.com/blog/wp-content/uploads/2014/05/AppDesignLayout.png" alt="AppDesignLayout" width="343" height="150" class="alignnone size-full wp-image-37" />][15]

*   Left side: it will display the country name to select and the map in which the player will make the selection.
*   Right side: it will contain the scores and additional information about the country to find. Planned also, additional options for multi languages support.

## HTML mock up

Before entering into deep JS coding, we will build a mock up of the result page.  
This will allow us to plan for many aspects of the application that do not require JS to be running like:

*   The styling of the page
*   The usability of the design and page structure
*   The cross device compatibility, here we use bootstrap to help building the layout

[<img src="http://marc-ed-raffalli.com/blog/wp-content/uploads/2014/05/desktop.png" alt="desktop" width="455" height="207" class="alignnone size-full wp-image-38" />][16][<img src="http://marc-ed-raffalli.com/blog/wp-content/uploads/2014/05/mobile.png" alt="mobile" width="107" height="175" class="alignnone size-full wp-image-39" />][17]

[expand title="HTML mock-up"]

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Tutorial - Geo app</title>
        <link href="PATH/TO/bootstrap.min.css" rel="stylesheet">
        <link href="PATH/TO/style.css" rel="stylesheet">
    </head>
    <body>
    <div class="mr-pageBody container" id="appContainer">
        <div>
            <div class="mr-geoapp">
                <div class="mr-geoappMain col-lg-10 col-md-10 col-sm-12 col-xs-12">
                    <div class="panel">
                        <div class="mr-geoappMain-countryName panel-body">Country name</div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Geo Map</h3>
                        </div>
                        <div class="panel-body mr-geoappMain-map">--MAP--</div>
                    </div>
                </div>
                <aside class="mr-geoappSide col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Score</h3>
                        </div>
                        <div class="mr-geoappSide-playerScore panel-body">
                            <div class="row">
                                <span class="mr-geoappSide-playerScore-correct
                                    label label-success
                                    col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1
                                    col-sm-4 col-sm-offset-1 col-xs-4 col-xs-offset-1">0</span>
                                <span class="mr-geoappSide-playerScore-error
                                    label label-danger
                                    col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1
                                    col-sm-4 col-sm-offset-2 col-xs-4 col-xs-offset-2">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">More Info</h3>
                        </div>
                        <div class="mr-geoappSide-countryInfo panel-body">
                            <div class="lead text-center">Capital City</div>
                            <em>Main language</em>
    
                            <div class="row">
                                <span class="col-lg-12 col-md-12 col-sm-6"><small><abbr title="Surface area">A</abbr>:</small> surface</span>
                                <span class="col-lg-12 col-md-12 col-sm-6"><small><abbr title="Currency">Cur</abbr>:</small> currency</span>
                            </div>
                            <div class="row">
                                <span class="col-lg-12 col-md-12"><small><abbr title="Population">Pop</abbr>:</small> population</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
    </body>
    </html>
    

[/expand]

[expand title="CSS mock-up"]

    body {
        background-color: #efefef
    }
    
    .mr-topNavLogo {
        margin: 0 15px;
        width: 60px;
        background: url("images/logo.png") no-repeat center;
        background-size: contain
    }
    
    .mr-pageBody {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        padding-top: 70px;
        background: url("images/texture-grey.png");
        box-shadow: 0 0 15px 5px #808080
    }
    
    .mr-geoappSide-playerScore .label {
        font-size: 2.6rem;
        white-space: normal;
        overflow-wrap: break-word
    }
    
    @media (min-width: 992px) {
        .mr-geoappSide-playerScore .label {
            margin-bottom: 8px;
            font-size: 1.6rem
        }
    
        .mr-geoappSide-playerScore .label:last-of-type {
            margin-bottom: 0
        }
    }
    
    .mr-geoappSide-countryInfo .lead {
        margin-bottom: 6px
    }
    

[/expand]

This template does not represent necessarily the end result but it contains most of the future layout.

In the next chapter, we will structure the application code using (finally :P) Marionette js.

<!-- ==================================================================== -->

<!--nextpage-->

<!-- ==================================================================== -->

# Application core

The code for this chapter is available on <a title="Github Application layout building branch" href="https://github.com/chi-mai2b/tuto-geo-app/tree/2-layout-building" target="_blank">Github</a>

## Introduction

You will see in this page how to structure the application using Application, Layout and View combined with the compiled templates discussed previously. Application, Layout and View (soon more) are <a title="Marionette.js" href="http://marionettejs.com/" target="_blank">Marionette js</a> classes.

## Marionette.Application

The <a title="Marionette.Application" href="https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md" target="_blank">Marionette Application</a> is where everything starts. From this class you will instantiate the different parts of your application. In our case, we will call a layout GeoAppLayout. Later on, we will add more functionalities.

    var geoApp = new Marionette.Application();
    // instantiate new Marionette application
    
    // define the application container, 
    // refers here to the #appContainer in index.html
    geoApp.addRegions({
        appContainer: '#appContainer'
    });
    
    // instantiate and show the GeoAppLayout
    geoApp.appContainer.show(new GeoAppLayout());
    

<u>Note:</u> Dislike the other elements of Marionette, the Application is not extended. We instantiate it directly before calling the `app.start()` method.

## Marionette.Layout

The <a title="Marionette.Layout" href="https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.layout.md" target="_blank">Marionette Layouts</a> are used here to structure multiple Views and sub layouts.

The GeoAppLayout will instantiate two sub layouts that represent the main parts of the application (see UI and comments in code).

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
    

The other two layouts are very similar to this example.

## Marionette.ItemView

The <a title="Marionette.ItemView" href="https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.itemview.md" target="_blank">Marionette ItemViews</a> will be used as interface between the DOM elements (template markup) and the core logic.

On the following example, we see the player's score view.

    return Marionette.ItemView.extend({
    
        // set the template to use in this view, file name is used as identifier
        template: template['_playerScoreView.hbs']
    });
    

The views will be associated with Models and Handlebars templates in the chapter covering the game core.


The next chapter will show how we integrate the map and the events generated by the user's interactions.

<!-- ==================================================================== -->

<!--nextpage-->

<!-- ==================================================================== -->

# Integrating Leaflet Map

The code for this chapter is available on <a title="Github Application map integration branch" href="https://github.com/chi-mai2b/tuto-geo-app/tree/3-map-integration" target="_blank">Github</a>

## Introduction

We will be using [Leaflet][7] to display our application map. The library has a lot of tutorials to explain different features. One of the feature which will be key for the application is the ability to display clickable areas over the map. This is done using GeoJson. (see [GeoJson Leaflet tuto][18]).

## Display the Map

### Setting up the View for the Map

Under the folder `view/main/` we create a new View called `MapView`. It will be used from the logic side of the application to get the element which will contain the map.

    return Marionette.ItemView.extend({
    
        // Backbone automatically wrap the View into a div tag, we need that tag to be position relative and taking full height of its parent.
        // It is possible to specify the tag name and class name in the View and remove the root element of the template.
        // However, I don't like to mix markup and styling with logic side of the code.
        // This css class name only provides the position and height.
        className:'mr-geoapp-elt',
    
        // set the template to use in this view, file name is used as identifier
        template: template['_mapView.hbs'],
    
        // Set the ui elements that we will use
        ui: {
            map: '.mr-geoappMain-map'
        },
    
        getMapElement: function () {
            return this.ui.map;
        }
    });
    

### Adding the logic for the map

In order to create, configure and interact with the Map, we create a new file into `region/main/` called MapRegion.

[expand title="MapRegion code"]

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
                });

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
                    mouseout: resetHighlight,
                    click: clickEvt
                });
            }

            function resetHighlight(e) {
                geojson.resetStyle(e.target);
            }

            var geojson = Leaflet.geoJson(worldGeoJson, {
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
    

[/expand]

The <a title="Marionette.Region" href="https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md" target="_blank">Region</a> is a <a title="Marionette.js" href="http://marionettejs.com/" target="_blank">Marionette js</a> classes. It allows to separate the View from the logic part. See comments in the code for more details.

The Leaflet GeoJson tutorial covers the functionalities added on this chapter. If you encounter any difficulties, it is a good resource to use.

## Useful links

[Leaflet quick start tuto][19]  
[Leaflet GeoJson tuto][20]  
[Leaflet API][21]  
[Create your custom map with Mapbox][22]

<!-- ==================================================================== -->

<!--nextpage-->

<!-- ==================================================================== -->

# Game Logic core and data

The code for this chapter is available on <a title="Github Application game logic branch" href="https://github.com/chi-mai2b/tuto-geo-app/tree/4-game-logic" target="_blank">Github</a>

## Introduction

This chapter covers the way we will combine the map and the game logic.  
We will see as well how to decouple our modules using the JS custom events and how to combine the model with handlebars template.

## Game data Model

### Game model

The <a title="Backbone.Model doc" href="http://backbonejs.org/#Model" target="_blank">Backbone.Model</a> is used to store the game related data:

* score (correct / error)
* country name
* country info

See <a title="What is a Model" href="http://backbonetutorials.com/what-is-a-model/" target="_blank">Backbone doc What is a Model ?</a>

[expand title="Game Model code"]

    return Backbone.Model.extend({
        // Set the default values for the game score
        defaults: {
            score: {
                correct: 0,
                error: 0
            },
            countryName: '',
            countryInfo: {}

        },
        //---------------------------------------
        getScore: function () {
            return this.get('score');
        },
        //---------------------------------------
        increaseCorrect: function () {
            scoreUpdate.call(this, 1, 0);
        },
        increaseError: function () {
            scoreUpdate.call(this, 0, 1);
        },
        //---------------------------------------
        setCountryName: function (countryName) {
            this.set('countryName', countryName);
        },
        resetScore: function () {
            this.setScore({
                correct: 0,
                error: 0
            });
        },
        setScore: function (score) {
            this.set('score', score);
        },
        setCountryInfo: function (countryInfo) {
            this.set('countryInfo', countryInfo);
        }
        //---------------------------------------
    });

    function scoreUpdate(c, e) {
        var oldScore = this.getScore(),
            newScore = {
                correct: oldScore.correct + c,
                error: oldScore.error + e
            };
        this.setScore(newScore);
    }

[/expand]

The game controller will manage the model and update it at the different phases of the game.  
Every time an attribute of the model is updated, an event is triggered. The Marionette View classes are listening to these events; this allow us to update the value displayed on the UI with a minimum code.

### Model / View update

This feature is based on the template that we covered previously.

[expand title="GameController code"]

    <div class="panel">
        <div class="mr-geoappMain-countryName panel-body">{{countryName}}</div>
    </div>
    
[/expand]

The `{{countryName}}` represents the name of the model attribute.  
As we instantiate the View in the Layout, we supply the model instance.

[expand title="CountryNameView code"]

    return Marionette.ItemView.extend({

        // set the template to use in this view, file name is used as identifier
        template: template['_countryNameView.hbs'],

        initialize: function(){
            // Listen to the change event on the coutryName attribute of the Model.
            // render will be called every time the value of the countryName changes
            this.model.on('change:countryName', this.render, this);
        }
    });

[/expand]

As it is explained in the comments, `model.on('evt:attributeName', callback)` allows us to listen to the proper events and avoid re-rendering the template for nothing.

## Supply the Model to the View

One of the question you could have is *"How should I set the Model to the different Views?"*.

We will use <a title="Backbone Wreqr" href="https://github.com/marionettejs/backbone.wreqr" target="_blank">Backbone Wreqr</a>. More specifically, we will use the Request-Response and Vent functionality.

### Request-Response

It allows us to create a getter through JS custom event. We will use it for the Model but also for the GeoJson data.

> *Why would we want to put the GeoJson with the Controller?*

> The reasons are quite simple:
> * The data about countries are related to the GeoJson by the country ID. The logic of the game controller depends on it, the countries displayed must be in the country data and vice versa.
> * The GeoJson is a standard, we could replace the map by another 3PP and display the GeoJson data on top of it.

The following code snippet shows how to initiate the channel with the Request-Response (reqres) for the instance of Game Model

    var gameChannel = Wreqr.radio.channel('game');

    gameChannel.reqres.setHandler('gameModel', function () {
        return this.gameModel;
    }, this);

The model is then requested the following way in the Layout:

    var gameModel = Wreqr.radio.reqres.request('game', 'gameModel');

### Vent

The different parts of the application can communicate simply through events.

The Map region needs to communicate the selected country ID to the Controller which checks it:

    var mapChannel = Wreqr.radio.channel('map');
    // on the click event handler
    mapChannel.vent.trigger('countrySelected', e.target.feature.id);

On the Controller side, we need to listen to that event:

    var mapChannel = Wreqr.radio.channel('map');
    mapChannel.vent.on('countrySelected', evaluateSelection, this);

`evaluateSelection` is the callback that will evaluate the country ID.

## Game Controller

What is the 
<a title="Marionette.Controller" href="https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.controller.md" target="_blank">Marionette.Controller</a> ?

> A Controller is a white-label Marionette Object. Its name can be a cause for confusion, as it actually has nothing to do with the popular MVC architectural pattern. Instead, it's better to think of the Controller as a base object from which you can build.

> Controllers should be used when you have a task that you would like an object to be responsible for, but none of the other Marionette Classes quite make sense to do it. It's a base object for you to use to create a new Class altogether.

*Marionette doc*

We will use the Controller class to group all game related logic. This way, we separate it from the Views and it would be easier to reuse it later in another application.


[expand title="GameController code"]

    return Marionette.Controller.extend({

        // All the game business is abstracted in this Controller.
        // The targeted result is to separate the game logic from the Views,
        // so that it is very easy to reuse in another Application.

        initialize: function () {
            this.gameModel = new GameModel();
            this.countriesIdArr = Object.keys(countriesData);

            // Use Backbone.Wreqr for the event mechanism
            // https://github.com/marionettejs/backbone.wreqr
            var mapChannel = Wreqr.radio.channel('map'),
                gameChannel = Wreqr.radio.channel('game');

            //-----------------------------------------------
            mapChannel.vent.on('countrySelected', evaluateSelection, this);
            //-----------------------------------------------
            mapChannel.reqres.setHandler('mapGeoJson', function () {
                return worldGeoJson;
            });
            //-----------------------------------------------
            gameChannel.reqres.setHandler('gameModel', function () {
                return this.gameModel;
            }, this);
        },
        selectNewCountry: function () {
            this.currentId = getRandomId.call(this);
            var newCountry = countriesData[this.currentId],
                countryData = {
                    capital: newCountry.capital,
                    currency: newCountry.currency,
                    language: newCountry.language,
                    area: (newCountry.area !== -1) ? newCountry.area : null
                };
            this.gameModel.setCountryName(newCountry.name);
            this.gameModel.setCountryInfo(countryData);
        },
        startGame: function () {
            // When the game starts, set the score to zero, and select a new country to find
            this.gameModel.resetScore();// The score reset will be part of a next coming feature
            this.selectNewCountry();
        }
    });

    function evaluateSelection(selectedCountryId) {
        if (this.currentId === selectedCountryId) {
            this.gameModel.increaseCorrect();
            this.selectNewCountry();
        } else {
            this.gameModel.increaseError();
        }
    }

    function getRandomId() {
        /*jshint validthis: true */

        // The jshint validthis: true is necessary when it will come to code quality testing using JSHint,
        // This step will come at a later stage.

        var max = this.countriesIdArr.length,
            randomIndex = Math.floor(Math.random() * (max - 1));
        // Return a randomly selected country from the list.
        return this.countriesIdArr[randomIndex];
    }

[/expand]

The MapRegion will trigger an event every time the user selects a country providing the country ID. The Controller needs to listen to this event and checks the ID against the ID of the country to find. It updates the score depending on the result.


<!-- ==================================================================== -->

<!--nextpage-->

<!-- ==================================================================== -->

# Congratulations !!!

You reached the end of this tutorial. You should now have a working application similar to:



More features will be added later such as multi language support, relax and challenge mode, etc.

Many thanks for reading, I hope you enjoyed it and that it brought you additional knowledge about ways to build JS applications.
See you soon for more tutorials !


 [1]: https://github.com/chi-mai2b/tuto-geo-app/archive/master.zip
 [2]: http://marionettejs.com/
 [3]: http://getbootstrap.com/
 [4]: http://handlebarsjs.com/
 [5]: http://lesscss.org/
 [6]: http://requirejs.org/
 [7]: http://leafletjs.com/
 [8]: http://www.sublimetext.com/3
 [9]: http://www.jetbrains.com/idea/
 [10]: http://www.jetbrains.com/webstorm/
 [11]: http://nodejs.org/
 [12]: https://www.npmjs.org/doc/install.html
 [13]: https://www.google.ie/search?q=install+lamp+on+linux "Google search"
 [14]: https://www.apachefriends.org/
 [15]: http://marc-ed-raffalli.com/blog/wp-content/uploads/2014/05/AppDesignLayout.png
 [16]: http://marc-ed-raffalli.com/blog/wp-content/uploads/2014/05/desktop.png
 [17]: http://marc-ed-raffalli.com/blog/wp-content/uploads/2014/05/mobile.png
 [18]: http://leafletjs.com/examples/geojson.html
 [19]: http://leafletjs.com/examples/quick-start.html
 [20]: http://leafletjs.com/examples/choropleth.html
 [21]: http://leafletjs.com/reference.html
 [22]: https://www.mapbox.com/