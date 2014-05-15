/**
 * User: Marc Edouard Raffalli
 * Date: 27/03/14
 * Time: 18:41
 * Website: http://raffalli-marc-ed.com/
 */
/* global define */
define([
    'marionette',
    'templates/sideTemplates'
], function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({

        // set the template to use in this view, file name is used as identifier
        template: template['_playerScoreView.hbs'],

        // Set the ui elements that we will use
        ui: {
            correct: '.mr-geoappSide-playerScore-correct',
            error: '.mr-geoappSide-playerScore-error'
        },
        onRender: function () {
            // set default values on show
            this.setCorrectText('0');
            this.setErrorText('0');
        },
        setCorrectText: function (correct) {
            // access to the element and set the text
            this.ui.correct.text(correct);
        },
        setErrorText: function (error) {
            // access to the element and set the text
            this.ui.error.text(error);
        }
    });
});