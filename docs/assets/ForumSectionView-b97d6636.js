import{_ as B,f as D,h as M,u as C,r as S,o as l,c as m,a as t,t as _,F as N,k as V,e as x,b as h,w as g,d as v}from"./index-91de8ff9.js";import{J as k,a as F,d as b,t as $,c as K,g as I,r as R,s as T}from"./index-3872b343.js";import{N as A}from"./NavBarComponent-98dacd08.js";import{_ as J}from"./dogForum-944f8174.js";import{_ as L}from"./add_h-f72fec53.js";const P={components:{NavBarComponent:A},setup(){const p=D(),u=D([]),y=s=>{const a=new Date(s.toMillis()),r=String(a.getDate()).padStart(2,"0"),c=String(a.getMonth()+1).padStart(2,"0"),e=a.getFullYear();return`${r}.${c}.${e}`},o=async s=>{const a=await k(s);return{name:a.data().name,id:a.id}};return M(async()=>{const s=C(),a=await k(F(b,`forum/${s.params.sectionKey}`)),r=a.data(),c={id:a.id,sectionName:r.sectionName};p.value=c;const e=await $(K(b,`forum/${s.params.sectionKey}/threads`));u.value=await Promise.all(e.docs.map(async n=>{const i=n.data(),f=await o(i.authorRef);let d;return await I(R(T,`images/${s.params.userId}`)).then(w=>{d=w}).catch(w=>{d="/MojPies/profile.png"}),{id:n.id,date:i.date,...i,authorData:f,imageSrc:d}})),u.value.sort((n,i)=>{const f=new Date(n.date.toMillis()),d=new Date(i.date.toMillis());return f-d})}),{currentSection:p,threads:u,formatDate:y}}},U={class:"container",style:{"margin-bottom":"50px"}},j=t("img",{src:J,alt:"Dogs",class:"forum-image"},null,-1),E={key:0},O={class:"text-center"},Y={class:"col-9"},q=t("hr",null,null,-1),z={key:0},G={class:"card-body"},H={class:"card-text text-muted"},Q=["src"],W={class:"text-center mt-3"},X=t("img",{class:"bottom-button",src:L,width:"150"},null,-1);function Z(p,u,y,o,s,a){const r=S("router-link"),c=S("NavBarComponent");return l(),m(N,null,[t("div",U,[j,o.currentSection?(l(),m("div",E,[t("h1",O,_(o.currentSection.sectionName),1),t("div",Y,[q,o.threads?(l(),m("div",z,[(l(!0),m(N,null,V(o.threads,(e,n)=>(l(),m("div",{key:n,class:"card mb-1"},[h(r,{to:{name:"forumThread",params:{sectionKey:o.currentSection.id,threadId:e.id}},class:"card-title"},{default:g(()=>[t("div",G,[v(_(e.topic)+" ",1),t("p",H,[t("small",null,[h(r,{to:{name:"profile",params:{userId:e.authorData.id}}},{default:g(()=>[t("img",{src:e.imageSrc,class:"user-avatar rounded-circle",alt:"User avatar"},null,8,Q),v(" "+_(e.authorData.name),1)]),_:2},1032,["to"]),v(", "+_(o.formatDate(e.date)),1)])])])]),_:2},1032,["to"])]))),128))])):x("",!0)]),t("div",W,[h(r,{to:{name:"forumNewThread",params:{sectionKey:o.currentSection.id}}},{default:g(()=>[X]),_:1},8,["to"])])])):x("",!0)]),h(c)],64)}const rt=B(P,[["render",Z]]);export{rt as default};
