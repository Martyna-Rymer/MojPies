if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>i(s,r),o={module:{uri:r},exports:u,require:t};e[r]=Promise.all(l.map((s=>o[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-7369c0e1"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/add_h-f72fec53.js",revision:null},{url:"assets/banner-7aaa121e.js",revision:null},{url:"assets/dogForum-944f8174.js",revision:null},{url:"assets/EventAddView-b1bdf8f3.css",revision:null},{url:"assets/EventAddView-e3d02584.js",revision:null},{url:"assets/EventDetailsView-26c68ae2.css",revision:null},{url:"assets/EventDetailsView-792c42bd.js",revision:null},{url:"assets/EventsMainView-6b7a2f58.css",revision:null},{url:"assets/EventsMainView-d7530154.js",revision:null},{url:"assets/ForumMainView-d0605aa3.js",revision:null},{url:"assets/ForumMainView-e73d54fc.css",revision:null},{url:"assets/ForumNewThreadView-48c38390.js",revision:null},{url:"assets/ForumNewThreadView-94913a5f.css",revision:null},{url:"assets/ForumSectionView-80163546.css",revision:null},{url:"assets/ForumSectionView-a138eeda.js",revision:null},{url:"assets/ForumSingleTopicView-7206c2e9.js",revision:null},{url:"assets/ForumSingleTopicView-93524dc9.css",revision:null},{url:"assets/index-21a15a29.css",revision:null},{url:"assets/index-ce0dfd1e.js",revision:null},{url:"assets/index-dcd09675.js",revision:null},{url:"assets/marker-00ef1fab.js",revision:null},{url:"assets/NavBarComponent-6e422590.css",revision:null},{url:"assets/NavBarComponent-82bb9565.js",revision:null},{url:"assets/ProfileEdit-c4ca777a.js",revision:null},{url:"assets/ProfileEdit-ce13e3f7.css",revision:null},{url:"assets/ProfileList-16fa59c2.js",revision:null},{url:"assets/ProfileList-f1f4a8cd.css",revision:null},{url:"assets/ProfileView-25b168c2.css",revision:null},{url:"assets/ProfileView-8a6877e5.js",revision:null},{url:"assets/RegisterView-5bb55477.js",revision:null},{url:"assets/SignInView-36235c34.js",revision:null},{url:"assets/StartingPage-35079f33.js",revision:null},{url:"assets/StartingPage-80247785.css",revision:null},{url:"index.html",revision:"99e713d5dcc1271fb9f6e8ec93429889"},{url:"registerSW.js",revision:"087b47adee48a4e2f2785b45c5aa95e4"},{url:"manifest.webmanifest",revision:"12c3d751156932cd941582c970b742fe"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
