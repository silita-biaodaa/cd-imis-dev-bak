webpackJsonp([1],{12:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=n(16),o=n.n(a),i=n(38);n.n(i);o.a.defaults.baseURL="http://imis.biaodaa.com/";var r=function(e){return o.a.post("authorize/user",e).then(function(e){return e.data})}},13:function(e,t,n){"use strict";var a=n(3),o=n(45);a.a.use(o.a);var i=[];t.a=new o.a({linkActiveClass:"mui-active",mode:"history",routes:i,strict:!1})},14:function(e,t,n){"use strict";t.a={getCode:function(e){var t=location+"";if(console.log(t,44),-1==t.indexOf("?"))return"";var n=t.split("?"),a=n[1].split("&"),o={};for(var i in a){var r=a[i].split("=")[0],c=a[i].split("=")[1];o[r]=c}return console.log(o,19),o[e]},weixinauth:function(){window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8cba2f85ea47c6a6&redirect_uri=http%3a%2f%2fimis.biaodaa.com%2f%23%2findex&response_type=code&scope=snsapi_base&state=CD-IMIS#wechat_redirect"}}},15:function(e,t,n){n(36);var a=n(43)(n(34),n(44),null,null);e.exports=a.exports},34:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app"}},35:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=n(15),i=n.n(o),r=n(13),c=n(12),s=n(14);a.a.config.productionTip=!1,new a.a({el:"#app",router:r.a,template:"<App/>",components:{App:i.a}}),r.a.beforeEach(function(e,t,a){var o=s.a.getCode("code");console.log(o,new data),o?(console.log(3333,new data),n.i(c.a)({code:o}).then(function(e){alert(e)}),a()):(console.log(2222,new data),s.a.weixinauth())})},36:function(e,t){},44:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-bg",attrs:{id:"app"}},[n("router-view"),e._v("\n   11111111\n    \n")],1)},staticRenderFns:[]}}},[35]);
//# sourceMappingURL=app.a84ac53827fa10771dc8.js.map