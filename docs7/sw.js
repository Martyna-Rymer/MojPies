if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>i(s,r),t={module:{uri:r},exports:u,require:a};e[r]=Promise.all(l.map((s=>t[s]||a(s)))).then((s=>(n(...s),u)))}}define(["./workbox-7369c0e1"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/add_h-f72fec53.js",revision:null},{url:"assets/banner-7aaa121e.js",revision:null},{url:"assets/dogForum-944f8174.js",revision:null},{url:"assets/EventAddView-144a6461.js",revision:null},{url:"assets/EventAddView-6d5c1be6.css",revision:null},{url:"assets/EventDetailsView-7e9e2e53.css",revision:null},{url:"assets/EventDetailsView-a15982dc.js",revision:null},{url:"assets/EventsMainView-537bde88.js",revision:null},{url:"assets/EventsMainView-6b7a2f58.css",revision:null},{url:"assets/ForumMainView-0450044a.css",revision:null},{url:"assets/ForumMainView-57a2281e.js",revision:null},{url:"assets/ForumNewThreadView-112e307d.js",revision:null},{url:"assets/ForumNewThreadView-87aa9f3e.css",revision:null},{url:"assets/ForumSectionView-30420b61.js",revision:null},{url:"assets/ForumSectionView-eab3a5a7.css",revision:null},{url:"assets/ForumSingleTopicView-93524dc9.css",revision:null},{url:"assets/ForumSingleTopicView-d62980c4.js",revision:null},{url:"assets/HomePage-cc5f4705.js",revision:null},{url:"assets/index-3872b343.js",revision:null},{url:"assets/index-da0a61ed.css",revision:null},{url:"assets/index-f2c3174c.js",revision:null},{url:"assets/marker-00ef1fab.js",revision:null},{url:"assets/NavBarComponent-597ec65a.js",revision:null},{url:"assets/NavBarComponent-b9527f9f.css",revision:null},{url:"assets/ProfileEdit-6617b007.css",revision:null},{url:"assets/ProfileEdit-aad2aad9.js",revision:null},{url:"assets/ProfileList-2f34691f.css",revision:null},{url:"assets/ProfileList-58c42edc.js",revision:null},{url:"assets/ProfileView-a31df0fd.js",revision:null},{url:"assets/ProfileView-fdc8a8ec.css",revision:null},{url:"assets/RegisterView-ca73421e.js",revision:null},{url:"assets/SignInView-bcc8263c.js",revision:null},{url:"assets/StartingPage-80247785.css",revision:null},{url:"assets/StartingPage-e84134e4.js",revision:null},{url:"index.html",revision:"d61588a422b50f19fe749677a8a63f68"},{url:"registerSW.js",revision:"087b47adee48a4e2f2785b45c5aa95e4"},{url:"manifest.webmanifest",revision:"12c3d751156932cd941582c970b742fe"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
