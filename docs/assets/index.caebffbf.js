var t=Object.defineProperty,e=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,n=Object.prototype.propertyIsEnumerable,s=(e,a,n)=>a in e?t(e,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[a]=n,o=(t,o)=>{for(var l in o||(o={}))e.call(o,l)&&s(t,l,o[l]);if(a)for(var l of a(o))n.call(o,l)&&s(t,l,o[l]);return t};import{f as l,i,g as c,h as r,t as d,d as p,a as h,s as u,b as _,u as m,e as w,c as v,j as y,l as f,k as b,m as k,n as g,o as L,p as x,q as C,r as S,z as E,v as $,w as D,x as O,y as N,A as j,B as I,C as R,D as P,E as U,F as A}from"./vendor.a791b3e2.js";!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(a){const n=new URL(t,location),s=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((a,o)=>{const l=new URL(t,n);if(self[e].moduleMap[l])return a(self[e].moduleMap[l]);const i=new Blob([`import * as m from '${l}';`,`${e}.moduleMap['${l}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){o(new Error(`Failed to import: ${t}`)),s(c)},onload(){a(self[e].moduleMap[l]),s(c)}});document.head.appendChild(c)})),self[e].moduleMap={}}}("/assets/");var M="_app_1v48h_1";var V={dateLabel:"_dateLabel_hokwy_1",heading:"_heading_hokwy_9",ping:"_ping_hokwy_1",counter:"_counter_hokwy_17",newCases:"_newCases_hokwy_1",totalLabel:"_totalLabel_hokwy_1",deathLabel:"_deathLabel_hokwy_1",newDeaths:"_newDeaths_hokwy_1",deathSwitch:"_deathSwitch_hokwy_1",caseSwitch:"_caseSwitch_hokwy_1",circle:"_circle_hokwy_54",axis:"_axis_hokwy_59",calAxis:"_calAxis_hokwy_63",switches:"_switches_hokwy_67",bounce:"_bounce_hokwy_1",selected:"_selected_hokwy_76",legend:"_legend_hokwy_80",legends:"_legends_hokwy_1",legendLabel:"_legendLabel_hokwy_90",control:"_control_hokwy_95",label:"_label_hokwy_99",controls:"_controls_hokwy_1",cal:"_cal_hokwy_63",calendarLabel:"_calendarLabel_hokwy_107",calendar:"_calendar_hokwy_107",calendarContainer:"_calendarContainer_hokwy_1",slider:"_slider_hokwy_1",button:"_button_hokwy_127",mapContainer:"_mapContainer_hokwy_1",playback:"_playback_hokwy_1",playContainer:"_playContainer_hokwy_1",map:"_map_hokwy_1",mapSvg:"_mapSvg_hokwy_1",title:"_title_hokwy_1",popup:"_popup_hokwy_1",popupLabel:"_popupLabel_hokwy_1"};let F;const B={},T=function(t,e){if(!e)return t();if(void 0===F){const t=document.createElement("link").relList;F=t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(e.map((t=>{if(t in B)return;B[t]=!0;const e=t.endsWith(".css"),a=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${a}`))return;const n=document.createElement("link");return n.rel=e?"stylesheet":F,e||(n.as="script",n.crossOrigin=""),n.href=t,document.head.appendChild(n),e?new Promise(((t,e)=>{n.addEventListener("load",t),n.addEventListener("error",e)})):void 0}))).then((()=>t()))},z=l(",d"),Y=(t,e)=>{const a=i(parseInt(t),parseInt(e));return function(t){this.textContent=z(a(t))}},G=c(),q=({attributes:{d:t,eventListeners:e}})=>r("path",{className:"states",stroke:"#ccc","stroke-width":1,"stroke-linejoin":"round","vector-effect":"non-scaling-stroke",fill:"none",d:G(t),eventListeners:e}),W=({attributes:{d:t,eventListeners:e}})=>r("path",{className:"counties","vector-effect":"non-scaling-stroke",stroke:"none",fill:t.fill||"",d:G(t.feature)||"",eventListeners:e}),X=()=>r("div",{id:V.popup},r("p",{id:V.populLabel})),H=d("%m-%d-%Y")("1-22-2020"),J=new Date,Z=p.range(H,J),K=6*Z.length,Q={viewBox:[0,0,K,100],id:V.slider};var tt=-1;const et=({attributes:{eventListener:t}})=>{const e=m().domain(w(Z)).range([0,K]),a=u(r("svg",o(o({},Q),{eventListener:["click",function(t){const a=this.createSVGPoint();a.x=t.clientX,a.y=t.clientY;const n=a.matrixTransform(this.getScreenCTM().inverse()),s=e.invert(n.x);tt=v(Z,s);const o=y().ease(f),l={detail:{counter:tt,t:o}};window.dispatchEvent(new CustomEvent("tick",l)),u("circle").transition(o).attr("cx",6*tt)}]}))),n=a.append((()=>r("g",null)));return n.append((()=>r("g",{transform:"translate(0, 44)",className:V.axis}))).call(b(e).ticks()),n.insert((()=>r("circle",{transform:"translate(0, 44)",className:V.circle,r:12}))).call(k().on("drag",(function(e){u(this).attr("cx",(()=>{const a=e.x;if(a<0)return 0;if(a>K)return K;const n=parseInt(a/6);return t(n),a}))}))),a.node()},at=()=>{let t="stop";return h((()=>{if("start"==t&&tt<=Z.length){tt++;const t=y().duration(500).ease(f);u("circle").transition(t).attr("cx",6*tt);const e={detail:{t:t,counter:tt}};window.dispatchEvent(new CustomEvent("tick",e))}tt>Z.length&&(t="stop",u(`.${V.button}`).text("start"==t?"stop":"start"))}),500),r(_,null,r("div",{id:V.controls},r("div",{id:V.startContainer},r("button",{className:V.button,eventListener:["click",function(){t="start"==t?"stop":"start",u(this).text("start"==t?"stop":"start")}]},"start")),r(et,{eventListener:e=>{t="stop",u(`.${V.button}`).text("start"==t?"stop":"start");const a={detail:{counter:tt=e,t:null}};window.dispatchEvent(new CustomEvent("tick",a))}})),r("div",{id:V.calendarContainer}))},nt=g("%m/%d/%y");let st;const ot={eventListeners:[["mouseleave",t=>u(lt).transition().style("opacity",0)],["mouseover",function(t){const e=u(this),a=this.getBoundingClientRect(),[[n,s]]=e.data();u(lt).transition().duration(0).style("opacity",.75).style("top",a.top+window.scrollY-72+"px").style("left",`${a.left+32}px`).select("p").text(`${nt(n)} : ${s}`)}],["click",function(){const t=u(this),[[e,a]]=t.data();(t=>{tt=t;const e=y().ease(f),a={detail:{counter:tt,t:e}};window.dispatchEvent(new CustomEvent("tick",a)),u("circle").transition(e).attr("cx",6*tt)})(S(st,e))}]]},lt=r(X,null);document.body.appendChild(lt);const it=x(L().domain(["Sun","Mon","Tue","Wed","Th","Fri","Sat"]).range([0,129])).tickSize(0).ticks(7),ct=({children:t,attributes:{d:e,color:a}})=>{st=e.map((([t,e])=>t));const n=w(st),s=18.5*(C.count(...n)+1)+40,l=u(r("svg",o(o({},{width:s,height:148,viewBox:[0,0,s,148]}),{className:V.calendar}))),i=l.append((()=>r("g",{transform:"translate(36, 0)"}))),c=m().domain(n).range([0,s-40]),d=b(c).tickSize(0).ticks(12);l.append((()=>r("g",{transform:"translate(34, 0)",className:V.calAxis}))).call(it).select(".domain").remove(),l.append((()=>r("g",{transform:"translate(36, 132)",className:V.calAxis}))).call(d).select(".domain").remove();const p=(t,e)=>{i.selectAll("rect").data(t,(([t,e])=>t)).join((t=>t.append((([t,e])=>r("rect",o({fill:a(e),width:18,height:18,x:18.5*C.count(n[0],t),y:18.5*t.getDay()},ot)))).call((t=>(null!=e?t.transition(e).attr("opacity",1):t.attr("opacity",1),t)))),(t=>t),(t=>t.call((t=>t.transition(e).attr("opacity",0).remove()))))};return p([]),window.addEventListener("tick",(t=>{const a=t.detail.counter+1,n=t.detail.t,s=[...e];s.splice(a),p(s,n)})),r(_,null,r("div",{className:V.calendarLabel},t),l.node())},rt=c(),dt=[1,1e4],pt=d("%m/%d/%y"),ht=r(X,null);document.body.appendChild(ht);const ut=u(r("svg",o({},{viewBox:[0,0,975,610],id:V.mapSvg}))),_t=ut.append("g"),mt=E().scaleExtent([1,12]).on("zoom",(({transform:t})=>{_t.attr("transform",t)}));ut.call(mt);const wt={eventListeners:[["click",function(t){const e=u(this).data()[0].feature,[[a,n],[s,o]]=rt.bounds(e);ut.transition().duration(750).call(mt.transform,A.translate(487.5,305).scale(Math.min(8,.9/Math.max((s-a)/975,(o-n)/610))).translate(-(a+s)/2,-(n+o)/2))}],["mouseleave",t=>u(ht).transition().style("opacity",0)],["mouseover",function(t){const[e]=u(this).data();u(ht).transition().duration(0).style("opacity",.75).style("top",t.clientY-100+"px").style("left",`${t.clientX+24}px`).select("p").text(e.label)}]]};(async()=>{const{default:t}=await T((()=>__import__("./population.c35c5e6c.js")),void 0),{default:e}=await T((()=>__import__("./counties-albers-10m.4f8a6ef5.js")),void 0);let a="cases",n=0;const s=$(R).domain(dt),l=$(D).domain([1,1e3]),i=(t,e)=>{_t.selectAll("path.counties").data(t,(t=>t.id)).join((t=>t.append((t=>r(W,o({d:t,fill:"cases"==a?t.fill:t.deathFill},wt))))),(t=>t.call((t=>t.transition(e).style("fill",(t=>"cases"==a?t.fill:t.deathFill)).style("stroke",(t=>"cases"==a?t.fill:t.deathFill))))),(t=>t.call((t=>t.transition(e).style("opacity",0).remove()))))},c=y().ease(f);i([],c);const d=O(e,e.objects.states).features;_t.selectAll("path.states").data(d,(t=>t.properties.name)).join((t=>t.append((t=>r(q,{d:t,eventListeners:[["click",t=>console.log(t)]]})))));const p=O(e,e.objects.counties).features,h=await fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"),m=await h.text(),w=await fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"),v=await w.text(),b=t.slice(1).map((([t,e,a])=>[`${e}${a}`,+t])),k=new Map(b),g=N(m),L=N(v),x=j(p,(t=>t.id)),C=g[0],S=Object.keys(C).filter(pt),E=j(L,(t=>t.UID.slice(3))),A=S.map((t=>[t,g.map((e=>{const a=e.UID.slice(3),n=+e[t]||0,o=+k.get(a)||0,i=(x.get(a)||[])[0]||{properties:{}},c=i.properties.name,r=n/o*1e5,d=e.Province_State,p=`${c} County, ${d}`,h=s(r),u=+E.get(a)[0][t]||0,_=u/o*1e5;return{id:a,cases:r,feature:i,label:p,state:d,pop:o,total:n,fill:h,totalDeaths:u,deathsPerCap:_,deathFill:l(_)}}))])),M=S.map(pt),F=[],B=[],z=[],G=[],X=[],H=[];A.forEach(((t,e)=>{const a=I(t[1],(t=>t.total)),n=I(t[1],(t=>t.totalDeaths));F.push(a),G.push(n);const s=a-(F[e-1]||0);B.push(s);const o=n-(G[e-1]||0);z.push(o);const l=M[e];X.push([l,s]),H.push([l,o])}));const J=(t,e)=>{const a=A[t],n=pt(a[0]).toLocaleDateString(),s=U(`#${V.dateLabel}`).text(),o=F[t-1]||0,l=F[t]||0,i=B[t]||0,c=B[t-1]||0,r=G[t-1]||0,d=G[t]||0,p=z[t]||0,h=z[t-1]||0;return n!=s&&(U(`#${V.dateLabel}`).text(n),U(`#${V.totalLabel}`).transition(e).tween("text",(()=>Y(o,l))),U(`#${V.deathLabel}`).transition(e).tween("text",(()=>Y(r,d))),U(`#${V.newDeaths}`).transition(e).tween("text",(()=>Y(h,p))),U(`#${V.newCases}`).transition(e).tween("text",(()=>Y(c,i)))),a[1]};i(J(0,c),c),_t.selectAll("path.states").raise(),window.addEventListener("tick",(t=>{const e=t.detail.counter;if(e>=A.length)return;n=e;const a=t.detail.t,s=J(e,a);i(s,a)})),window.addEventListener("toggle",(t=>{a=t.detail.state;const e=y().ease(f),s={detail:{counter:n,t:e}};window.dispatchEvent(new CustomEvent("tick",s))}));const Z=$(R).domain([1,P(B)]),K=$(D).domain([1,P(z)]),Q=()=>r(_,null,r("div",{className:V.cal},r(ct,{d:X,color:Z},r("label",null,"new cases"),r("h1",{id:V.newCases},"0"))),r("div",{className:V.cal},r(ct,{d:H,color:K,title:"new deaths"},r("label",null,"new deaths"),r("h1",{id:V.newDeaths},"0"))));u(`#${V.calendarContainer}`).append((()=>r(Q,null)))})();var vt=r(_,null,ut.node());const yt=t=>{const e=document.createElement("canvas"),a=e.getContext("2d");e.style.width=320,e.style.height=44;for(let n=0;n<320;++n)a.fillStyle=t(n/319),a.fillRect(n,0,1,44);return e},ft=({attributes:{domain:t,width:e,color:a,label:n}})=>{const s=u(r("svg",{className:V.legend,viewBox:[0,0,320,44]}));s.append((()=>r("image",{x:0,y:0,width:e,height:44,preserveAspectRatio:"none",href:yt(a).toDataURL()})));const o=$(a).domain(t).range([0,e]).nice();return s.append((()=>r("g",{transform:"translate(0, 20)",className:V.axis}))).call(b(o).ticks(5,"~s")),s.append((()=>r("g",{transform:"translate(0, -8)"}))).append((()=>r("text",{className:V.legendLabel}))).text(n),s.node()};let bt="cases";const kt=()=>r(_,null,r("div",{id:V.map},r("div",{id:V.legends},r("div",{className:V.counter},r("h1",{id:V.title},"COVIZ-19"),r("label",null,"total cases"),r("h1",{id:V.totalLabel},"0"),r("label",null,"total deaths"),r("h1",{id:V.deathLabel},"0")),r("div",{className:V.control},r("button",{id:V.caseSwitch,className:`${V.switches} ${V.selected}`,eventListener:["click",function(){"cases"!=bt&&(bt="cases",u(this).classed(V.selected,!0),u(`#${V.deathSwitch}`).classed(V.selected,!1),window.dispatchEvent(new CustomEvent("toggle",{detail:{state:bt}})))}]},r("h1",null,"Cases")),r(ft,{domain:[1,1e4],width:320,color:R,label:"COVID-19 cases per 100k"})),r("div",{className:V.control},r("button",{id:V.deathSwitch,className:`${V.switches}`,eventListener:["click",function(){"deaths"!=bt&&(bt="deaths",u(this).classed(V.selected,!0),u(`#${V.caseSwitch}`).classed(V.selected,!1),window.dispatchEvent(new CustomEvent("toggle",{detail:{state:bt}})))}]},r("h1",null,"Deaths")),r(ft,{domain:[1,1e3],width:320,color:D,label:"COVID-19 deaths per 100k"}))),r("div",{id:V.mapContainer},vt)),r("div",{id:V.playback},r("h1",{id:V.dateLabel},"1/22/2020"),r(at,null)));var gt="_footer_1ud2w_3";const Lt=()=>r("div",{className:gt},r("p",null,"created by ",r("a",{href:"https://github.com/ScottORLY/coviz19"},"Scott Orlyck")),r("h4",null,"Data:"),r("p",null,r("a",{href:"https://github.com/CSSEGISandData/COVID-19"},"COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University")),r("p",null,r("a",{href:"https://api.census.gov/data/2018/pep/population?get=POP&for=county"},"US Census")));document.body.appendChild(r("div",{id:M},r(kt,null),r(Lt,null)));
