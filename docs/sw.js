if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>i(s,r),t={module:{uri:r},exports:u,require:a};e[r]=Promise.all(l.map((s=>t[s]||a(s)))).then((s=>(n(...s),u)))}}define(["./workbox-7369c0e1"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/add_h-f72fec53.js",revision:null},{url:"assets/banner-7aaa121e.js",revision:null},{url:"assets/dogForum-944f8174.js",revision:null},{url:"assets/EventAddView-6d5c1be6.css",revision:null},{url:"assets/EventAddView-da7d5ec4.js",revision:null},{url:"assets/EventDetailsView-7e9e2e53.css",revision:null},{url:"assets/EventDetailsView-a97d8226.js",revision:null},{url:"assets/EventsMainView-6b7a2f58.css",revision:null},{url:"assets/EventsMainView-be0e9f90.js",revision:null},{url:"assets/ForumMainView-0450044a.css",revision:null},{url:"assets/ForumMainView-bdeb11a7.js",revision:null},{url:"assets/ForumNewThreadView-124f1a77.js",revision:null},{url:"assets/ForumNewThreadView-2d6eedbb.css",revision:null},{url:"assets/ForumSectionView-51172559.js",revision:null},{url:"assets/ForumSectionView-eab3a5a7.css",revision:null},{url:"assets/ForumSingleTopicView-93524dc9.css",revision:null},{url:"assets/ForumSingleTopicView-dc1b9fda.js",revision:null},{url:"assets/HomePage-66bf64df.js",revision:null},{url:"assets/index-3872b343.js",revision:null},{url:"assets/index-a9f1a630.js",revision:null},{url:"assets/index-da0a61ed.css",revision:null},{url:"assets/marker-00ef1fab.js",revision:null},{url:"assets/NavBarComponent-020ec9fa.css",revision:null},{url:"assets/NavBarComponent-6c623fb1.js",revision:null},{url:"assets/ProfileEdit-214e599b.js",revision:null},{url:"assets/ProfileEdit-58fbaa8a.css",revision:null},{url:"assets/ProfileList-2f34691f.css",revision:null},{url:"assets/ProfileList-8db599dd.js",revision:null},{url:"assets/ProfileView-4e010d88.js",revision:null},{url:"assets/ProfileView-6cf39273.css",revision:null},{url:"assets/RegisterView-736ebbcc.js",revision:null},{url:"assets/SignInView-07e592be.js",revision:null},{url:"assets/StartingPage-80247785.css",revision:null},{url:"assets/StartingPage-fd7eb73a.js",revision:null},{url:"index.html",revision:"8f00dbc444732449060aa827effff43e"},{url:"registerSW.js",revision:"087b47adee48a4e2f2785b45c5aa95e4"},{url:"manifest.webmanifest",revision:"12c3d751156932cd941582c970b742fe"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
