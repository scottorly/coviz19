!function(t){function e(e){for(var r,o,i=e[0],u=e[1],s=e[2],f=0,d=[];f<i.length;f++)o=i[f],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);for(l&&l(e);d.length;)d.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],r=!0,i=1;i<n.length;i++){var u=n[i];0!==a[u]&&(r=!1)}r&&(c.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},a={0:0},c=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/coviz19";var i=window.webpackJsonp=window.webpackJsonp||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var s=0;s<i.length;s++)e(i[s]);var l=u;c.push([54,1]),n()}({12:function(t,e,n){t.exports={dateLabel:"dateLabel__2RrZE",totalLabel:"totalLabel__OW1vx"}},13:function(t,e,n){t.exports={dateLabel:"dateLabel__2lKsz",totalLabel:"totalLabel__dpsbi"}},18:function(t,e,n){"use strict";(function(t){var r=n(38),a=n.n(r),c=n(23),o=n(24),i=n(41),u=function(t){var e=document.createElement("canvas"),n=e.getContext("2d");e.style.width=320,e.style.height=44,e.style.imageRendering="-moz-crisp-edges",e.style.imageRendering="pixelated";for(var r=0;r<320;++r)n.fillStyle=t(r/319),n.fillRect(r,0,1,44);return e};e.a=function(e){var n=e.attributes,r=n.domain,s=n.width,l=n.color,f=Object(c.a)(t("svg",{className:a.a.legend,width:320,height:44}));f.append((function(){return t("image",{x:0,y:0,width:s,height:44,preserveAspectRatio:"none",href:u(l).toDataURL()})}));var d=Object(o.a)().domain(r).range([0,s]);return f.append((function(){return t("g",{transform:"translate(0, 20)"})})).call(Object(i.a)(d).ticks()),f.node()}}).call(this,n(4).h)},19:function(t,e,n){"use strict";var r=n(0),a=n(61),c=Object(a.a)(",d");e.a=function(t,e){var n=Object(r.a)(parseInt(t),parseInt(e));return function(t){this.textContent=c(n(t))}}},25:function(t,e,n){t.exports={app:"app__2q9tN",footer:"footer__k4FgR"}},33:function(t,e,n){"use strict";(function(t,r){var a=n(7),c=n.n(a),o=n(14),i=n.n(o),u=n(12),s=n.n(u),l=n(47),f=n(45),d=n(10),p=n(23),h=n(27),b=n(46),v=n(24),m=(n(32),n(48)),j=n(42),g=n(43),O=n(18),y=n(19),_=Object(b.a)("%m/%d/%y"),x=Object(p.a)(t("svg",{viewBox:[0,0,975,610],width:975,height:610}));(function(){var e=i()(c.a.mark((function e(){var n,r,a,o,i,u,b,O,w,S,L,I,D,C,k,U,R,N,P;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json");case 2:return n=e.sent,e.next=5,fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv");case 5:return r=e.sent,e.next=8,r.text();case 8:return a=e.sent,e.next=11,n.json();case 11:o=e.sent,i=Object(l.a)(a).filter((function(t){return t.UID.slice(3).length>0})),u=Object(d.a)(o,o.objects.counties).features,b=Object(d.a)(o,o.objects.states).features,O=Object(m.a)(u,(function(t){return t.id})),w=i[0],S=Object.keys(w).filter(_).sort((function(t,e){return _(t)>_(e)})),L=S.map((function(t){return[t,i.map((function(e){return{id:e.UID.slice(3),deaths:e[t],feature:(O.get(e.UID.slice(3))||[])[0]}}))]})),I=L.map((function(t){return Object(j.a)(t[1],(function(t){return t.deaths}))})),D=function(t){var e=L[t],n=_(e[0]),r=I[t-1]||0;return Object(p.a)(".".concat(s.a.totalLabel)).transition(250).tween("text",(function(e){return Object(y.a)(r,I[t])})),Object(h.a)(".".concat(s.a.dateLabel)).text(n.toLocaleDateString()),e[1].filter((function(t){return t.deaths>0}))},C=Object(v.a)([0,1e3],g.a),k=Object(f.a)(),U=x.append((function(){return t("g",null)})),x.append((function(){return t("g",null)})).selectAll("path").data(b).join((function(e){return e.append((function(e){return t("path",{stroke:"#ccc","stroke-linejoin":"round",fill:"none",d:k(e)})}))})),R=function(e){U.selectAll("path").data(e,(function(t){return t.id})).join((function(e){return e.append((function(e){return t("path",{stroke:"#ccc","stroke-linejoin":"round",fill:C(e.deaths),d:k(e.feature)})})).call((function(t){return t.style("opacity",0).transition(250).style("opacity",1)}))}),(function(t){return t.call((function(t){return t.transition(250).style("fill",(function(t){return C(t.deaths)}))}))}),(function(t){return t.call((function(t){return t.transition(250).style("opacity",0).remove()}))}))},N=0,P=setInterval((function(){if(N>=L.length)clearInterval(P);else{var t=D(N);R(t),N++}}),250);case 28:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()();e.a=function(){return t(r,null,t("h1",null,"US COVID-19 Deaths"),t("h1",{className:s.a.dateLabel}),t("h1",{className:s.a.totalLabel}),x.node(),t(O.a,{domain:[0,1e3],width:320,color:g.a,scale:v.a}),t("a",{href:"https://github.com/ScottORLY/coviz19/blob/master/src/deaths/index.js"},"source code"))}}).call(this,n(4).h,n(4).f)},38:function(t,e,n){t.exports={legend:"legend__1KYfF"}},39:function(t,e,n){"use strict";(function(t,r){var a=n(7),c=n.n(a),o=n(40),i=n.n(o),u=n(14),s=n.n(u),l=n(13),f=n.n(l),d=n(18),p=n(19),h=n(47),b=n(45),v=n(10),m=n(23),j=n(27),g=n(46),O=n(24),y=(n(32),n(48)),_=n(42),x=n(44),w=Object(g.a)("%m/%d/%y"),S=Object(m.a)(t("svg",{viewBox:[0,0,975,610],width:975,height:610}));(function(){var e=s()(c.a.mark((function e(){var n,r,a,o,u,s,l,d,m,g,L,I,D,C,k,U,R,N,P;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json");case 2:return n=e.sent,e.next=5,fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv");case 5:return r=e.sent,e.next=8,n.json();case 8:return a=e.sent,e.next=11,r.text();case 11:o=e.sent,u=Object(h.a)(o).filter((function(t){return t.UID.slice(3).length>0})),console.log(u),s=Object(v.a)(a,a.objects.counties).features,l=Object(v.a)(a,a.objects.states).features,d=Object(y.a)(s,(function(t){return t.id})),m=u[0],g=Object.keys(m).filter(w).sort((function(t,e){return w(t)>w(e)})),L=g.map((function(t){return[t,u.map((function(e){return{id:e.UID.slice(3),cases:e[t],feature:(d.get(e.UID.slice(3))||[])[0]}}))]})),I=L.map((function(t){return Object(_.a)(t[1],(function(t){return t.cases}))})),D=function(t){var e=L[t],n=w(e[0]);return Object(j.a)(".".concat(f.a.totalLabel)).transition(250).tween("text",(function(e){return Object(p.a)(I[t-1]||0,I[t])})),Object(j.a)(".".concat(f.a.dateLabel)).text(n.toLocaleDateString()),e[1].filter((function(t){return t.cases>0}))},C=Object(O.a)([0,5e3],x.a),k=Object(b.a)(),S.append((function(){return t("g",null)})).selectAll("path").data(l).join((function(e){return e.append((function(e){return t("path",{stroke:"#ccc","stroke-linejoin":"round",fill:"none",d:k(e)})}))})),U=S.append((function(){return t("g",null)})),R=function(e){U.selectAll("path").data(e,(function(t){return t.id})).join((function(e){return e.append((function(e){return t("path",{stroke:"#ccc","stroke-linejoin":"round",fill:"none",d:k(e.feature)})})).call((function(t){return t.style("opacity",0).transition(250).style("opacity",1)}))}),(function(t){return t.call((function(t){return t.transition(250).style("fill",(function(t){return C(t.cases)}))}))}),(function(t){return t.call((function(t){return t.transition(250).style("opacity",0).remove()}))}))},N=0,P=setInterval((function(){if(N>=i()(L).length)clearInterval(P);else{var t=D(N);R(t),N++}}),250);case 29:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()();e.a=function(){return t(r,null,t("h1",null,"US Confirmed COVID-19 Cases"),t("h1",{className:f.a.dateLabel}),t("h1",{className:f.a.totalLabel}),S.node(),t(d.a,{domain:[0,5e3],width:320,color:x.a}),t("a",{href:"https://github.com/ScottORLY/coviz19/blob/master/src/cases/index.js"},"source code"))}}).call(this,n(4).h,n(4).f)},54:function(t,e,n){t.exports=n(55)},55:function(t,e,n){"use strict";n.r(e),function(t,e){var r=n(25),a=n.n(r),c=n(33),o=n(39);document.head.appendChild(t(e,null,t("meta",{property:"og:image",content:"https://raw.githubusercontent.com/ScottORLY/coviz19/master/screengrab.png"}),t("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}))),document.body.appendChild(t("div",{id:a.a.app},t(o.a,null),t(c.a,null),t("div",{className:a.a.footer},t("a",{href:"https://github.com/CSSEGISandData/COVID-19"},"Novel Coronavirus (COVID-19) Cases data provided by JHU CSSE"))))}.call(this,n(4).h,n(4).f)}});