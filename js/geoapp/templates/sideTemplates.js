define(["handlebars.runtime"],function(a){a=a["default"];var e=a.template,r=a.templates=a.templates||{};return r["_countryInfoView.hbs"]=e({1:function(a,e,r,n){var s,l="function",o=this.escapeExpression;return'<div class="lead text-center">'+o((s=e.city||a&&a.city,typeof s===l?s.call(a,{name:"city",hash:{},data:n}):s))+"</div>"},3:function(a,e,r,n){var s,l="function",o=this.escapeExpression;return"<em>"+o((s=e.lang||a&&a.lang,typeof s===l?s.call(a,{name:"lang",hash:{},data:n}):s))+"</em>"},5:function(a,e,r,n){var s,l="function",o=this.escapeExpression;return'<span class="col-lg-12 col-md-12 col-sm-6"><small><abbr title="Surface area">A</abbr>:</small> '+o((s=e.surface||a&&a.surface,typeof s===l?s.call(a,{name:"surface",hash:{},data:n}):s))+"</span>"},7:function(a,e,r,n){var s,l="function",o=this.escapeExpression;return'<span class="col-lg-12 col-md-12 col-sm-6"><small><abbr title="Currency">Cur</abbr>:</small> '+o((s=e.currency||a&&a.currency,typeof s===l?s.call(a,{name:"currency",hash:{},data:n}):s))+"</span>"},9:function(a,e,r,n){var s,l="function",o=this.escapeExpression;return'<span class="col-lg-12 col-md-12"><small><abbr title="Population">Pop</abbr>:</small> '+o((s=e.pop||a&&a.pop,typeof s===l?s.call(a,{name:"pop",hash:{},data:n}):s))+"</span>"},compiler:[5,">= 2.0.0"],main:function(a,e,r,n){var s,l='<div class="panel panel-default">\r\n    <div class="mr-geoappSide-countryInfo-header panel-heading">\r\n        <h3 class="panel-title">More Info</h3>\r\n    </div>\r\n    <div class="mr-geoappSide-countryInfo-body panel-body">\r\n        ';return s=e["if"].call(a,a&&a.city,{name:"if",hash:{},fn:this.program(1,n),inverse:this.noop,data:n}),(s||0===s)&&(l+=s),l+="\r\n        ",s=e["if"].call(a,a&&a.lang,{name:"if",hash:{},fn:this.program(3,n),inverse:this.noop,data:n}),(s||0===s)&&(l+=s),l+='\r\n        <div class="row">\r\n                ',s=e["if"].call(a,a&&a.surface,{name:"if",hash:{},fn:this.program(5,n),inverse:this.noop,data:n}),(s||0===s)&&(l+=s),l+="\r\n            ",s=e["if"].call(a,a&&a.currency,{name:"if",hash:{},fn:this.program(7,n),inverse:this.noop,data:n}),(s||0===s)&&(l+=s),l+='\r\n        </div>\r\n        <div class="row">\r\n            ',s=e["if"].call(a,a&&a.pop,{name:"if",hash:{},fn:this.program(9,n),inverse:this.noop,data:n}),(s||0===s)&&(l+=s),l+"\r\n        </div>\r\n    </div>\r\n</div>"},useData:!0}),r["_playerScoreView.hbs"]=e({compiler:[5,">= 2.0.0"],main:function(a){var e,r="function",n=this.escapeExpression;return'<div class="panel panel-default">\r\n    <div class="mr-geoappSide-playerScore-header panel-heading">\r\n        <h3 class="panel-title">Score</h3>\r\n    </div>\r\n    <div class="mr-geoappSide-playerScore-body panel-body">\r\n        <div class="row">\r\n            <span class="mr-geoappSide-playerScore-correct\r\n                label label-success\r\n                col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1\r\n                col-sm-4 col-sm-offset-1 col-xs-4 col-xs-offset-1">\r\n                '+n((e=a&&a.score,e=null==e||e===!1?e:e.correct,typeof e===r?e.apply(a):e))+'\r\n            </span>\r\n            <span class="mr-geoappSide-playerScore-error\r\n                label label-danger\r\n                col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1\r\n                col-sm-4 col-sm-offset-2 col-xs-4 col-xs-offset-2">\r\n                '+n((e=a&&a.score,e=null==e||e===!1?e:e.error,typeof e===r?e.apply(a):e))+"\r\n            </span>\r\n        </div>\r\n    </div>\r\n</div>"},useData:!0}),r["_sideLayout.hbs"]=e({compiler:[5,">= 2.0.0"],main:function(){return'<aside class="mr-geoappSide">\r\n    <div class="mr-geoappSide-playerScoreHolder"></div>\r\n    <div class="mr-geoappSide-countryInfoHolder"></div>\r\n</aside>'},useData:!0}),r});