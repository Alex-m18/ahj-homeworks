!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=7)}([function(e,n,t){var r=t(1),o=t(2);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1},a=(r(o,i),o.locals?o.locals:{});e.exports=a},function(e,n,t){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),a=[];function s(e){for(var n=-1,t=0;t<a.length;t++)if(a[t].identifier===e){n=t;break}return n}function c(e,n){for(var t={},r=[],o=0;o<e.length;o++){var i=e[o],c=n.base?i[0]+n.base:i[0],l=t[c]||0,u="".concat(c," ").concat(l);t[c]=l+1;var d=s(u),f={css:i[1],media:i[2],sourceMap:i[3]};-1!==d?(a[d].references++,a[d].updater(f)):a.push({identifier:u,updater:g(f,n),references:1}),r.push(u)}return r}function l(e){var n=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=t.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){n.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(n);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var u,d=(u=[],function(e,n){return u[e]=n,u.filter(Boolean).join("\n")});function f(e,n,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=d(n,o);else{var i=document.createTextNode(o),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(i,a[n]):e.appendChild(i)}}function p(e,n,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var m=null,h=0;function g(e,n){var t,r,o;if(n.singleton){var i=h++;t=m||(m=l(n)),r=f.bind(null,t,i,!1),o=f.bind(null,t,i,!0)}else t=l(n),r=p.bind(null,t,n),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else o()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=o());var t=c(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<t.length;r++){var o=s(t[r]);a[o].references--}for(var i=c(e,n),l=0;l<t.length;l++){var u=s(t[l]);0===a[u].references&&(a[u].updater(),a.splice(u,1))}t=i}}}},function(e,n,t){var r=t(3),o=t(4),i=t(5),a=t(6);n=r(!1);var s=o(i),c=o(a);n.push([e.i,"body {\n  font-size: 16px;\n  font-weight: normal;\n  font-style: normal;\n  line-height: 1.2;\n  font-family: 'Roboto', sans-serif;\n  color: #101010;\n  text-align: left;\n  margin-left: 1.25em;\n  margin-top: 1.25em;\n}\n\n.online_report_widget {\n  position: relative;\n  display: flex;\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-end;\n  width: 30em;\n  height: auto;\n  padding: .5em .125em;\n  border: 2px OUTset silver;\n  background-color: Gainsboro;\n  border-radius: .5em;\n}\n\n.report_area {\n  display: flex;\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 28.25em;\n  height: 28.25em;\n  text-align: center;\n  margin: 1.5em auto;\n  background-color: PaleGreen;\n  border: 2px inset silver;\n  border-radius: .5em;\n  overflow: auto;\n}\n\n.report {\n  display: flex;\n  flex-flow: column nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  width: 95%;\n  height: auto;\n  text-align: center;\n  margin: 1em 0;\n}\n\n.report_time {\n  width: 12em;\n  font-size: .75em;\n  text-align: left;\n  margin-left: 4em;\n}\n\n.content {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 100%;\n  height: auto;\n  text-align: center;\n  padding: .25em 0;\n}\n\n.report_status {\n  width: 3em;\n  height: 1.5em;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center;\n  padding: .25em;\n  margin-right: .25em;\n}\n\n/* .report_status.action {\n  background-image: url(\"../img/action.svg\");\n} */\n\n.report_status.freekick {\n  background-image: url("+s+");\n}\n\n.report_status.goal {\n  background-image: url("+c+");\n}\n\n.report_content {\n  font-size: 16px;\n  font-weight: normal;\n  width: 31em;\n  height: auto;\n  text-align: left;\n  padding: .25em .125em;\n}\n",""]),e.exports=n},function(e,n,t){"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=function(e,n){var t=e[1]||"",r=e[3];if(!r)return t;if(n&&"function"==typeof btoa){var o=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[t].concat(i).concat([o]).join("\n")}var a,s,c;return[t].join("\n")}(n,e);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);r&&o[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),n.push(c))}},n}},function(e,n,t){"use strict";e.exports=function(e,n){return n||(n={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},function(e,n,t){"use strict";t.r(n),n.default=t.p+"585c850c75520b9f2f5dd35e3dbac4ef.svg"},function(e,n,t){"use strict";t.r(n),n.default=t.p+"593909e4bd32f821d4a404cf3abcb389.svg"},function(e,n,t){"use strict";t.r(n);t(0);function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.url=n,this.container=null,this.element=null,this.messagesContainer=null}var n,t,o;return n=e,(t=[{key:"init",value:function(){this.element=document.createElement("div"),this.element.classList.add("online_report_widget"),this.element.id="online_report_widget",this.container.appendChild(this.element),this.messagesContainer=document.createElement("div"),this.messagesContainer.classList.add("report_area"),this.element.appendChild(this.messagesContainer),this.eventSource=new EventSource(this.url),this.eventSource.addEventListener("message",this.onAdd.bind(this)),this.eventSource.addEventListener("open",(function(e){console.log("connected")})),this.eventSource.addEventListener("error",(function(e){console.log("error")}))}},{key:"createReport",value:function(e){var n,t,r,o,i,a,s,c,l,u=document.createElement("div");return u.classList.add("report"),u.innerHTML='\n      <div class="report_time">'.concat((n=e.date,t=new Date(n),r=function(e){return e<10?"0".concat(e):e},o=r(t.getDate()),i=r(t.getMonth()+1),a=r(t.getFullYear()%100),s=r(t.getHours()),c=r(t.getMinutes()),l=r(t.getSeconds()),"".concat(s,":").concat(c,":").concat(l,"&nbsp;&nbsp;").concat(o,".").concat(i,".").concat(a)),'</div>\n      <div class="content">\n        <div class="report_status ').concat(e.type,'"></div>\n        <div class="report_content">').concat(e.message,"</div>\n      </div>\n    "),u}},{key:"bindToDOM",value:function(e){this.container=e}},{key:"onAdd",value:function(e){var n=this.messagesContainer.scrollTop===this.messagesContainer.scrollHeight-this.messagesContainer.clientHeight;this.messagesContainer.appendChild(this.createReport(JSON.parse(e.data))),n&&(this.messagesContainer.scrollTop=this.messagesContainer.scrollHeight)}},{key:"onDeletePreview",value:function(e){this.deleteEventListeners.forEach((function(n){return n.call(null,e)}))}}])&&r(n.prototype,t),o&&r(n,o),e}(),i=new o("https://alex-m18-ahj-sse-report.herokuapp.com/sse");i.bindToDOM(document.querySelector("#online_report_widget_container")),i.init()}]);