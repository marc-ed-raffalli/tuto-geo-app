/**
 * User: Marc Edouard Raffalli
 * Date: 28/05/14
 * Time: 19:20
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'region/common/ShowHideRegion'
], function (ShowHideRegion) {
    'use strict';

    return ShowHideRegion.extend({
        el: '.mr-geoappMain-headerHolder'
    });
});
