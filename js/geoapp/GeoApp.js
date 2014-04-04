/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:41
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette'
], function (Marionette) {
    'use strict';

    var geoApp = new Marionette.Application(),
    	DummyView = Marionette.ItemView.extend({
			template: function(){
		    	return 'Congratulation !!! the application has started';
		    }
		});

    geoApp.addRegions({
        appContainer: '#appContainer'
    });
    
	geoApp.appContainer.show(new DummyView());

    return geoApp;
});