import{_ as j,f as m,h as F,u as K,r as M,o as f,c as g,a as e,t as c,b as S,w as N,d as v,F as k,k as P,j as J,v as L,e as $,l as E}from"./index-57f94fc1.js";import{J as A,a as x,d as b,g as C,r as V,s as B,e as U,f as H,S as O}from"./index-3872b343.js";import{N as Y}from"./NavBarComponent-81db134f.js";const q="/MojPies/assets/send_h-38d532ee.png";const z={components:{NavBarComponent:Y},setup(){const h=m(""),d=m(),_=m(),t=m(),p=m(),I=r=>{const a=new Date(r.toMillis()),i=String(a.getDate()).padStart(2,"0"),o=String(a.getMonth()+1).padStart(2,"0"),T=a.getFullYear(),w=String(a.getHours()).padStart(2,"0"),D=String(a.getMinutes()).padStart(2,"0");return`${i}.${o}.${T} ${w}:${D}`},l=async r=>{const a=await A(r);return{name:a.data().name,id:a.id}};F(async()=>{const r=K();_.value=`forum/${r.params.sectionKey}/threads/${r.params.threadId}`,t.value=r.params.sectionKey,p.value=r.params.threadId;let a;const i=await A(x(b,`forum/${r.params.sectionKey}/threads/${r.params.threadId}`)),o=i.data(),T=o.answers.map(async n=>{const u=await l(n.author);return await C(V(B,`images/${u.id}`)).then(R=>{a=R}).catch(R=>{a="/MojPies/profile.png"}),{date:n.date,answer:n.answer,authorName:u.name,authorId:u.id,imageSrc:a}}).sort((n,u)=>new Date(n.date)-new Date(u.date)),w=await l(o.authorRef);await C(V(B,`images/${w.id}`)).then(n=>{a=n}).catch(n=>{a="/MojPies/profile.png"});const D={id:i.id,threadTopic:o.topic,threadDescription:o.description,threadAuthor:w,threadAuthorImg:a,threadStartDate:o.date,answers:await Promise.all(T)};d.value=D});const y=async()=>{const r=x(b,_.value);if(U.currentUser){const i=U.currentUser.uid,o=x(b,"users",i);await H(r,{answers:O({answer:h.value,date:new Date,author:o})});var a=new Audio("/MojPies/bark.mp3");a.play(),h.value="",E.push({name:"forumThread",params:{sectionKey:t,threadId:p}}),window.location.reload()}};return{currentThread:d,formatDate:I,threadResponse:h,submitThreadResponse:async()=>{h.value.trim()!==""&&await y()},path:_,sectionKey:t,threadId:p}}},G={key:0,class:"container"},Q={class:"card mb-3",style:{width:"100%"}},W={class:"card-body"},X={class:"card-title"},Z={class:"card-text"},tt={class:"card-text"},at=["src"],et={class:"text-muted"},rt={class:"card mb-3",style:{width:"100%"}},st={class:"card-body"},ot={class:"card-text"},nt={class:"card-text"},dt=["src"],ct={class:"text-muted"},it=e("hr",{class:"m-0"},null,-1),ht={class:"card mb-3",style:{width:"100%"}},lt={class:"card-body"};function ut(h,d,_,t,p,I){const l=M("router-link"),y=M("NavBarComponent");return f(),g(k,null,[t.currentThread?(f(),g("div",G,[e("div",Q,[e("div",W,[e("h5",X,c(t.currentThread.threadTopic),1),e("p",Z,c(t.currentThread.threadDescription),1),e("p",tt,[S(l,{to:{name:"profile",params:{userId:t.currentThread.threadAuthor.id}}},{default:N(()=>[e("img",{src:t.currentThread.threadAuthorImg,class:"user-avatar rounded-circle",alt:"User avatar"},null,8,at),v(" "+c(t.currentThread.threadAuthor.name),1)]),_:1},8,["to"]),v(", "),e("small",et,c(t.formatDate(t.currentThread.threadStartDate)),1)])])]),(f(!0),g(k,null,P(t.currentThread.answers,s=>(f(),g("div",rt,[e("div",st,[e("p",ot,c(s.answer),1),e("p",nt,[S(l,{to:{name:"profile",params:{userId:s.authorId}}},{default:N(()=>[e("img",{src:s.imageSrc,class:"user-avatar rounded-circle",alt:"User avatar"},null,8,dt),v(" "+c(s.authorName),1)]),_:2},1032,["to"]),v(", "),e("small",ct,c(t.formatDate(s.date)),1)])]),it]))),256)),e("div",ht,[e("div",lt,[J(e("textarea",{"onUpdate:modelValue":d[0]||(d[0]=s=>t.threadResponse=s),class:"form-control w-100"},null,512),[[L,t.threadResponse]]),e("img",{class:"mt-3 d-block mx-auto",src:q,width:"150",onClick:d[1]||(d[1]=(...s)=>t.submitThreadResponse&&t.submitThreadResponse(...s))})])])])):$("",!0),S(y)],64)}const wt=j(z,[["render",ut]]);export{wt as default};