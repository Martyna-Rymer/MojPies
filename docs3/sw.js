if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>i(s,r),t={module:{uri:r},exports:u,require:a};e[r]=Promise.all(l.map((s=>t[s]||a(s)))).then((s=>(n(...s),u)))}}define(["./workbox-7369c0e1"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/add_h-f72fec53.js",revision:null},{url:"assets/banner-7aaa121e.js",revision:null},{url:"assets/dogForum-944f8174.js",revision:null},{url:"assets/EventAddView-39ead9e1.js",revision:null},{url:"assets/EventAddView-6d5c1be6.css",revision:null},{url:"assets/EventDetailsView-7e9e2e53.css",revision:null},{url:"assets/EventDetailsView-fdbc9718.js",revision:null},{url:"assets/EventsMainView-6b7a2f58.css",revision:null},{url:"assets/EventsMainView-dad3ad19.js",revision:null},{url:"assets/ForumMainView-0450044a.css",revision:null},{url:"assets/ForumMainView-19ef7e7d.js",revision:null},{url:"assets/ForumNewThreadView-7bb560ae.js",revision:null},{url:"assets/ForumNewThreadView-d44e86e2.css",revision:null},{url:"assets/ForumSectionView-18342c35.js",revision:null},{url:"assets/ForumSectionView-eab3a5a7.css",revision:null},{url:"assets/ForumSingleTopicView-054536ee.js",revision:null},{url:"assets/ForumSingleTopicView-93524dc9.css",revision:null},{url:"assets/HomePage-0a68c1a8.js",revision:null},{url:"assets/index-3872b343.js",revision:null},{url:"assets/index-da0a61ed.css",revision:null},{url:"assets/index-f364440e.js",revision:null},{url:"assets/marker-00ef1fab.js",revision:null},{url:"assets/NavBarComponent-020ec9fa.css",revision:null},{url:"assets/NavBarComponent-a994f905.js",revision:null},{url:"assets/ProfileEdit-2a9c54d8.css",revision:null},{url:"assets/ProfileEdit-6fcaab97.js",revision:null},{url:"assets/ProfileList-2f34691f.css",revision:null},{url:"assets/ProfileList-a7e9bb4c.js",revision:null},{url:"assets/ProfileView-19ca3be8.css",revision:null},{url:"assets/ProfileView-dc6eb71d.js",revision:null},{url:"assets/RegisterView-7330c83f.js",revision:null},{url:"assets/SignInView-2bdb0047.js",revision:null},{url:"assets/StartingPage-80247785.css",revision:null},{url:"assets/StartingPage-d4e4db96.js",revision:null},{url:"index.html",revision:"5117db8eb890236b81783b6235eb8fdf"},{url:"registerSW.js",revision:"087b47adee48a4e2f2785b45c5aa95e4"},{url:"manifest.webmanifest",revision:"12c3d751156932cd941582c970b742fe"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
