import{_ as j,f as m,h as F,u as K,r as M,o as g,c as w,a as e,t as c,b as S,w as N,d as v,F as k,k as P,j as J,v as L,e as $,l as E}from"./index-4e1ff820.js";import{J as A,a as x,d as b,g as C,r as V,s as B,e as U,f as H,S as O}from"./index-3872b343.js";import{N as Y}from"./NavBarComponent-bc981fea.js";const q="/MojPies/assets/send_h-38d532ee.png";const z={components:{NavBarComponent:Y},setup(){const h=m(""),d=m(),_=m(),t=m(),p=m(),I=s=>{const a=new Date(s.toMillis()),i=String(a.getDate()).padStart(2,"0"),o=String(a.getMonth()+1).padStart(2,"0"),T=a.getFullYear(),f=String(a.getHours()).padStart(2,"0"),D=String(a.getMinutes()).padStart(2,"0");return`${i}.${o}.${T} ${f}:${D}`},l=async s=>{const a=await A(s);return{name:a.data().name,id:a.id}};F(async()=>{const s=K();_.value=`forum/${s.params.sectionKey}/threads/${s.params.threadId}`,t.value=s.params.sectionKey,p.value=s.params.threadId;let a;const i=await A(x(b,`forum/${s.params.sectionKey}/threads/${s.params.threadId}`)),o=i.data(),T=o.answers.map(async n=>{const u=await l(n.author);return await C(V(B,`images/${u.id}`)).then(R=>{a=R}).catch(R=>{a="/MojPies/profile.png"}),{date:n.date,answer:n.answer,authorName:u.name,authorId:u.id,imageSrc:a}}).sort((n,u)=>new Date(n.date)-new Date(u.date)),f=await l(o.authorRef);await C(V(B,`images/${f.id}`)).then(n=>{a=n}).catch(n=>{a="/MojPies/profile.png"});const D={id:i.id,threadTopic:o.topic,threadDescription:o.description,threadAuthor:f,threadAuthorImg:a,threadStartDate:o.date,answers:await Promise.all(T)};d.value=D});const y=async()=>{const s=x(b,_.value);if(U.currentUser){const i=U.currentUser.uid,o=x(b,"users",i);await H(s,{answers:O({answer:h.value,date:new Date,author:o})});var a=new Audio("/MojPies/bark.mp3");a.play(),h.value="",console.log(t),setTimeout(()=>{E.push({name:"forumThread",params:{sectionKey:t,threadId:p}})},3e3)}};return{currentThread:d,formatDate:I,threadResponse:h,submitThreadResponse:async()=>{h.value.trim()!==""&&await y()},path:_,sectionKey:t,threadId:p}}},G={key:0,class:"container"},Q={class:"card mb-3",style:{width:"100%"}},W={class:"card-body"},X={class:"card-title"},Z={class:"card-text"},tt={class:"card-text"},at=["src"],et={class:"text-muted"},st={class:"card mb-3",style:{width:"100%"}},rt={class:"card-body"},ot={class:"card-text"},nt={class:"card-text"},dt=["src"],ct={class:"text-muted"},it=e("hr",{class:"m-0"},null,-1),ht={class:"card mb-3",style:{width:"100%"}},lt={class:"card-body"};function ut(h,d,_,t,p,I){const l=M("router-link"),y=M("NavBarComponent");return g(),w(k,null,[t.currentThread?(g(),w("div",G,[e("div",Q,[e("div",W,[e("h5",X,c(t.currentThread.threadTopic),1),e("p",Z,c(t.currentThread.threadDescription),1),e("p",tt,[S(l,{to:{name:"profile",params:{userId:t.currentThread.threadAuthor.id}}},{default:N(()=>[e("img",{src:t.currentThread.threadAuthorImg,class:"user-avatar rounded-circle",alt:"User avatar"},null,8,at),v(" "+c(t.currentThread.threadAuthor.name),1)]),_:1},8,["to"]),v(", "),e("small",et,c(t.formatDate(t.currentThread.threadStartDate)),1)])])]),(g(!0),w(k,null,P(t.currentThread.answers,r=>(g(),w("div",st,[e("div",rt,[e("p",ot,c(r.answer),1),e("p",nt,[S(l,{to:{name:"profile",params:{userId:r.authorId}}},{default:N(()=>[e("img",{src:r.imageSrc,class:"user-avatar rounded-circle",alt:"User avatar"},null,8,dt),v(" "+c(r.authorName),1)]),_:2},1032,["to"]),v(", "),e("small",ct,c(t.formatDate(r.date)),1)])]),it]))),256)),e("div",ht,[e("div",lt,[J(e("textarea",{"onUpdate:modelValue":d[0]||(d[0]=r=>t.threadResponse=r),class:"form-control w-100"},null,512),[[L,t.threadResponse]]),e("img",{class:"mt-3 d-block mx-auto",src:q,width:"150",onClick:d[1]||(d[1]=(...r)=>t.submitThreadResponse&&t.submitThreadResponse(...r))})])])])):$("",!0),S(y)],64)}const ft=j(z,[["render",ut]]);export{ft as default};
