(function(c){var g=[].slice,i={};c.amplify={publish:function(e){var c=g.call(arguments,1),f,a,h,n=0;if(!i[e])return!0;f=i[e].slice();for(h=f.length;n<h;n++)if(a=f[n],a=a.callback.apply(a.context,c),a===!1)break;return a!==!1},subscribe:function(e,c,f,a){arguments.length===3&&typeof f==="number"&&(a=f,f=c,c=null);arguments.length===2&&(f=c,c=null);for(var a=a||10,h=0,n=e.split(/\s/),d=n.length,b;h<d;h++){e=n[h];b=!1;i[e]||(i[e]=[]);for(var k=i[e].length-1,m={callback:f,context:c,priority:a};k>=0;k--)if(i[e][k].priority<=
a){i[e].splice(k+1,0,m);b=!0;break}b||i[e].unshift(m)}return f},unsubscribe:function(e,c){if(i[e])for(var f=i[e].length,a=0;a<f;a++)if(i[e][a].callback===c){i[e].splice(a,1);break}}}})(this);
(function(c,g){function i(a,d){e.addType(a,function(b,k,c){var h,f=k,o=(new Date).getTime();if(!b){f={};c=[];k=0;try{for(b=d.length;b=d.key(k++);)if(j.test(b))h=JSON.parse(d.getItem(b)),h.expires&&h.expires<=o?c.push(b):f[b.replace(j,"")]=h.data;for(;b=c.pop();)d.removeItem(b)}catch(p){}return f}b="__amplify__"+b;if(k===g)if(h=(h=d.getItem(b))?JSON.parse(h):{expires:-1},h.expires&&h.expires<=o)d.removeItem(b);else return h.data;else if(k===null)d.removeItem(b);else{h=JSON.stringify({data:k,expires:c.expires?
o+c.expires:null});try{d.setItem(b,h)}catch(i){e[a]();try{d.setItem(b,h)}catch(r){throw e.error();}}}return f})}var e=c.store=function(a,d,b,c){c=e.type;if(b&&b.type&&b.type in e.types)c=b.type;return e.types[c](a,d,b||{})};e.types={};e.type=null;e.addType=function(a,d){if(!e.type)e.type=a;e.types[a]=d;e[a]=function(b,d,c){c=c||{};c.type=a;return e(b,d,c)}};e.error=function(){return"amplify.store quota exceeded"};var j=/^__amplify__/,f;for(f in{localStorage:1,sessionStorage:1})try{window[f].getItem&&
i(f,window[f])}catch(a){}if(window.globalStorage)try{if(i("globalStorage",window.globalStorage[window.location.hostname]),e.type==="sessionStorage")e.type="globalStorage"}catch(h){}(function(){if(!e.types.localStorage){var a=document.createElement("div");a.style.display="none";document.getElementsByTagName("head")[0].appendChild(a);try{a.addBehavior("#default#userdata"),a.load("amplify")}catch(d){a.parentNode.removeChild(a);return}e.addType("userData",function(b,d,c){a.load("amplify");var h,f,o=d,
p=(new Date).getTime();if(!b){o={};f=[];for(b=0;d=a.XMLDocument.documentElement.attributes[b++];)h=JSON.parse(d.value),h.expires&&h.expires<=p?f.push(d.name):o[d.name]=h.data;for(;b=f.pop();)a.removeAttribute(b);a.save("amplify");return o}b=b.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,"-");if(d===g)if(h=(d=a.getAttribute(b))?JSON.parse(d):{expires:-1},h.expires&&h.expires<=p)a.removeAttribute(b);else return h.data;else d===null?a.removeAttribute(b):
(f=a.getAttribute(b),h=JSON.stringify({data:d,expires:c.expires?p+c.expires:null}),a.setAttribute(b,h));try{a.save("amplify")}catch(i){f===null?a.removeAttribute(b):a.setAttribute(b,f);e.userData();try{a.setAttribute(b,h),a.save("amplify")}catch(j){throw f===null?a.removeAttribute(b):a.setAttribute(b,f),e.error();}}return o})}})();(function(){var a={},d={};e.addType("memory",function(b,c,h){if(!b)return a===g?g:JSON.parse(JSON.stringify(a));if(c===g)return a[b]===g?g:JSON.parse(JSON.stringify(a[b]));
d[b]&&(clearTimeout(d[b]),delete d[b]);if(c===null)return delete a[b],null;a[b]=c;h.expires&&(d[b]=setTimeout(function(){delete a[b];delete d[b]},h.expires));return c})})()})(this.amplify=this.amplify||{});
(function(c){function g(){}function i(c){var g=!1;setTimeout(function(){g=!0},1);return function(){var f=this,a=arguments;g?c.apply(f,a):setTimeout(function(){c.apply(f,a)},1)}}c.request=function(e,j,f){var a=e||{};typeof a==="string"&&({}.toString.call(j)==="[object Function]"&&(f=j,j={}),a={resourceId:e,data:j||{},success:f});var e={abort:g},j=c.request.resources[a.resourceId],h=a.success||g,n=a.error||g;a.success=i(function(d,b){b=b||"success";c.publish("request.success",a,d,b);c.publish("request.complete",
a,d,b);h(d,b)});a.error=i(function(d,b){b=b||"error";c.publish("request.error",a,d,b);c.publish("request.complete",a,d,b);n(d,b)});if(!j){if(!a.resourceId)throw"amplify.request: no resourceId provided";throw"amplify.request: unknown resourceId: "+a.resourceId;}if(c.publish("request.before",a))return c.request.resources[a.resourceId](a,e),e;else a.error(null,"abort")};c.request.types={};c.request.resources={};c.request.define=function(e,g,f){if(typeof g==="string"){if(!(g in c.request.types))throw"amplify.request.define: unknown type: "+
g;f.resourceId=e;c.request.resources[e]=c.request.types[g](f)}else c.request.resources[e]=g}})(amplify);
(function(c,g,i){var e=["status","statusText","responseText","responseXML","readyState"],j=/\{([^\}]+)\}/g;c.request.types.ajax=function(a){a=g.extend({type:"GET"},a);return function(h,f){function d(a,c){g.each(e,function(a,c){try{l[c]=b[c]}catch(d){}});if(/OK$/.test(l.statusText))l.statusText="success";a===i&&(a=null);j&&(c="abort");/timeout|error|abort/.test(c)?l.error(a,c):l.success(a,c);d=g.noop}var b,k=f.abort,m=g.extend(!0,{},a,{data:h.data}),j=!1,l={readyState:0,setRequestHeader:function(a,
c){return b.setRequestHeader(a,c)},getAllResponseHeaders:function(){return b.getAllResponseHeaders()},getResponseHeader:function(a){return b.getResponseHeader(a)},overrideMimeType:function(a){return b.overrideMideType(a)},abort:function(){j=!0;try{b.abort()}catch(a){}d(null,"abort")},success:function(a,b){h.success(a,b)},error:function(a,b){h.error(a,b)}};c.publish("request.ajax.preprocess",a,h,m,l);g.extend(m,{success:function(a,b){d(a,b)},error:function(a,b){d(null,b)},beforeSend:function(d,e){b=
d;m=e;return(a.beforeSend?a.beforeSend.call(this,l,m):!0)&&c.publish("request.before.ajax",a,h,m,l)}});g.ajax(m);f.abort=function(){l.abort();k.call(this)}}};c.subscribe("request.ajax.preprocess",function(a,c,e){var d=[],b=e.data;if(typeof b!=="string")b=g.extend(!0,{},a.data,b),e.url=e.url.replace(j,function(a,c){if(c in b)return d.push(c),b[c]}),g.each(d,function(a,c){delete b[c]}),e.data=b});c.subscribe("request.ajax.preprocess",function(a,c,e){var d=e.data;if((c=a.dataMap)&&typeof d!=="string")g.isFunction(c)?
e.data=c(d):(g.each(a.dataMap,function(a,c){a in d&&(d[c]=d[a],delete d[a])}),e.data=d)});var f=c.request.cache={_key:function(a,c,e){function d(){return e.charCodeAt(b++)<<24|e.charCodeAt(b++)<<16|e.charCodeAt(b++)<<8|e.charCodeAt(b++)<<0}for(var e=c+e,c=e.length,b=0,f=d();b<c;)f^=d();return"request-"+a+"-"+f},_default:function(){var a={};return function(c,e,d,b){var g=f._key(e.resourceId,d.url,d.data),i=c.cache;if(g in a)return b.success(a[g]),!1;var j=b.success;b.success=function(b){a[g]=b;typeof i===
"number"&&setTimeout(function(){delete a[g]},i);j.apply(this,arguments)}}}()};if(c.store)g.each(c.store.types,function(a){f[a]=function(e,g,d,b){var i=f._key(g.resourceId,d.url,d.data);if(g=c.store[a](i))return d.success(g),!1;var j=b.success;b.success=function(b){c.store[a](i,b,{expires:e.cache.expires});j.apply(this,arguments)}}}),f.persist=f[c.store.type];c.subscribe("request.before.ajax",function(a){var c=a.cache;if(c)return c=c.type||c,f[c in f?c:"_default"].apply(this,arguments)});c.request.decoders=
{jsend:function(a,c,e,d,b){a.status==="success"?d(a.data):a.status==="fail"?b(a.data,"fail"):a.status==="error"&&(delete a.status,b(a,"error"))}};c.subscribe("request.before.ajax",function(a,e,f,d){function b(a,b){j(a,b)}function i(a,b){q(a,b)}var j=d.success,q=d.error,l=g.isFunction(a.decoder)?a.decoder:a.decoder in c.request.decoders?c.request.decoders[a.decoder]:c.request.decoders._default;if(l)d.success=function(a,c){l(a,c,d,b,i)},d.error=function(a,c){l(a,c,d,b,i)}})})(amplify,jQuery);