import{_ as C,f as m,n as M,h as A,r as p,o as y,c as k,a,t as u,F as D,k as B,b as v,w as z,q as N,i as F}from"./index-a9f1a630.js";import{t as I,c as S,e as f,d as b,a as U,f as x,S as O,D as V}from"./index-3872b343.js";import{N as j}from"./NavBarComponent-6c623fb1.js";const L={components:{NavBarComponent:j},setup(){const h=m([]),d=m(null),w=m(!1),o=m(!1),E=M(()=>{let e=h.value;return w.value&&(e=e.filter(s=>new Date(s.date.toMillis())>=new Date)),o.value&&(e=e.filter(s=>s.userAttends)),e.sort((s,t)=>{const n=new Date(s.date.toMillis()),c=new Date(t.date.toMillis());return n-c}),e});A(async()=>{const e=await I(S(b,"events")),s=[];if(f.currentUser){d.value=f.currentUser.uid;const t=f.currentUser.uid;for(const n of e.docs){const c=n.data().attendees.map(l=>l.id),i={id:n.id,type:n.data().type,location:n.data().location,date:n.data().date,attendees:n.data().attendees,userAttends:c.includes(t)};s.push(i)}h.value=s}});function g(e){const s=new Date(e.toMillis()),t=["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],n=["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"],c=t[s.getDay()],i=s.getDate(),l=n[s.getMonth()],r=s.getFullYear();return`${c}, ${i} ${l} ${r}`}async function _(e){if(f.currentUser){const t=f.currentUser.uid,n=U(b,"users",t),i=e.attendees.map(r=>r.id).indexOf(t),l=U(b,"events",e.id);i===-1?(e.attendees.push(n),e.userAttends=!0,await x(l,{attendees:O(n)}).then(()=>{console.log("User added to attendees array")}).catch(r=>{console.error(r)})):(e.attendees.splice(i,1),e.userAttends=!1,await x(l,{attendees:V(n)}).then(()=>{console.log("User removed from attendees array")}).catch(r=>{console.error(r)}));var s=new Audio("/assets/bark.mp3");s.play()}}return{formatDate:g,attendEvent:_,filteredEvents:E,showFutureEvents:w,showUserEvents:o}}},q={class:"container",style:{"margin-bottom":"100px"}},P={class:"d-flex justify-content-between mb-3"},R={class:"row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"},W={class:"card h-100 shadow"},$={class:"card-body"},Y={class:"card-title"},G={class:"card-text"},H={class:"card-footer d-flex justify-content-between align-items-center"},J=["onClick"];function K(h,d,w,o,E,g){const _=p("router-link"),e=p("font-awesome-icon"),s=p("NavBarComponent");return y(),k(D,null,[a("div",q,[a("div",P,[a("button",{onClick:d[0]||(d[0]=t=>o.showFutureEvents=!o.showFutureEvents),class:"filter-button"},u(o.showFutureEvents?"✔️ Nadchodzące":"Nadchodzące"),1),a("button",{onClick:d[1]||(d[1]=t=>o.showUserEvents=!o.showUserEvents),class:"filter-button"},u(o.showUserEvents?"✔️ Biorę udział":"Biorę udział"),1)]),a("div",R,[(y(!0),k(D,null,B(o.filteredEvents,t=>(y(),k("div",{key:t.id,class:"col"},[v(_,{to:{name:"event",params:{key:t.id}}},{default:z(()=>[a("div",W,[a("div",$,[a("h5",Y,u(t.type)+" - "+u(t.location),1),a("p",G,u(o.formatDate(t.date)),1)]),a("div",H,[a("button",{class:N({attended:t.userAttends,"not-attended":!t.userAttends}),onClick:F(n=>o.attendEvent(t),["prevent"])},u(t.userAttends?"Opuść":"Dołącz"),11,J)])])]),_:2},1032,["to"])]))),128))]),v(_,{to:"/newevent",class:"add-event-button"},{default:z(()=>[v(e,{icon:["fas","plus"]})]),_:1})]),v(s)],64)}const Z=C(L,[["render",K]]);export{Z as default};
