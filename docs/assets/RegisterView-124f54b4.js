import{e as u,o as g,c as h,a as s,k as c,v as i,F as v,m as p}from"./index-90d68d17.js";import{_}from"./banner-7aaa121e.js";import{i as f,j as k,a,G as r,k as w}from"./index-ce0dfd1e.js";const U=s("img",{src:_,alt:"Banner",class:"banner-image"},null,-1),j=s("h1",null,"Utwórz swoje konto",-1),F={__name:"RegisterView",setup(y){const l=u(""),n=u(""),d=()=>{f(k(),l.value,n.value).then(o=>{console.log("Successfully registered!"),console.log(a.currentUser),p.push({name:"editprofile",params:{userId:a.currentUser.uid}})}).catch(o=>{console.log(o.code),alert(o.message)})},m=()=>{const o=new r;w(a,o).then(e=>{r.credentialFromResult(e).accessToken,e.user,console.log(a.currentUser),p.push({name:"editprofile",params:{userId:a.currentUser.uid}})}).catch(e=>{e.code;const t=e.message;e.customData.email,r.credentialFromError(e),console.log(t),alert(e.message)})};return(o,e)=>(g(),h(v,null,[U,j,s("p",null,[c(s("input",{type:"text",placeholder:"Email","onUpdate:modelValue":e[0]||(e[0]=t=>l.value=t)},null,512),[[i,l.value]])]),s("p",null,[c(s("input",{type:"password",placeholder:"Hasło","onUpdate:modelValue":e[1]||(e[1]=t=>n.value=t)},null,512),[[i,n.value]])]),s("p",null,[s("button",{onClick:d},"Zarejestruj się")]),s("p",null,[s("button",{onClick:m},"Zaloguj się przy pomocy swojego konta Google")])],64))}};export{F as default};
