if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>i(s,r),o={module:{uri:r},exports:u,require:t};e[r]=Promise.all(l.map((s=>o[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-7369c0e1"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/add_h-f72fec53.js",revision:null},{url:"assets/banner-7aaa121e.js",revision:null},{url:"assets/dogForum-944f8174.js",revision:null},{url:"assets/EventAddView-b1bdf8f3.css",revision:null},{url:"assets/EventAddView-f13c4729.js",revision:null},{url:"assets/EventDetailsView-1fffee25.js",revision:null},{url:"assets/EventDetailsView-26c68ae2.css",revision:null},{url:"assets/EventsMainView-6b7a2f58.css",revision:null},{url:"assets/EventsMainView-fc0c41ba.js",revision:null},{url:"assets/ForumMainView-0450044a.css",revision:null},{url:"assets/ForumMainView-49274b46.js",revision:null},{url:"assets/ForumNewThreadView-87aa9f3e.css",revision:null},{url:"assets/ForumNewThreadView-d3629721.js",revision:null},{url:"assets/ForumSectionView-eab3a5a7.css",revision:null},{url:"assets/ForumSectionView-f79753e1.js",revision:null},{url:"assets/ForumSingleTopicView-93524dc9.css",revision:null},{url:"assets/ForumSingleTopicView-e2192576.js",revision:null},{url:"assets/index-181187e4.css",revision:null},{url:"assets/index-b903597e.js",revision:null},{url:"assets/index-ce0dfd1e.js",revision:null},{url:"assets/marker-00ef1fab.js",revision:null},{url:"assets/NavBarComponent-6e422590.css",revision:null},{url:"assets/NavBarComponent-db693a88.js",revision:null},{url:"assets/ProfileEdit-0bd0f337.css",revision:null},{url:"assets/ProfileEdit-27e1d60b.js",revision:null},{url:"assets/ProfileList-2f34691f.css",revision:null},{url:"assets/ProfileList-a32151b0.js",revision:null},{url:"assets/ProfileView-4633862a.js",revision:null},{url:"assets/ProfileView-b423a3ed.css",revision:null},{url:"assets/RegisterView-56b235f0.js",revision:null},{url:"assets/SignInView-fd54c0bf.js",revision:null},{url:"assets/StartingPage-80247785.css",revision:null},{url:"assets/StartingPage-f81dcbb7.js",revision:null},{url:"index.html",revision:"8c832ad3ad3e802d703e61d809b6843e"},{url:"registerSW.js",revision:"087b47adee48a4e2f2785b45c5aa95e4"},{url:"manifest.webmanifest",revision:"12c3d751156932cd941582c970b742fe"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
