if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const f=e=>i(e,t),o={module:{uri:t},exports:l,require:f};s[t]=Promise.all(n.map((e=>o[e]||f(e)))).then((e=>(r(...e),l)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/AuthorsView-dd0bee8a.js",revision:null},{url:"assets/index-8109f097.js",revision:null},{url:"assets/index-cb63ff25.css",revision:null},{url:"assets/MapView-6deaf640.js",revision:null},{url:"assets/MapView-f16f8af2.css",revision:null},{url:"assets/SOSView-3ffe6e59.js",revision:null},{url:"index.html",revision:"8fa5061aee622fb190eb3d7ff801efdf"},{url:"registerSW.js",revision:"2398d363ff58ba6bee62a75656ad5e39"},{url:"manifest.webmanifest",revision:"0aa8f28d151c3ca20a4e1f9465044985"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
