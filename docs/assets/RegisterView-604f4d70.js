import{e as i,o as w,c as _,a as e,l as p,v as d,F as U,n as c}from"./index-fc604969.js";import{_ as j}from"./banner-7aaa121e.js";import{i as k,j as y,a as r,G as m,k as b,J as x,b as z,d as I}from"./index-ce0dfd1e.js";const P=e("img",{src:j,alt:"Banner",class:"banner-image"},null,-1),B=e("h1",null,"Utwórz swoje konto",-1),A={__name:"RegisterView",setup(E){const t=i(""),o=i(""),n=i(""),g=()=>/\S+@\S+\.\S+/.test(t.value)?!0:(n.value="Podaj poprawny format adresu email",!1),h=()=>o.value.length<5?(n.value="Hasło musi zawierać przynajmniej 5 znaków",!1):!0,v=()=>{if(!g()||!h()){alert(n.value);return}k(y(),t.value,o.value).then(a=>{console.log("Successfully registered!"),console.log(r.currentUser),c.push({name:"editprofile",params:{userId:r.currentUser.uid}})}).catch(a=>{console.log(a.code),alert(a.message)})},f=()=>{const a=new m;b(r,a).then(s=>{m.credentialFromResult(s).accessToken,s.user,console.log(r.currentUser),x(z(I,"users",r.currentUser.uid)).then(u=>{u.exists()?c.push({name:"profile",params:{userId:r.currentUser.uid}}):c.push({name:"editprofile",params:{userId:r.currentUser.uid}})}).catch(u=>{console.log(u)})}).catch(s=>{alert(s.message)})};return(a,s)=>(w(),_(U,null,[P,B,e("p",null,[p(e("input",{type:"text",placeholder:"Email","onUpdate:modelValue":s[0]||(s[0]=l=>t.value=l)},null,512),[[d,t.value]])]),e("p",null,[p(e("input",{type:"password",placeholder:"Hasło","onUpdate:modelValue":s[1]||(s[1]=l=>o.value=l)},null,512),[[d,o.value]])]),e("p",null,[e("button",{onClick:v},"Zarejestruj się")]),e("p",null,[e("button",{onClick:f},"Zaloguj się przy pomocy swojego konta Google")])],64))}};export{A as default};
