(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){},16:function(e,t,a){e.exports=a.p+"static/media/oreo-logo.6e871b98.png"},17:function(e,t,a){e.exports=a.p+"static/media/oreo.6eb78e8a.png"},19:function(e){e.exports={oreos:0,clicks:0,gadgetsCount:0,ticks:0,speed:0,gadgets:[{type:"pointer",cost:10,inflation:1.2,speed:.1,count:0},{type:"grandma",cost:100,inflation:1.2,speed:1,count:0},{type:"farm",cost:250,inflation:1.2,speed:7,count:0}],messages:[{type:"info",text:"Click on the big OREO biscuit to Start :)",time:0}],autoSaveTimeout:5,trophies:[{type:"start",title:"start",message:"You've just started!",key:"clicks",target:1},{type:"first-gadget",title:"1st gadget",message:"You've just got your first gadget!",key:"gadgetsCount",target:1},{type:"ten-gadgets",title:"10 gadgets",message:"You've just got 10 gadget! keep it up!",key:"gadgetsCount",target:10}]}},22:function(e,t,a){e.exports=a(52)},52:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(15),s=a.n(r),c=(a(12),a(20)),i=a(3),l=a.n(i);function u(e){var t=e.gadgets,a=e.buyGadget,n=t.map(function(e){return o.a.createElement("li",{className:"automation-item",key:e.type},o.a.createElement("button",{className:"buy-gadget",onClick:function(){return a(e.type)}},o.a.createElement("i",{className:"icon icon-".concat(e.type),alt:"oreo logo"}),o.a.createElement("span",{className:"gadget-name"},e.type),o.a.createElement("span",{className:"gadget-cost"},l()(e.cost).format("0,0")+" oreos"),o.a.createElement("div",null,o.a.createElement("small",null,e.speed," oreo per second!")),o.a.createElement("span",{className:"gadgets-count"},e.count)))}),r=o.a.createElement("ul",{className:"automation-store"},n);return o.a.createElement("div",null,o.a.createElement("h2",{className:"oreo-font"},"Automation Gadgets!"),r)}var m=a(16),g=a.n(m);function d(){return o.a.createElement("div",{className:"logo oreo-font"},o.a.createElement("img",{src:g.a,className:"oreo-logo",alt:"oreo logo"}),o.a.createElement("span",null,"Clicker!"))}var p=a(17),f=a.n(p);function E(e){var t=e.getOreo;return o.a.createElement("div",{className:"big-biscuit",onClick:t},o.a.createElement("img",{src:f.a,className:"oreo-biscuit",alt:"oreo biscuit"}))}function v(e){var t=e.oreos;return o.a.createElement("div",{className:"oreos-counter oreo-font"},l()(t).format("0,0")," oreos!")}function y(e){var t=e.speed;return o.a.createElement("div",{className:"oreo-speed oreo-font"},"per second: ",l()(t).format("0,0.0"))}function k(e){var t=e.messages;return t.length>0&&o.a.createElement("div",{className:"notifications-center"},t.map(function(e,t){return o.a.createElement("div",{className:"message",key:t},e.text)}))}function b(e){var t=e.state,a=t.trophies;return a.length>0&&o.a.createElement("div",{className:"trophies-center"},o.a.createElement("h2",{className:"oreo-font"},"Trophies Center"),o.a.createElement("div",{className:"trophies"},a.map(function(e,a){return t[e.key]>=e.target&&o.a.createElement("div",{className:"trophy trophy-".concat(e.type),key:a,"data-hint":e.message},o.a.createElement("span",null,e.title))})))}function h(e){var t=e.state,a=t.ticks,n=t.clicks,r=t.gadgetsCount;return o.a.createElement("div",{className:"stats"},o.a.createElement("div",null,"time played: ",l()(a).format("00:00:00")),o.a.createElement("div",null,"clicks: ",l()(n).format("0,0")),o.a.createElement("div",null,"total gadgets: ",l()(r).format("0,0")))}var N=a(18),w=a.n(N);function O(e,t){return new w.a("hello-voi")[e](t)}var S=a(19),G=a(21),C=a(5);var j=function(e,t){switch(t.type){case"GET_OREO":return Object(C.a)({},e,{oreos:e.oreos+1,clicks:e.clicks+1});case"BUY_GADGET":var a=s(t.newGadgets);return Object(C.a)({},e,{oreos:e.oreos-t.totalCost,gadgetsCount:e.gadgetsCount+1,gadgets:t.newGadgets,speed:a});case"PUSH_MESSAGE":var n=function(e,t){var a=e;return a.length>=t&&a.shift(),a}(e.messages,3);return Object(C.a)({},e,{messages:[].concat(Object(G.a)(n),[t.newMessage])});case"TICK":var o=s(e.gadgets),r=function(e){var t=e;return t.length>0&&(t=t.map(function(e){return Object(C.a)({},e,{time:e.time-1})}).filter(function(e){return e.time>=0&&e})),t}(e.messages);return Object(C.a)({},e,{ticks:e.ticks+1,oreos:e.oreos+o,messages:r});case"SAVE_PROGRESS":return e.ticks%e.autoSaveTimeout===0&&function(e){var t=Object(C.a)({},e,{messages:[{type:"info",text:"Click on the big OREO biscuit to resume :)",time:0}]}),a=O("encrypt",JSON.stringify(t));window.localStorage.setItem("progrees",a)}(e),e;default:return e}function s(e){return e.reduce(function(e,t){return e+=t.speed*t.count},0)}};var R=function(){var e=Object(n.useReducer)(j,function(){if(window.localStorage.getItem("progrees")){var e=O("decrypt",window.localStorage.getItem("progrees"));return JSON.parse(e)}return null}()||S),t=Object(c.a)(e,2),a=t[0],r=t[1],s=a.oreos,i=a.speed,m=a.gadgets,g=a.messages,p=Object(n.useRef)(null);function f(){p.current=setInterval(function(){return r({type:"TICK"}),void r({type:"SAVE_PROGRESS"})},1e3)}return o.a.createElement("div",{className:"oreo-clicker"},o.a.createElement("div",{className:"oreo-bg"},o.a.createElement(n.Suspense,{fallback:o.a.createElement("div",null,"Loading Game :)")},o.a.createElement("div",{className:"biscuit-side"},o.a.createElement("div",null,o.a.createElement(d,null),o.a.createElement(E,{getOreo:function(){p.current||f(),r({type:"GET_OREO"})}}),o.a.createElement(v,{oreos:s}),o.a.createElement(y,{speed:i}))),o.a.createElement(k,{messages:g}),o.a.createElement("div",{className:"gadgets-side"},o.a.createElement(h,{state:a}),o.a.createElement(u,{buyGadget:function(e){p.current||f();var t=m.findIndex(function(t){return t.type===e}),a=m[t],n=m,o=a.cost;if(s>=o)n[t].count=a.count+1,n[t].cost=Math.ceil(o*a.inflation),r({type:"BUY_GADGET",totalCost:o,newGadgets:n});else{var c={type:"info",text:"Not enough oreos yet! you need\n        ".concat(l()(Math.ceil(o-s)).format("0,0")," more!"),time:5};r({type:"PUSH_MESSAGE",newMessage:c})}},gadgets:m}),o.a.createElement(b,{state:a})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,1,2]]]);
//# sourceMappingURL=main.8ec85c40.chunk.js.map