import{t as y,c as x,g as w,r as b,s as k,d as B}from"./index-3872b343.js";import{N}from"./NavBarComponent-6db4835d.js";import{_ as C,f as L,h as S,r as f,o as n,c,a as t,F as p,k as g,b as h,w as $,t as a,d as D}from"./index-7841c202.js";const F={components:{NavBarComponent:N},setup(){const _=L([]),u=i=>new Date().getFullYear()-i;return S(async()=>{const i=await y(x(B,"users")),o=[];for(const d of i.docs){const l=d.data(),m=l.dogs.map(e=>{const v=u(e.yearOfBirth);return{name:e.name,race:e.race,age:v}});let r;await w(b(k,`images/${d.id}`)).then(e=>{r=e}).catch(e=>{r="/MojPies/profile.png"});const s={id:d.id,name:l.name,city:l.city,dogs:m,imageSrc:r};o.push(s)}_.value=o}),{users:_}}},P={class:"container",style:{"margin-bottom":"50px"}},U={class:"row"},V={class:"card shadow rounded"},M={class:"d-flex flex-row"},j=["src"],q={class:"card-body"},A={class:"card-title"},E={class:"card-text"};function I(_,u,i,o,d,l){const m=f("router-link"),r=f("NavBarComponent");return n(),c(p,null,[t("div",P,[t("div",U,[(n(!0),c(p,null,g(o.users,s=>(n(),c("div",{class:"col-md-3 mb-3",key:s.id},[h(m,{to:{name:"profile",params:{userId:s.id}}},{default:$(()=>[t("div",V,[t("div",M,[t("img",{src:s.imageSrc,class:"card-img-top user-avatar rounded-circle mb-3",alt:"User avatar"},null,8,j),t("div",q,[t("h5",A,a(s.name)+", "+a(s.city),1),(n(!0),c(p,null,g(s.dogs,e=>(n(),c("div",{key:e.id},[t("p",E,[t("strong",null,a(e.name),1),D(" "+a(e.race)+", "+a(e.age)+a(e.age<=1?" r.":" l."),1)])]))),128))])])])]),_:2},1032,["to"])]))),128))])]),h(r)],64)}const Y=C(F,[["render",I]]);export{Y as default};
