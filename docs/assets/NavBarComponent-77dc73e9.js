import{e as l}from"./index-3872b343.js";import{_ as r,f as _,r as d,o as p,c as u,a as s,b as a,w as n,p as m,m as v}from"./index-92f1652d.js";const h="/MojPies/assets/profil_w-b004f1e7.png",f="/MojPies/assets/users_w-af7b6579.png",k="/MojPies/assets/forum_w-02c82d06.png",b="/MojPies/assets/calendar_w-e52ab8b5.png";const g={setup(){const e=_(null),c=l.currentUser;return c&&(e.value=c.uid),console.log(e.value),{currentUserId:e}}},t=e=>(m("data-v-a5d35c2a"),e=e(),v(),e),y={class:"navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark"},w={class:"justify-content-center",id:"navbarNav"},x=t(()=>s("img",{class:"mobile-only",src:h,width:"50",height:"50"},null,-1)),I=t(()=>s("span",{class:"desktop-only"},"Profil",-1)),N=t(()=>s("img",{class:"mobile-only",src:f,width:"50",height:"50"},null,-1)),j=t(()=>s("span",{class:"desktop-only"},"Użytkownicy",-1)),B=t(()=>s("img",{class:"mobile-only",src:k,width:"50",height:"50"},null,-1)),P=t(()=>s("span",{class:"desktop-only"},"Forum",-1)),C=t(()=>s("img",{class:"mobile-only",src:b,width:"50",height:"50"},null,-1)),M=t(()=>s("span",{class:"desktop-only"},"Wydarzenia",-1));function U(e,c,S,i,$,V){const o=d("router-link");return p(),u("nav",y,[s("div",w,[a(o,{to:{name:"profile",params:{userId:i.currentUserId}},class:"nav-link","active-class":"active-link"},{default:n(()=>[x,I]),_:1},8,["to"]),a(o,{to:"/profiles",class:"nav-link","active-class":"active-link"},{default:n(()=>[N,j]),_:1}),a(o,{to:"/forum",class:"nav-link","active-class":"active-link"},{default:n(()=>[B,P]),_:1}),a(o,{to:"/events",class:"nav-link","active-class":"active-link"},{default:n(()=>[C,M]),_:1})])])}const F=r(g,[["render",U],["__scopeId","data-v-a5d35c2a"]]);export{F as N};
