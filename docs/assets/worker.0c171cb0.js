(function(){"use strict";var B=new Date,X=new Date;function H(e,n,t,r){function i(o){return e(o=arguments.length===0?new Date:new Date(+o)),o}return i.floor=function(o){return e(o=new Date(+o)),o},i.ceil=function(o){return e(o=new Date(o-1)),n(o,1),e(o),o},i.round=function(o){var f=i(o),g=i.ceil(o);return o-f<g-o?f:g},i.offset=function(o,f){return n(o=new Date(+o),f==null?1:Math.floor(f)),o},i.range=function(o,f,g){var U=[],F;if(o=i.ceil(o),g=g==null?1:Math.floor(g),!(o<f)||!(g>0))return U;do U.push(F=new Date(+o)),n(o,g),e(o);while(F<o&&o<f);return U},i.filter=function(o){return H(function(f){if(f>=f)for(;e(f),!o(f);)f.setTime(f-1)},function(f,g){if(f>=f)if(g<0)for(;++g<=0;)for(;n(f,-1),!o(f););else for(;--g>=0;)for(;n(f,1),!o(f););})},t&&(i.count=function(o,f){return B.setTime(+o),X.setTime(+f),e(B),e(X),Math.floor(t(B,X))},i.every=function(o){return o=Math.floor(o),!isFinite(o)||!(o>0)?null:o>1?i.filter(r?function(f){return r(f)%o===0}:function(f){return i.count(0,f)%o===0}):i}),i}const K=1e3*60,ee=K*60*24,fe=ee*7;var se=H(e=>e.setHours(0,0,0,0),(e,n)=>e.setDate(e.getDate()+n),(e,n)=>(n-e-(n.getTimezoneOffset()-e.getTimezoneOffset())*K)/ee,e=>e.getDate()-1),ne=se;se.range;function x(e){return H(function(n){n.setDate(n.getDate()-(n.getDay()+7-e)%7),n.setHours(0,0,0,0)},function(n,t){n.setDate(n.getDate()+t*7)},function(n,t){return(t-n-(t.getTimezoneOffset()-n.getTimezoneOffset())*K)/fe})}var le=x(0),J=x(1),Ze=x(2),_e=x(3),R=x(4),je=x(5),Pe=x(6);le.range,J.range,Ze.range,_e.range,R.range,je.range,Pe.range;var te=H(function(e){e.setMonth(0,1),e.setHours(0,0,0,0)},function(e,n){e.setFullYear(e.getFullYear()+n)},function(e,n){return n.getFullYear()-e.getFullYear()},function(e){return e.getFullYear()});te.every=function(e){return!isFinite(e=Math.floor(e))||!(e>0)?null:H(function(n){n.setFullYear(Math.floor(n.getFullYear()/e)*e),n.setMonth(0,1),n.setHours(0,0,0,0)},function(n,t){n.setFullYear(n.getFullYear()+t*e)})};var P=te;te.range;var ge=H(function(e){e.setUTCHours(0,0,0,0)},function(e,n){e.setUTCDate(e.getUTCDate()+n)},function(e,n){return(n-e)/ee},function(e){return e.getUTCDate()-1}),me=ge;ge.range;function A(e){return H(function(n){n.setUTCDate(n.getUTCDate()-(n.getUTCDay()+7-e)%7),n.setUTCHours(0,0,0,0)},function(n,t){n.setUTCDate(n.getUTCDate()+t*7)},function(n,t){return(t-n)/fe})}var he=A(0),z=A(1),Ee=A(2),Ve=A(3),Z=A(4),Qe=A(5),qe=A(6);he.range,z.range,Ee.range,Ve.range,Z.range,Qe.range,qe.range;var re=H(function(e){e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},function(e,n){e.setUTCFullYear(e.getUTCFullYear()+n)},function(e,n){return n.getUTCFullYear()-e.getUTCFullYear()},function(e){return e.getUTCFullYear()});re.every=function(e){return!isFinite(e=Math.floor(e))||!(e>0)?null:H(function(n){n.setUTCFullYear(Math.floor(n.getUTCFullYear()/e)*e),n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},function(n,t){n.setUTCFullYear(n.getUTCFullYear()+t*e)})};var E=re;re.range;class $e extends Map{constructor(n=[],t=ze){super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:t}});for(const[r,i]of n)this.set(r,i)}get(n){return super.get(ye(this,n))}has(n){return super.has(ye(this,n))}set(n,t){return super.set(Ge(this,n),t)}delete(n){return super.delete(Je(this,n))}}function ye({_intern:e,_key:n},t){const r=n(t);return e.has(r)?e.get(r):t}function Ge({_intern:e,_key:n},t){const r=n(t);return e.has(r)?e.get(r):(e.set(r,t),t)}function Je({_intern:e,_key:n},t){const r=n(t);return e.has(r)&&(t=e.get(t),e.delete(r)),t}function ze(e){return e!==null&&typeof e=="object"?e.valueOf():e}function Te(e){return e}function Ce(e,...n){return Be(e,Te,Te,n)}function Be(e,n,t,r){return function i(o,f){if(f>=r.length)return t(o);const g=new $e,U=r[f++];let F=-1;for(const p of o){const c=U(p,++F,o),y=g.get(c);y?y.push(p):g.set(c,[p])}for(const[p,c]of g)g.set(p,i(c,f));return n(g)}(e,0)}function ue(e){if(0<=e.y&&e.y<100){var n=new Date(-1,e.m,e.d,e.H,e.M,e.S,e.L);return n.setFullYear(e.y),n}return new Date(e.y,e.m,e.d,e.H,e.M,e.S,e.L)}function oe(e){if(0<=e.y&&e.y<100){var n=new Date(Date.UTC(-1,e.m,e.d,e.H,e.M,e.S,e.L));return n.setUTCFullYear(e.y),n}return new Date(Date.UTC(e.y,e.m,e.d,e.H,e.M,e.S,e.L))}function V(e,n,t){return{y:e,m:n,d:t,H:0,M:0,S:0,L:0}}function Xe(e){var n=e.dateTime,t=e.date,r=e.time,i=e.periods,o=e.days,f=e.shortDays,g=e.months,U=e.shortMonths,F=Q(i),p=q(i),c=Q(o),y=q(o),W=Q(f),v=q(f),C=Q(g),O=q(g),L=Q(U),G=q(U),D={a:vt,A:Ut,b:Mt,B:Dt,c:null,d:we,e:we,f:Dn,g:Ln,G:xn,H:vn,I:Un,j:Mn,L:de,m:wn,M:dn,p:wt,q:dt,Q:be,s:He,S:Sn,u:Yn,U:Fn,V:Wn,w:kn,W:bn,x:null,X:null,y:Hn,Y:On,Z:An,"%":ke},k={a:St,A:Yt,b:Ft,B:Wt,c:null,d:Ye,e:Ye,f:Zn,g:Jn,G:Bn,H:Nn,I:In,j:Rn,L:Fe,m:_n,M:jn,p:kt,q:bt,Q:be,s:He,S:Pn,u:En,U:Vn,V:Qn,w:qn,W:$n,x:null,X:null,y:Gn,Y:zn,Z:Xn,"%":ke},j={a:gt,A:mt,b:ht,B:yt,c:Tt,d:Me,e:Me,f:yn,g:Ue,G:ve,H:De,I:De,j:ln,L:hn,m:sn,M:gn,p:lt,q:fn,Q:Cn,s:pn,S:mn,u:rn,U:un,V:on,w:tn,W:an,x:Ct,X:pt,y:Ue,Y:ve,Z:cn,"%":Tn};D.x=d(t,D),D.X=d(r,D),D.c=d(n,D),k.x=d(t,k),k.X=d(r,k),k.c=d(n,k);function d(a,s){return function(m){var u=[],w=-1,h=0,S=a.length,Y,I,Re;for(m instanceof Date||(m=new Date(+m));++w<S;)a.charCodeAt(w)===37&&(u.push(a.slice(h,w)),(I=pe[Y=a.charAt(++w)])!=null?Y=a.charAt(++w):I=Y==="e"?" ":"0",(Re=s[Y])&&(Y=Re(m,I)),u.push(Y),h=w+1);return u.push(a.slice(h,w)),u.join("")}}function N(a,s){return function(m){var u=V(1900,void 0,1),w=b(u,a,m+="",0),h,S;if(w!=m.length)return null;if("Q"in u)return new Date(u.Q);if("s"in u)return new Date(u.s*1e3+("L"in u?u.L:0));if(s&&!("Z"in u)&&(u.Z=0),"p"in u&&(u.H=u.H%12+u.p*12),u.m===void 0&&(u.m="q"in u?u.q:0),"V"in u){if(u.V<1||u.V>53)return null;"w"in u||(u.w=1),"Z"in u?(h=oe(V(u.y,0,1)),S=h.getUTCDay(),h=S>4||S===0?z.ceil(h):z(h),h=me.offset(h,(u.V-1)*7),u.y=h.getUTCFullYear(),u.m=h.getUTCMonth(),u.d=h.getUTCDate()+(u.w+6)%7):(h=ue(V(u.y,0,1)),S=h.getDay(),h=S>4||S===0?J.ceil(h):J(h),h=ne.offset(h,(u.V-1)*7),u.y=h.getFullYear(),u.m=h.getMonth(),u.d=h.getDate()+(u.w+6)%7)}else("W"in u||"U"in u)&&("w"in u||(u.w="u"in u?u.u%7:"W"in u?1:0),S="Z"in u?oe(V(u.y,0,1)).getUTCDay():ue(V(u.y,0,1)).getDay(),u.m=0,u.d="W"in u?(u.w+6)%7+u.W*7-(S+5)%7:u.w+u.U*7-(S+6)%7);return"Z"in u?(u.H+=u.Z/100|0,u.M+=u.Z%100,oe(u)):ue(u)}}function b(a,s,m,u){for(var w=0,h=s.length,S=m.length,Y,I;w<h;){if(u>=S)return-1;if(Y=s.charCodeAt(w++),Y===37){if(Y=s.charAt(w++),I=j[Y in pe?s.charAt(w++):Y],!I||(u=I(a,m,u))<0)return-1}else if(Y!=m.charCodeAt(u++))return-1}return u}function lt(a,s,m){var u=F.exec(s.slice(m));return u?(a.p=p.get(u[0].toLowerCase()),m+u[0].length):-1}function gt(a,s,m){var u=W.exec(s.slice(m));return u?(a.w=v.get(u[0].toLowerCase()),m+u[0].length):-1}function mt(a,s,m){var u=c.exec(s.slice(m));return u?(a.w=y.get(u[0].toLowerCase()),m+u[0].length):-1}function ht(a,s,m){var u=L.exec(s.slice(m));return u?(a.m=G.get(u[0].toLowerCase()),m+u[0].length):-1}function yt(a,s,m){var u=C.exec(s.slice(m));return u?(a.m=O.get(u[0].toLowerCase()),m+u[0].length):-1}function Tt(a,s,m){return b(a,n,s,m)}function Ct(a,s,m){return b(a,t,s,m)}function pt(a,s,m){return b(a,r,s,m)}function vt(a){return f[a.getDay()]}function Ut(a){return o[a.getDay()]}function Mt(a){return U[a.getMonth()]}function Dt(a){return g[a.getMonth()]}function wt(a){return i[+(a.getHours()>=12)]}function dt(a){return 1+~~(a.getMonth()/3)}function St(a){return f[a.getUTCDay()]}function Yt(a){return o[a.getUTCDay()]}function Ft(a){return U[a.getUTCMonth()]}function Wt(a){return g[a.getUTCMonth()]}function kt(a){return i[+(a.getUTCHours()>=12)]}function bt(a){return 1+~~(a.getUTCMonth()/3)}return{format:function(a){var s=d(a+="",D);return s.toString=function(){return a},s},parse:function(a){var s=N(a+="",!1);return s.toString=function(){return a},s},utcFormat:function(a){var s=d(a+="",k);return s.toString=function(){return a},s},utcParse:function(a){var s=N(a+="",!0);return s.toString=function(){return a},s}}}var pe={"-":"",_:" ",0:"0"},T=/^\s*\d+/,Ke=/^%/,en=/[\\^$*+?|[\]().{}]/g;function l(e,n,t){var r=e<0?"-":"",i=(r?-e:e)+"",o=i.length;return r+(o<t?new Array(t-o+1).join(n)+i:i)}function nn(e){return e.replace(en,"\\$&")}function Q(e){return new RegExp("^(?:"+e.map(nn).join("|")+")","i")}function q(e){return new Map(e.map((n,t)=>[n.toLowerCase(),t]))}function tn(e,n,t){var r=T.exec(n.slice(t,t+1));return r?(e.w=+r[0],t+r[0].length):-1}function rn(e,n,t){var r=T.exec(n.slice(t,t+1));return r?(e.u=+r[0],t+r[0].length):-1}function un(e,n,t){var r=T.exec(n.slice(t,t+2));return r?(e.U=+r[0],t+r[0].length):-1}function on(e,n,t){var r=T.exec(n.slice(t,t+2));return r?(e.V=+r[0],t+r[0].length):-1}function an(e,n,t){var r=T.exec(n.slice(t,t+2));return r?(e.W=+r[0],t+r[0].length):-1}function ve(e,n,t){var r=T.exec(n.slice(t,t+4));return r?(e.y=+r[0],t+r[0].length):-1}function Ue(e,n,t){var r=T.exec(n.slice(t,t+2));return r?(e.y=+r[0]+(+r[0]>68?1900:2e3),t+r[0].length):-1}function cn(e,n,t){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(t,t+6));return r?(e.Z=r[1]?0:-(r[2]+(r[3]||"00")),t+r[0].length):-1}function fn(e,n,t){var r=T.exec(n.slice(t,t+1));return r?(e.q=r[0]*3-3,t+r[0].length):-1}function sn(e,n,t){var r=T.exec(n.slice(t,t+2));return r?(e.m=r[0]-1,t+r[0].length):-1}function Me(e,n,t){var r=T.exec(n.slice(t,t+2));return r?(e.d=+r[0],t+r[0].length):-1}function ln(e,n,t){var r=T.exec(n.slice(t,t+3));return r?(e.m=0,e.d=+r[0],t+r[0].length):-1}function De(e,n,t){var r=T.exec(n.slice(t,t+2));return r?(e.H=+r[0],t+r[0].length):-1}function gn(e,n,t){var r=T.exec(n.slice(t,t+2));return r?(e.M=+r[0],t+r[0].length):-1}function mn(e,n,t){var r=T.exec(n.slice(t,t+2));return r?(e.S=+r[0],t+r[0].length):-1}function hn(e,n,t){var r=T.exec(n.slice(t,t+3));return r?(e.L=+r[0],t+r[0].length):-1}function yn(e,n,t){var r=T.exec(n.slice(t,t+6));return r?(e.L=Math.floor(r[0]/1e3),t+r[0].length):-1}function Tn(e,n,t){var r=Ke.exec(n.slice(t,t+1));return r?t+r[0].length:-1}function Cn(e,n,t){var r=T.exec(n.slice(t));return r?(e.Q=+r[0],t+r[0].length):-1}function pn(e,n,t){var r=T.exec(n.slice(t));return r?(e.s=+r[0],t+r[0].length):-1}function we(e,n){return l(e.getDate(),n,2)}function vn(e,n){return l(e.getHours(),n,2)}function Un(e,n){return l(e.getHours()%12||12,n,2)}function Mn(e,n){return l(1+ne.count(P(e),e),n,3)}function de(e,n){return l(e.getMilliseconds(),n,3)}function Dn(e,n){return de(e,n)+"000"}function wn(e,n){return l(e.getMonth()+1,n,2)}function dn(e,n){return l(e.getMinutes(),n,2)}function Sn(e,n){return l(e.getSeconds(),n,2)}function Yn(e){var n=e.getDay();return n===0?7:n}function Fn(e,n){return l(le.count(P(e)-1,e),n,2)}function Se(e){var n=e.getDay();return n>=4||n===0?R(e):R.ceil(e)}function Wn(e,n){return e=Se(e),l(R.count(P(e),e)+(P(e).getDay()===4),n,2)}function kn(e){return e.getDay()}function bn(e,n){return l(J.count(P(e)-1,e),n,2)}function Hn(e,n){return l(e.getFullYear()%100,n,2)}function Ln(e,n){return e=Se(e),l(e.getFullYear()%100,n,2)}function On(e,n){return l(e.getFullYear()%1e4,n,4)}function xn(e,n){var t=e.getDay();return e=t>=4||t===0?R(e):R.ceil(e),l(e.getFullYear()%1e4,n,4)}function An(e){var n=e.getTimezoneOffset();return(n>0?"-":(n*=-1,"+"))+l(n/60|0,"0",2)+l(n%60,"0",2)}function Ye(e,n){return l(e.getUTCDate(),n,2)}function Nn(e,n){return l(e.getUTCHours(),n,2)}function In(e,n){return l(e.getUTCHours()%12||12,n,2)}function Rn(e,n){return l(1+me.count(E(e),e),n,3)}function Fe(e,n){return l(e.getUTCMilliseconds(),n,3)}function Zn(e,n){return Fe(e,n)+"000"}function _n(e,n){return l(e.getUTCMonth()+1,n,2)}function jn(e,n){return l(e.getUTCMinutes(),n,2)}function Pn(e,n){return l(e.getUTCSeconds(),n,2)}function En(e){var n=e.getUTCDay();return n===0?7:n}function Vn(e,n){return l(he.count(E(e)-1,e),n,2)}function We(e){var n=e.getUTCDay();return n>=4||n===0?Z(e):Z.ceil(e)}function Qn(e,n){return e=We(e),l(Z.count(E(e),e)+(E(e).getUTCDay()===4),n,2)}function qn(e){return e.getUTCDay()}function $n(e,n){return l(z.count(E(e)-1,e),n,2)}function Gn(e,n){return l(e.getUTCFullYear()%100,n,2)}function Jn(e,n){return e=We(e),l(e.getUTCFullYear()%100,n,2)}function zn(e,n){return l(e.getUTCFullYear()%1e4,n,4)}function Bn(e,n){var t=e.getUTCDay();return e=t>=4||t===0?Z(e):Z.ceil(e),l(e.getUTCFullYear()%1e4,n,4)}function Xn(){return"+0000"}function ke(){return"%"}function be(e){return+e}function He(e){return Math.floor(+e/1e3)}var _,Le,Oe;Kn({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function Kn(e){return _=Xe(e),Le=_.format,Oe=_.parse,_.utcFormat,_.utcParse,_}var xe={},ae={},ce=34,$=10,ie=13;function Ae(e){return new Function("d","return {"+e.map(function(n,t){return JSON.stringify(n)+": d["+t+'] || ""'}).join(",")+"}")}function et(e,n){var t=Ae(e);return function(r,i){return n(t(r),i,e)}}function Ne(e){var n=Object.create(null),t=[];return e.forEach(function(r){for(var i in r)i in n||t.push(n[i]=i)}),t}function M(e,n){var t=e+"",r=t.length;return r<n?new Array(n-r+1).join(0)+t:t}function nt(e){return e<0?"-"+M(-e,6):e>9999?"+"+M(e,6):M(e,4)}function tt(e){var n=e.getUTCHours(),t=e.getUTCMinutes(),r=e.getUTCSeconds(),i=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":nt(e.getUTCFullYear())+"-"+M(e.getUTCMonth()+1,2)+"-"+M(e.getUTCDate(),2)+(i?"T"+M(n,2)+":"+M(t,2)+":"+M(r,2)+"."+M(i,3)+"Z":r?"T"+M(n,2)+":"+M(t,2)+":"+M(r,2)+"Z":t||n?"T"+M(n,2)+":"+M(t,2)+"Z":"")}function rt(e){var n=new RegExp('["'+e+`
\r]`),t=e.charCodeAt(0);function r(c,y){var W,v,C=i(c,function(O,L){if(W)return W(O,L-1);v=O,W=y?et(O,y):Ae(O)});return C.columns=v||[],C}function i(c,y){var W=[],v=c.length,C=0,O=0,L,G=v<=0,D=!1;c.charCodeAt(v-1)===$&&--v,c.charCodeAt(v-1)===ie&&--v;function k(){if(G)return ae;if(D)return D=!1,xe;var d,N=C,b;if(c.charCodeAt(N)===ce){for(;C++<v&&c.charCodeAt(C)!==ce||c.charCodeAt(++C)===ce;);return(d=C)>=v?G=!0:(b=c.charCodeAt(C++))===$?D=!0:b===ie&&(D=!0,c.charCodeAt(C)===$&&++C),c.slice(N+1,d-1).replace(/""/g,'"')}for(;C<v;){if((b=c.charCodeAt(d=C++))===$)D=!0;else if(b===ie)D=!0,c.charCodeAt(C)===$&&++C;else if(b!==t)continue;return c.slice(N,d)}return G=!0,c.slice(N,v)}for(;(L=k())!==ae;){for(var j=[];L!==xe&&L!==ae;)j.push(L),L=k();y&&(j=y(j,O++))==null||W.push(j)}return W}function o(c,y){return c.map(function(W){return y.map(function(v){return p(W[v])}).join(e)})}function f(c,y){return y==null&&(y=Ne(c)),[y.map(p).join(e)].concat(o(c,y)).join(`
`)}function g(c,y){return y==null&&(y=Ne(c)),o(c,y).join(`
`)}function U(c){return c.map(F).join(`
`)}function F(c){return c.map(p).join(e)}function p(c){return c==null?"":c instanceof Date?tt(c):n.test(c+="")?'"'+c.replace(/"/g,'""')+'"':c}return{parse:r,parseRows:i,format:f,formatBody:g,formatRows:U,formatRow:F,formatValue:p}}var ut=rt(","),ot=ut.parse;const Ie="%m-%d-%Y",at=Oe(Ie),ct=Le(Ie),it="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/",ft=({Province_State:e})=>e!="Diamond Princess"&&e!="Grand Princess"&&e!="Recovered",st=(async()=>{const e=at("4-12-2020"),n=new Date,r=ne.range(e,n).map(async g=>{const F=await(await fetch(`${it}${ct(g)}.csv`)).text(),p=ot(F).filter(ft),c=Ce(p,y=>y.Province_State);return[g,c]}),o=(await Promise.all(r)).flatMap(([g,U])=>[...U].map(([F,p])=>({date:g,...p[0]})));return Ce(o,g=>g.Province_State)})();onmessage=async()=>postMessage(await st)})();