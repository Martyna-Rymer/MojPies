if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>i(s,r),t={module:{uri:r},exports:u,require:a};e[r]=Promise.all(l.map((s=>t[s]||a(s)))).then((s=>(n(...s),u)))}}define(["./workbox-7369c0e1"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/add_h-f72fec53.js",revision:null},{url:"assets/banner-7aaa121e.js",revision:null},{url:"assets/dogForum-944f8174.js",revision:null},{url:"assets/EventAddView-5d1e1acd.js",revision:null},{url:"assets/EventAddView-6d5c1be6.css",revision:null},{url:"assets/EventDetailsView-5493fed9.js",revision:null},{url:"assets/EventDetailsView-7e9e2e53.css",revision:null},{url:"assets/EventsMainView-6b7a2f58.css",revision:null},{url:"assets/EventsMainView-c1d29640.js",revision:null},{url:"assets/ForumMainView-0450044a.css",revision:null},{url:"assets/ForumMainView-f7dd4382.js",revision:null},{url:"assets/ForumNewThreadView-48faac6d.js",revision:null},{url:"assets/ForumNewThreadView-87aa9f3e.css",revision:null},{url:"assets/ForumSectionView-a9654b31.js",revision:null},{url:"assets/ForumSectionView-eab3a5a7.css",revision:null},{url:"assets/ForumSingleTopicView-2552ef73.js",revision:null},{url:"assets/ForumSingleTopicView-93524dc9.css",revision:null},{url:"assets/HomePage-1d30d519.js",revision:null},{url:"assets/index-3872b343.js",revision:null},{url:"assets/index-92f1652d.js",revision:null},{url:"assets/index-da0a61ed.css",revision:null},{url:"assets/marker-00ef1fab.js",revision:null},{url:"assets/NavBarComponent-020ec9fa.css",revision:null},{url:"assets/NavBarComponent-77dc73e9.js",revision:null},{url:"assets/ProfileEdit-476f0a3a.js",revision:null},{url:"assets/ProfileEdit-6617b007.css",revision:null},{url:"assets/ProfileList-2f34691f.css",revision:null},{url:"assets/ProfileList-7d4b26a3.js",revision:null},{url:"assets/ProfileView-3802f548.js",revision:null},{url:"assets/ProfileView-fdc8a8ec.css",revision:null},{url:"assets/RegisterView-f491657f.js",revision:null},{url:"assets/SignInView-2c6c0648.js",revision:null},{url:"assets/StartingPage-80247785.css",revision:null},{url:"assets/StartingPage-c65827ea.js",revision:null},{url:"index.html",revision:"3817b61053275a7840fe7c7cd542a0fe"},{url:"registerSW.js",revision:"087b47adee48a4e2f2785b45c5aa95e4"},{url:"manifest.webmanifest",revision:"12c3d751156932cd941582c970b742fe"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));