if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>i(s,r),o={module:{uri:r},exports:u,require:t};e[r]=Promise.all(l.map((s=>o[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-7369c0e1"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/add_h-f72fec53.js",revision:null},{url:"assets/banner-7aaa121e.js",revision:null},{url:"assets/dogForum-944f8174.js",revision:null},{url:"assets/EventAddView-6d5c1be6.css",revision:null},{url:"assets/EventAddView-c222f76e.js",revision:null},{url:"assets/EventDetailsView-7e9e2e53.css",revision:null},{url:"assets/EventDetailsView-914ab10e.js",revision:null},{url:"assets/EventsMainView-6b7a2f58.css",revision:null},{url:"assets/EventsMainView-93b848cf.js",revision:null},{url:"assets/ForumMainView-0450044a.css",revision:null},{url:"assets/ForumMainView-6b196272.js",revision:null},{url:"assets/ForumNewThreadView-2ff45635.js",revision:null},{url:"assets/ForumNewThreadView-87aa9f3e.css",revision:null},{url:"assets/ForumSectionView-7deb1eb2.js",revision:null},{url:"assets/ForumSectionView-eab3a5a7.css",revision:null},{url:"assets/ForumSingleTopicView-8463d173.js",revision:null},{url:"assets/ForumSingleTopicView-93524dc9.css",revision:null},{url:"assets/HomePage-72177af2.js",revision:null},{url:"assets/index-3872b343.js",revision:null},{url:"assets/index-8f14c6fc.js",revision:null},{url:"assets/index-da0a61ed.css",revision:null},{url:"assets/marker-00ef1fab.js",revision:null},{url:"assets/NavBarComponent-6e422590.css",revision:null},{url:"assets/NavBarComponent-ce635d1c.js",revision:null},{url:"assets/ProfileEdit-652442cf.js",revision:null},{url:"assets/ProfileEdit-6617b007.css",revision:null},{url:"assets/ProfileList-2f34691f.css",revision:null},{url:"assets/ProfileList-ffd3d26a.js",revision:null},{url:"assets/ProfileView-6a1e677c.js",revision:null},{url:"assets/ProfileView-fdc8a8ec.css",revision:null},{url:"assets/RegisterView-98b661ae.js",revision:null},{url:"assets/SignInView-e55ce90f.js",revision:null},{url:"assets/StartingPage-04212b34.js",revision:null},{url:"assets/StartingPage-80247785.css",revision:null},{url:"index.html",revision:"937b6f2d37b880a1db2c864a3bf10940"},{url:"registerSW.js",revision:"087b47adee48a4e2f2785b45c5aa95e4"},{url:"manifest.webmanifest",revision:"12c3d751156932cd941582c970b742fe"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
