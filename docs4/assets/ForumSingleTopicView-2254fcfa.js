import{_ as B,f as y,h as U,u as F,r as R,o as m,c as _,a,t as d,b as D,w as N,d as p,F as k,k as j,j as J,v as K,e as L}from"./index-236e984a.js";import{J as I,a as T,d as S,g as A,r as C,s as M,e as V,f as P,S as $}from"./index-3872b343.js";import{N as E}from"./NavBarComponent-982c69ad.js";const H="/MojPies/assets/send_h-38d532ee.png";const O={components:{NavBarComponent:E},setup(){const i=y(""),n=y(),l=y(),e=s=>{const t=new Date(s.toMillis()),c=String(t.getDate()).padStart(2,"0"),r=String(t.getMonth()+1).padStart(2,"0"),g=t.getFullYear(),u=String(t.getHours()).padStart(2,"0"),v=String(t.getMinutes()).padStart(2,"0");return`${c}.${r}.${g} ${u}:${v}`},w=async s=>{const t=await I(s);return{name:t.data().name,id:t.id}};U(async()=>{const s=F();l.value=`forum/${s.params.sectionKey}/threads/${s.params.threadId}`;let t;const c=await I(T(S,`forum/${s.params.sectionKey}/threads/${s.params.threadId}`)),r=c.data(),g=r.answers.map(async o=>{const h=await w(o.author);return await A(C(M,`images/${h.id}`)).then(b=>{t=b}).catch(b=>{t="/src/assets/profile.png"}),{date:o.date,answer:o.answer,authorName:h.name,authorId:h.id,imageSrc:t}}).sort((o,h)=>new Date(o.date)-new Date(h.date)),u=await w(r.authorRef);await A(C(M,`images/${u.id}`)).then(o=>{t=o}).catch(o=>{t="/src/assets/profile.png"});const v={id:c.id,threadTopic:r.topic,threadDescription:r.description,threadAuthor:u,threadAuthorImg:t,threadStartDate:r.date,answers:await Promise.all(g)};n.value=v});const x=async()=>{const s=T(S,l.value);if(V.currentUser){const c=V.currentUser.uid,r=T(S,"users",c);await P(s,{answers:$({answer:i.value,date:new Date,author:r})});var t=new Audio("/src/assets/bark.mp3");t.play(),i.value="",window.location.reload()}};return{currentThread:n,formatDate:e,threadResponse:i,submitThreadResponse:async()=>{i.value.trim()!==""&&await x()},path:l}}},Y={key:0,class:"container"},q={class:"card mb-3",style:{width:"100%"}},z={class:"card-body"},G={class:"card-title"},Q={class:"card-text"},W={class:"card-text"},X=["src"],Z={class:"text-muted"},tt={class:"card mb-3",style:{width:"100%"}},at={class:"card-body"},et={class:"card-text"},st={class:"card-text"},rt=["src"],ot={class:"text-muted"},nt=a("hr",{class:"m-0"},null,-1),dt={class:"card mb-3",style:{width:"100%"}},ct={class:"card-body"};function it(i,n,l,e,w,x){const f=R("router-link"),s=R("NavBarComponent");return m(),_(k,null,[e.currentThread?(m(),_("div",Y,[a("div",q,[a("div",z,[a("h5",G,d(e.currentThread.threadTopic),1),a("p",Q,d(e.currentThread.threadDescription),1),a("p",W,[D(f,{to:{name:"profile",params:{userId:e.currentThread.threadAuthor.id}}},{default:N(()=>[a("img",{src:e.currentThread.threadAuthorImg,class:"user-avatar rounded-circle",alt:"User avatar"},null,8,X),p(" "+d(e.currentThread.threadAuthor.name),1)]),_:1},8,["to"]),p(", "),a("small",Z,d(e.formatDate(e.currentThread.threadStartDate)),1)])])]),(m(!0),_(k,null,j(e.currentThread.answers,t=>(m(),_("div",tt,[a("div",at,[a("p",et,d(t.answer),1),a("p",st,[D(f,{to:{name:"profile",params:{userId:t.authorId}}},{default:N(()=>[a("img",{src:t.imageSrc,class:"user-avatar rounded-circle",alt:"User avatar"},null,8,rt),p(" "+d(t.authorName),1)]),_:2},1032,["to"]),p(", "),a("small",ot,d(e.formatDate(t.date)),1)])]),nt]))),256)),a("div",dt,[a("div",ct,[J(a("textarea",{"onUpdate:modelValue":n[0]||(n[0]=t=>e.threadResponse=t),class:"form-control w-100"},null,512),[[K,e.threadResponse]]),a("img",{class:"mt-3 d-block mx-auto",src:H,width:"150",onClick:n[1]||(n[1]=(...t)=>e.submitThreadResponse&&e.submitThreadResponse(...t))})])])])):L("",!0),D(s)],64)}const mt=B(O,[["render",it]]);export{mt as default};