define(["handlebars.runtime"],function(a){a=a["default"];var e=a.template,n=a.templates=a.templates||{};return n["_countryInfoView.hbs"]=e({1:function(a,e,n,r){var s,l="function",o=this.escapeExpression;return'<div class="lead text-center">'+o((s=e.city||a&&a.city,typeof s===l?s.call(a,{name:"city",hash:{},data:r}):s))+"</div>"},3:function(a,e,n,r){var s,l="function",o=this.escapeExpression;return"<em>"+o((s=e.lang||a&&a.lang,typeof s===l?s.call(a,{name:"lang",hash:{},data:r}):s))+"</em>"},5:function(a,e,n,r){var s,l="function",o=this.escapeExpression;return'<span class="col-lg-12 col-md-12 col-sm-6"><small><abbr title="Surface area">A</abbr>:</small> '+o((s=e.surface||a&&a.surface,typeof s===l?s.call(a,{name:"surface",hash:{},data:r}):s))+"</span>"},7:function(a,e,n,r){var s,l="function",o=this.escapeExpression;return'<span class="col-lg-12 col-md-12 col-sm-6"><small><abbr title="Currency">Cur</abbr>:</small> '+o((s=e.currency||a&&a.currency,typeof s===l?s.call(a,{name:"currency",hash:{},data:r}):s))+"</span>"},9:function(a,e,n,r){var s,l="function",o=this.escapeExpression;return'<span class="col-lg-12 col-md-12"><small><abbr title="Population">Pop</abbr>:</small> '+o((s=e.pop||a&&a.pop,typeof s===l?s.call(a,{name:"pop",hash:{},data:r}):s))+"</span>"},compiler:[5,">= 2.0.0"],main:function(a,e,n,r){var s,l='<div class="panel panel-default">\r\n    <div class="mr-geoappSide-countryInfo-header panel-heading">\r\n        <h3 class="panel-title">More Info</h3>\r\n    </div>\r\n    <div class="mr-geoappSide-countryInfo-body panel-body">\r\n        ';return s=e["if"].call(a,a&&a.city,{name:"if",hash:{},fn:this.program(1,r),inverse:this.noop,data:r}),(s||0===s)&&(l+=s),l+="\r\n        ",s=e["if"].call(a,a&&a.lang,{name:"if",hash:{},fn:this.program(3,r),inverse:this.noop,data:r}),(s||0===s)&&(l+=s),l+='\r\n        <div class="row">\r\n                ',s=e["if"].call(a,a&&a.surface,{name:"if",hash:{},fn:this.program(5,r),inverse:this.noop,data:r}),(s||0===s)&&(l+=s),l+="\r\n            ",s=e["if"].call(a,a&&a.currency,{name:"if",hash:{},fn:this.program(7,r),inverse:this.noop,data:r}),(s||0===s)&&(l+=s),l+='\r\n        </div>\r\n        <div class="row">\r\n            ',s=e["if"].call(a,a&&a.pop,{name:"if",hash:{},fn:this.program(9,r),inverse:this.noop,data:r}),(s||0===s)&&(l+=s),l+"\r\n        </div>\r\n    </div>\r\n</div>"},useData:!0}),n["_playerScoreView.hbs"]=e({compiler:[5,">= 2.0.0"],main:function(){return'<div class="panel panel-default">\r\n    <div class="mr-geoappSide-playerScore-header panel-heading">\r\n        <h3 class="panel-title">Score</h3>\r\n    </div>\r\n    <div class="mr-geoappSide-playerScore-body panel-body">\r\n        <div class="row">\r\n            <span class="mr-geoappSide-playerScore-correct\r\n                label label-success\r\n                col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1\r\n                col-sm-4 col-sm-offset-1 col-xs-4 col-xs-offset-1">\r\n                5000\r\n            </span>\r\n            <span class="mr-geoappSide-playerScore-error\r\n                label label-danger\r\n                col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1\r\n                col-sm-4 col-sm-offset-2 col-xs-4 col-xs-offset-2">\r\n                30\r\n            </span>\r\n        </div>\r\n    </div>\r\n</div>'},useData:!0}),n["_sideLayout.hbs"]=e({compiler:[5,">= 2.0.0"],main:function(){return'<aside class="mr-geoappSide">\r\n    <div class="mr-geoappSide-playerScoreHolder"></div>\r\n    <div class="mr-geoappSide-countryInfoHolder"></div>\r\n</aside>'},useData:!0}),n});