!function(t){function e(e){for(var a,i,s=e[0],o=e[1],l=e[2],d=0,f=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&f.push(c[i][0]),c[i]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(t[a]=o[a]);for(u&&u(e);f.length;)f.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,s=1;s<n.length;s++){var o=n[s];0!==c[o]&&(a=!1)}a&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},c={0:0},r=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var s=window.webpackJsonp=window.webpackJsonp||[],o=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=o;r.push([71,1]),n()}({11:function(t,e,n){t.exports={controls:"controls__1EvwY",slider:"slider__1u-nx",button:"button__3VipA",paused:"paused__avWib"}},2:function(t,e,n){t.exports={dateLabel:"dateLabel__2lKsz",deathLabel:"deathLabel__1aAHS",title:"title__38Hap",totalLabel:"totalLabel__dpsbi",switches:"switches__JygiP",deathSwitch:"deathSwitch__wqJpZ",caseSwitch:"caseSwitch__2TyBz",selected:"selected__2bd-Q",legends:"legends__2bwss",control:"control__3eTv4",label:"label__3sHE3"}},36:function(t,e,n){t.exports={app:"app__2q9tN",footer:"footer__k4FgR"}},38:function(t,e,n){"use strict";var a=n(7),c=n(83),r=Object(c.a)(",d");e.a=function(t,e){var n=Object(a.a)(parseInt(t),parseInt(e));return function(t){this.textContent=r(n(t))}}},40:function(t,e,n){"use strict";(function(t){n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i}));var a=n(81),c=Object(a.a)(),r=function(e){var n=e.attributes.d;return t("path",{stroke:"#ccc","stroke-width":.5,"stroke-linejoin":"round",fill:"none",d:c(n)})},i=function(e){var n=e.attributes.d;return t("path",{stroke:n.fill||"","stroke-linejoin":"round","stroke-width":.5,fill:n.fill||"",d:c(n.feature)||""})}}).call(this,n(13).h)},42:function(t,e,n){"use strict";(function(t){var a=n(59),c=n.n(a),r=n(6),i=n(44),s=n(29),o=function(t){var e=document.createElement("canvas"),n=e.getContext("2d");e.style.width=320,e.style.height=44;for(var a=0;a<320;++a)n.fillStyle=t(a/319),n.fillRect(a,0,1,44);return e};e.a=function(e){var n=e.attributes,a=n.domain,l=n.width,u=n.color,d=n.label,f=Object(r.a)(t("svg",{className:c.a.legend,width:320,height:44}));f.append((function(){return t("image",{x:0,y:0,width:l,height:44,preserveAspectRatio:"none",href:o(u).toDataURL()})}));var p=Object(i.a)(u).domain(a).range([0,l]).nice();return f.append((function(){return t("g",{transform:"translate(0, 20)"})})).call(Object(s.a)(p).ticks(5,",")),f.append((function(){return t("g",{transform:"translate(0, -8)"})})).append("text").text(d),f.node()}}).call(this,n(13).h)},50:function(t,e,n){"use strict";(function(t,a){var c=n(2),r=n.n(c),i=n(51),s=n(42),o=n(6),l=n(62),u=n(63),d="cases";e.a=function(){return t(a,null,t("div",{id:r.a.legends},t("div",{className:r.a.control},t("label",{className:r.a.label},"Cases"),t("h1",{id:r.a.totalLabel},"0"),t("button",{id:r.a.caseSwitch,className:"".concat(r.a.switches," ").concat(r.a.selected),eventListener:["click",function(){"cases"!=d&&(mixpanel.track("Cases View"),d="cases",Object(o.a)(this).classed(r.a.selected,!0),Object(o.a)("#".concat(r.a.deathSwitch)).classed(r.a.selected,!1),window.dispatchEvent(new CustomEvent("toggle",{detail:{state:d}})))}]},"Cases"),t(s.a,{domain:[1,1e4],width:320,color:l.a,label:"COVID-19 cases per 100k"})),t("h1",{id:r.a.dateLabel},"1/22/2020"),t("div",{className:r.a.control},t("label",{className:r.a.label},"Deaths"),t("h1",{id:r.a.deathLabel},"0"),t("button",{id:r.a.deathSwitch,className:"".concat(r.a.switches),eventListener:["click",function(){"deaths"!=d&&(mixpanel.track("Deaths View"),d="deaths",Object(o.a)(this).classed(r.a.selected,!0),Object(o.a)("#".concat(r.a.caseSwitch)).classed(r.a.selected,!1),window.dispatchEvent(new CustomEvent("toggle",{detail:{state:d}})))}]},"Deaths"),t(s.a,{domain:[1,1e3],width:320,color:u.a,label:"COVID-19 deaths per 100k"}))),i.a)}}).call(this,n(13).h,n(13).f)},51:function(t,e,n){"use strict";(function(t,a){var c=n(37),r=n.n(c),i=n(52),s=n.n(i),o=n(53),l=n.n(o),u=n(2),d=n.n(u),f=n(38),p=n(67),h=n(6),b=n(32),v=n(12),g=n(43),w=n(65),m=n(44),O=n(66),_=n(64),j=n(62),y=n(63),x=n(40),S=n(61),k=n(10),C=n(33),D=[1,1e4],L=Object(w.b)("%m/%d/%y"),E={viewBox:[0,0,975,610],width:975,height:610},I="cases",P=!1,V=0,N=Object(h.a)(t("svg",E));fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json").then(function(){var e=l()(r.a.mark((function e(n){var a,c,i,o,l,u,h,w,E,U,A,F,J,M,R,H,T,z,G,q,B,K,Y,Z,Q,W,X,$;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.json();case 2:return a=e.sent,c=Object(g.a)(a,a.objects.states).features,i=Object(g.a)(a,a.objects.counties).features,e.next=7,fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv");case 7:return o=e.sent,e.next=10,o.text();case 10:return l=e.sent,e.next=13,fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv");case 13:return u=e.sent,e.next=16,u.text();case 16:return h=e.sent,e.next=19,fetch("https://api.census.gov/data/2018/pep/population?get=POP&for=county");case 19:return w=e.sent,e.next=22,w.json();case 22:E=e.sent,U=E.slice(1).map((function(t){var e=s()(t,3),n=e[0],a=e[1],c=e[2];return["".concat(a).concat(c),+n]})),A=new Map(U),F=Object(p.a)(l).filter((function(t){return t.UID.slice(3).length>0})),J=Object(p.a)(h).filter((function(t){return t.UID.slice(3).length>0})),M=Object(O.a)(i,(function(t){return t.id})),R=F[0],H=Object.keys(R).filter(L),T=Object(m.a)(j.a).domain(D),z=Object(m.a)(y.a).domain([1,1e3]),G=Object(O.a)(J,(function(t){return t.UID.slice(3)})),q=H.map((function(t){return[t,F.map((function(e){var n=e.UID.slice(3),a=+e[t]||0,c=+A.get(n)||0,r=(M.get(n)||[])[0]||{properties:{}},i=r.properties.name,s=a/c*1e5,o=e.Province_State,l="".concat(i," County, ").concat(o),u=T(s),d=+G.get(n)[0][t]||0,f=d/c*1e5;return{id:n,cases:s,feature:r,label:l,state:o,pop:c,total:a,fill:u,totalDeaths:d,deathsPerCap:f,deathFill:z(f)}}))]})),B=N.append((function(){return t("g",null)})),K=function(e,n){P=!0,B.selectAll("path").data(e,(function(t){return t.id})).join((function(e){return e.append((function(e){return t(x.a,{d:e,fill:"cases"==I?e.fill:e.deathFill})}))}),(function(t){return t.call((function(t){return t.transition(n).style("fill",(function(t){return"cases"==I?t.fill:t.deathFill})).style("stroke",(function(t){return"cases"==I?t.fill:t.deathFill}))}))}),(function(t){return t.call((function(t){return t.transition(n).style("opacity",0).remove()}))}))},Y=q.map((function(t){return Object(_.a)(t[1],(function(t){return t.total}))})),Z=q.map((function(t){return Object(_.a)(t[1],(function(t){return t.totalDeaths}))})),Q=function(t,e){var n=q[t],a=L(n[0]).toLocaleDateString();return a!=Object(b.a)("#".concat(d.a.dateLabel)).text()&&(Object(b.a)("#".concat(d.a.totalLabel)).transition(e).tween("text",(function(){return Object(f.a)(Y[t-1]||0,Y[t])})),Object(b.a)("#".concat(d.a.deathLabel)).transition(e).tween("text",(function(){return Object(f.a)(Z[t-1]||0,Z[t])})),Object(b.a)("#".concat(d.a.dateLabel)).text(a)),n[1]},window.addEventListener("tick",(function(t){var e=t.detail.counter;if(V=e,!(e>=q.length)){var n=t.detail.t,a=Q(e,n);K(a,n)}})),window.addEventListener("toggle",(function(t){I=t.detail.state;var e=Object(k.b)().ease(C.a),n={detail:{counter:V,t:e}};window.dispatchEvent(new CustomEvent("tick",n))})),W=function(){1==P&&N.selectAll("path").attr("transform",v.c.transform)},N.call(Object(S.a)().scaleExtent([1,4]).on("zoom",W)),X=Object(k.b)().ease(C.a),$=Q(0,X),K($,X),N.append("g").selectAll("path").data(c).join((function(e){return e.append((function(e){return t(x.b,{d:e})}))}));case 47:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.a=t(a,null," ",N.node()," ")}).call(this,n(13).h,n(13).f)},59:function(t,e,n){t.exports={legend:"legend__KitV3"}},60:function(t,e,n){"use strict";(function(t){var a=n(11),c=n.n(a),r=n(6),i=n(12),s=n(10),o=n(33),l=n(65),u=n(79),d=n(82),f=n(84),p=n(29),h=n(80),b=Object(l.b)("%m-%d-%Y")("1-22-2020"),v=new Date,g=u.a.range(b,v),w=6*g.length,m={width:w,height:50,id:c.a.slider},O=function(e){var n=e.attributes.eventListener,a=Object(d.a)().domain(Object(h.a)(g)).range([0,w]),s=Object(r.a)(t("svg",m)),o=s.append((function(){return t("g",null,t("line",{x1:a.range()[0],x2:a.range()[1]}))}));return o.append((function(){return t("g",{transform:"translate(0, 20)"})})).call(Object(p.a)(a).ticks(6)),o.insert((function(){return t("circle",{className:c.a.overlay,r:9})})).call(Object(f.a)().on("drag",(function(){Object(r.a)(this).attr("cx",(function(){var t=i.c.x;if(t<0)return 0;if(t>w)return w;var e=parseInt(t/6);return n(e),t}))}))),s.node()};e.a=function(){var e=-1,n="pause";return setInterval((function(){if("play"==n&&e<=g.length){e++;var t=Object(s.b)().duration(500).ease(o.a);Object(r.a)("circle").transition(t).attr("cx",6*e);var a={detail:{t:t,counter:e}};window.dispatchEvent(new CustomEvent("tick",a))}e>g.length&&(n="pause",Object(r.a)(".".concat(c.a.button)).classed(c.a.paused,"play"==n))}),500),t("div",{id:c.a.controls},t("button",{className:c.a.button,eventListener:["click",function(){n="play"==n?"pause":"play",mixpanel.track(n),Object(r.a)(this).classed(c.a.paused,"play"==n)}]}),t(O,{eventListener:function(t){n="pause",Object(r.a)(".".concat(c.a.button)).classed(c.a.paused,"play"==n),e=t;var a=Object(s.b)().ease(o.a),i={detail:{counter:e,t:a}};window.dispatchEvent(new CustomEvent("tick",i))}}))}}).call(this,n(13).h)},71:function(t,e,n){t.exports=n(72)},72:function(t,e,n){"use strict";n.r(e),function(t){var e=n(36),a=n.n(e),c=n(50),r=n(60),i=n(30),s=n.n(i);document.body.appendChild(t("div",{id:a.a.app},t("h1",null,"COVIZ-19"),t("div",null,t(c.a,null)),t(r.a,null),t("div",{className:a.a.footer},t("h4",null,"Datasources:"),t("p",null,t("a",{href:"https://github.com/CSSEGISandData/COVID-19"},"COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University")),t("p",null,t("a",{href:"https://api.census.gov/data/2018/pep/population?get=POP&for=county"},"US Census"))))),s.a.init("d5a4311d045c79b449719cd17223e378"),s.a.track("Page View"),window.mixpanel=s.a}.call(this,n(13).h)}});