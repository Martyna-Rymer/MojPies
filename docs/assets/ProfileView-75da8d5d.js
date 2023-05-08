import{_ as L,f as m,h as x,u as D,n as E,r as I,o as a,c as s,a as e,b,w as y,e as c,t as o,F as p,k as h,d as B,p as S,m as G}from"./index-daa97122.js";import{J as j,a as J,d as M,g as Q,r as X,s as R,e as _}from"./index-3872b343.js";import{N as U}from"./NavBarComponent-ee27e566.js";const Y="data:image/png;base64,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";const N={components:{NavBarComponent:U},setup(){const r=m(),u=m(),g=m(),t=m(),v=n=>new Date().getFullYear()-n;x(async()=>{const n=D(),d=await j(J(M,`users/${n.params.userId}`)),A=d.data(),C=A.dogs.map(i=>{const w=v(i.yearOfBirth);return{name:i.name,race:i.race,age:w}}),k={id:d.id,userName:A.name,description:A.description,city:A.city,dogs:C,avatarUrl:A.avatarUrl,favourites:A.favourites};r.value=k,await Q(X(R,`images/${n.params.userId}`)).then(i=>{t.value=i}).catch(i=>{t.value="/MojPies/profile.png"}),_.currentUser&&(u.value=n.params.userId==_.currentUser.uid,g.value=_.currentUser.uid)});const f=E(()=>u.value);return{profileData:r,showEditButton:f,userId:g,imageSrc:t}}},l=r=>(S("data-v-7367498a"),r=r(),G(),r),P={class:"container ml-2 me-2",style:{"margin-bottom":"70px"}},Z={key:0},F={key:0,class:"d-flex flex-row-reverse mb-3"},V=l(()=>e("button",{class:"button1"},"Edytuj",-1)),K={class:"row justify-content-center"},z={class:"text-center"},T=["src"],W={class:"col-md-9 text-center"},H={class:"row justify-content-start text-left"},O={key:0},q=l(()=>e("p",{class:"small text-muted mt-4 mb-1"},"Miasto",-1)),$={key:1},ee=l(()=>e("p",{class:"small text-muted mt-4 mb-1"},"Opis",-1)),te={key:2},Ae=l(()=>e("p",{class:"small text-muted mt-4 mb-1"},"Psy:",-1)),ae=l(()=>e("img",{src:Y},null,-1)),se={key:3},oe=l(()=>e("p",{class:"small text-muted mt-4 mb-1"},"Ulubione miejsca:",-1));function re(r,u,g,t,v,f){const n=I("router-link"),d=I("NavBarComponent");return a(),s(p,null,[e("div",P,[t.profileData?(a(),s("div",Z,[t.showEditButton?(a(),s("div",F,[b(n,{to:{name:"editprofile",params:{userId:t.userId}}},{default:y(()=>[V]),_:1},8,["to"])])):c("",!0),e("div",K,[e("div",z,[e("img",{src:t.imageSrc,class:"card-img-top user-avatar rounded-circle mb-3",alt:"User avatar"},null,8,T)]),e("div",W,[e("h1",null,o(t.profileData.userName),1)])]),e("div",H,[t.profileData.city?(a(),s("div",O,[q,e("h2",null,o(t.profileData.city),1)])):c("",!0),t.profileData.description?(a(),s("div",$,[ee,e("h5",null,o(t.profileData.description),1)])):c("",!0),t.profileData.dogs.length>0?(a(),s("div",te,[Ae,(a(!0),s(p,null,h(t.profileData.dogs,A=>(a(),s("div",null,[e("h5",null,[ae,B(),e("b",null,o(A.name),1),B(", "+o(A.race)+", "+o(A.age)+" "+o(A.age<=1?" r.":" l."),1)])]))),256))])):c("",!0),t.profileData.favourites.length>0?(a(),s("div",se,[oe,(a(!0),s(p,null,h(t.profileData.favourites,A=>(a(),s("div",null,[e("h5",null,o(A),1)]))),256))])):c("",!0)])])):c("",!0)]),b(d)],64)}const le=L(N,[["render",re],["__scopeId","data-v-7367498a"]]);export{le as default};
