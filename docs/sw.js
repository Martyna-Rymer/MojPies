if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>i(s,r),t={module:{uri:r},exports:u,require:a};e[r]=Promise.all(l.map((s=>t[s]||a(s)))).then((s=>(n(...s),u)))}}define(["./workbox-7369c0e1"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/add_h-f72fec53.js",revision:null},{url:"assets/banner-7aaa121e.js",revision:null},{url:"assets/dogForum-944f8174.js",revision:null},{url:"assets/EventAddView-6d5c1be6.css",revision:null},{url:"assets/EventAddView-cf063787.js",revision:null},{url:"assets/EventDetailsView-6c2afab5.js",revision:null},{url:"assets/EventDetailsView-7e9e2e53.css",revision:null},{url:"assets/EventsMainView-4e0c1ce3.js",revision:null},{url:"assets/EventsMainView-6b7a2f58.css",revision:null},{url:"assets/ForumMainView-0450044a.css",revision:null},{url:"assets/ForumMainView-6d9ed25e.js",revision:null},{url:"assets/ForumNewThreadView-6e6f0c0a.js",revision:null},{url:"assets/ForumNewThreadView-87aa9f3e.css",revision:null},{url:"assets/ForumSectionView-019df8e6.js",revision:null},{url:"assets/ForumSectionView-eab3a5a7.css",revision:null},{url:"assets/ForumSingleTopicView-93524dc9.css",revision:null},{url:"assets/ForumSingleTopicView-ce3beae0.js",revision:null},{url:"assets/HomePage-01cf4c1c.js",revision:null},{url:"assets/index-3872b343.js",revision:null},{url:"assets/index-5ede7e1b.js",revision:null},{url:"assets/index-da0a61ed.css",revision:null},{url:"assets/marker-00ef1fab.js",revision:null},{url:"assets/NavBarComponent-886bb92a.js",revision:null},{url:"assets/NavBarComponent-b9527f9f.css",revision:null},{url:"assets/ProfileEdit-6617b007.css",revision:null},{url:"assets/ProfileEdit-8720b61a.js",revision:null},{url:"assets/ProfileList-2f34691f.css",revision:null},{url:"assets/ProfileList-8a786fe0.js",revision:null},{url:"assets/ProfileView-8ada8e79.js",revision:null},{url:"assets/ProfileView-fdc8a8ec.css",revision:null},{url:"assets/RegisterView-4b04399f.js",revision:null},{url:"assets/SignInView-be9a40ae.js",revision:null},{url:"assets/StartingPage-14e4f914.js",revision:null},{url:"assets/StartingPage-80247785.css",revision:null},{url:"index.html",revision:"1ef85b91e9d598e702f2eb4960d27c6d"},{url:"registerSW.js",revision:"087b47adee48a4e2f2785b45c5aa95e4"},{url:"manifest.webmanifest",revision:"12c3d751156932cd941582c970b742fe"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
