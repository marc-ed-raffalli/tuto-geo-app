/**
 * User: Marc Edouard Raffalli
 * Date: 01/08/14
 * Time: 18:20
 * Website: http://marc-ed-raffalli.com/
 */
/* global define */
define([
    'region/common/ShowHideRegion'
], function (ShowHideRegion) {
    'use strict';

    return  ShowHideRegion.extend({
        el: '.mr-geoappSide-topHolder'
    });
});