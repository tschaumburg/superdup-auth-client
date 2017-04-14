var sdpAuthAuth0js=function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e,t,r){"use strict";var n=r(8);e.exports=function(e,t){if("string"!=typeof e)throw new Error("Invalid token specified");t=t||{};var r=t.header===!0?0:1;return JSON.parse(n(e.split(".")[r]))}},function(e,t){e.exports=auth},function(e,t){e.exports=sdpAuthCore},function(e,t,r){"use strict";var n=r(2),i=r(1),o=r(0),s=function(){function e(e,t){this.options=e,this.log=console,t||(t=console),this.log=t}return e.prototype.isConnected=function(){return!!this.webauth},e.prototype.connect=function(){this.webauth||(this.webauth=new i.WebAuth({clientID:this.options&&this.options.clientId,domain:this.options&&this.options.domain,audience:"https://api.superdup.dk",responseType:"token",redirectUri:this.options.redirectUri}))},e.prototype.login=function(e,t,r,n,i){var o=JSON.stringify(t),s=void 0,a="openid profile offline_access",c="code id_token";r&&(s=r.resource,a="openid profile "+r.scopes.join(" "),c="code id_token token"),this.isConnected()||this.connect();var u=this.options&&this.options.domain,d=this.options&&this.options.clientId&&this.options.clientId.substr(8);this.log.info("webauth.authorize(domain="+u+", clientID="+d+", audience="+s+", scope="+a+", state="+o+", responseType="+c+", redirectUri ="+this.options.redirectUri+")"),this.webauth.authorize({domain:this.options&&this.options.domain,clientID:this.options&&this.options.clientId,audience:s,scope:a,state:o,responseType:c,redirectUri:this.options.redirectUri,nonce:e})},e.prototype.handleRedirect=function(e,t,r,i,s){var a=this,c=n.urlparse(e).fragment;c&&0==c.indexOf("!#")&&(c=c.substr(2)),this.isConnected()||this.connect(),this.webauth.parseHash({hash:c,nonce:t,state:void 0},function(e,t){a.log.trace("callback(data="+JSON.stringify(t)+")");var n=void 0;if(e)return a.log.error("handleRedirect() returns error: "+JSON.stringify(e)),e.state&&(n=JSON.parse(e.state)),s(e,n);if(!t){var c="Auth0.WebAuth.parseHash() returned neither error nor data";return a.log.error("handleRedirect(): "+c),s(c,n)}if(n=JSON.parse(t.state),r&&!t.accessToken){var c='Auth0.WebAuth.parseHash() did not return the requested access token "'+r+'"';return a.log.error("handleRedirect(): "+c),s(c,n)}if(t.idToken){var u=o(t.idToken);if(!u){var c="idtoken "+t.idToken+"could not be decoded";return a.log.error("handleRedirect(): "+c),s(c,n)}return a.log.info("handleRedirect(): idtoken "+JSON.stringify(u)),i(a.mapUser(t.idToken,u),t.accessToken,n)}t.accessToken&&(a.log.debug("handleRedirect(): calls webauth.client.userInfo()"),a.webauth.client.userInfo(t.accessToken,function(e,r){if(e){var o="userInfo() returned error "+JSON.stringify(e);return a.log.error("handleRedirect(): "+o),s(e,n)}if(!r){var o="userInfo() returned neither result nor error";return a.log.error("handleRedirect(): "+o),s("No user returned",n)}return a.log.debug("userInfo() returns "+JSON.stringify(r)),i(a.mapUser(t.idToken,r),t.accessToken,n)}));var c="Auth0.WebAuth.parseHash() returned neither idtoken nor accesstoken";return a.log.error("handleRedirect(): "+c),s(c,n)})},e.prototype.mapUser=function(e,t){return t?{uid:t.sub,handle:t.nickname||t.given_name||t.name||t.family_name||t.email||t.sub,givenName:t.given_name,familyName:t.family_name,picture:t.picture,idtoken:e,idtokenClaims:t}:null},e.prototype.acquireAccessToken=function(e,t,r,n){n("IImplicitProvider flow does not support acquisition of additional access tokens")},e}();t.Auth0Hybrid=s},function(e,t,r){"use strict";var n=r(2),i=r(1),o=r(0),s=function(){function e(e,t){this.options=e,this.log=console,t||(t=console),this.log=t}return e.prototype.isConnected=function(){return!!this.webauth},e.prototype.connect=function(){this.webauth||(this.webauth=new i.WebAuth({clientID:this.options&&this.options.clientId,domain:this.options&&this.options.domain,audience:"https://api.superdup.dk",responseType:"token",redirectUri:this.options.redirectUri}))},e.prototype.login=function(e,t,r,n,i){var o=JSON.stringify(t),s=void 0,a="openid profile",c="id_token";r&&(s=r.resource,a="openid profile "+r.scopes.join(" "),c="id_token token"),this.isConnected()||this.connect();var u=this.options&&this.options.domain,d=this.options&&this.options.clientId&&this.options.clientId.substr(8);this.log.info("webauth.authorize(domain="+u+", clientID="+d+", audience="+s+", scope="+a+", state="+o+", responseType="+c+", redirectUri ="+this.options.redirectUri+")"),this.webauth.authorize({domain:this.options&&this.options.domain,clientID:this.options&&this.options.clientId,audience:s,scope:a,state:o,responseType:c,redirectUri:this.options.redirectUri,nonce:e})},e.prototype.handleRedirect=function(e,t,r,i,s){var a=this,c=n.urlparse(e).fragment;c&&0==c.indexOf("!#")&&(c=c.substr(2)),this.isConnected()||this.connect(),this.webauth.parseHash({hash:c,nonce:t,state:void 0},function(e,t){var n=void 0;if(e)return a.log.error("handleRedirect() returns error: "+JSON.stringify(e)),e.state&&(n=JSON.parse(e.state)),s(e,n);if(!t){var c="Auth0.WebAuth.parseHash() returned neither error nor data";return a.log.error("handleRedirect(): "+c),s(c,n)}if(n=JSON.parse(t.state),r&&!t.accessToken){var c='Auth0.WebAuth.parseHash() did not return the requested access token "'+r+'"';return a.log.error("handleRedirect(): "+c),s(c,n)}if(t.idToken){var u=o(t.idToken);if(!u){var c="idtoken "+t.idToken+"could not be decoded";return a.log.error("handleRedirect(): "+c),s(c,n)}return a.log.info("handleRedirect(): idtoken "+JSON.stringify(u)),i(a.mapUser(t.idToken,u),t.accessToken,n)}t.accessToken&&(a.log.debug("handleRedirect(): calls webauth.client.userInfo()"),a.webauth.client.userInfo(t.accessToken,function(e,r){if(e){var o="userInfo() returned error "+JSON.stringify(e);return a.log.error("handleRedirect(): "+o),s(e,n)}if(!r){var o="userInfo() returned neither result nor error";return a.log.error("handleRedirect(): "+o),s("No user returned",n)}return a.log.debug("userInfo() returns "+JSON.stringify(r)),i(a.mapUser(t.idToken,r),t.accessToken,n)}));var c="Auth0.WebAuth.parseHash() returned neither idtoken nor accesstoken";return a.log.error("handleRedirect(): "+c),s(c,n)})},e.prototype.mapUser=function(e,t){return t?{uid:t.sub,handle:t.nickname||t.given_name||t.name||t.family_name||t.email||t.sub,givenName:t.given_name,familyName:t.family_name,picture:t.picture,idtoken:e,idtokenClaims:t}:null},e}();t.Auth0Implicit=s},function(e,t,r){"use strict";!function(e){e[e.implicit=0]="implicit",e[e.authCode=1]="authCode"}(t.AuthFlow||(t.AuthFlow={}))},function(e,t,r){"use strict";var n=r(5);t.AuthFlow=n.AuthFlow;var i=r(4);t.Auth0Implicit=i.Auth0Implicit;var o=r(3);t.Auth0Hybrid=o.Auth0Hybrid},function(e,t){function r(e){this.message=e}function n(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new r("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,s=0,a=0,c="";o=t.charAt(a++);~o&&(n=s%4?64*n+o:o,s++%4)?c+=String.fromCharCode(255&n>>(-2*s&6)):0)o=i.indexOf(o);return c}var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.name="InvalidCharacterError",e.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||n},function(e,t,r){function n(e){return decodeURIComponent(i(e).replace(/(.)/g,function(e,t){var r=t.charCodeAt(0).toString(16).toUpperCase();return r.length<2&&(r="0"+r),"%"+r}))}var i=r(7);e.exports=function(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return n(t)}catch(e){return i(t)}}}]);