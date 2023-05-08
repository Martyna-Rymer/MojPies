import{_ as T,X as V,f as s,g as x,h as w,r as _,o as b,c as P,a as e,q as f,j as g,v as h,b as y,F as E}from"./index-daa97122.js";import{e as k,a as M,c as j,h as N,d as C}from"./index-3872b343.js";import{N as z}from"./NavBarComponent-ee27e566.js";import{_ as B}from"./marker-00ef1fab.js";import{_ as U}from"./add_h-f72fec53.js";const S="/MojPies/assets/forest-f93a1eec.png";const q={components:{VueDatePicker:V,NavBarComponent:z},setup(){const r=s(["Spacer","Trening"]),t=s(r.value[0]),c=s(""),o=s(),l=s(),d=s(""),m=s(),i=x({map:null,marker:null,markerCreated:!1});return w(()=>{const n=L.map("map").setView([50.06143,19.93658],14);i.map=n,L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18}).addTo(n);const p=L.marker([50.06143,19.93658]);i.marker=p,i.markerCreated=!0;var D=L.layerGroup(p,{icon:L.icon({iconUrl:"/MojPies/marker.png",iconSize:[5,5],iconAnchor:[25,25]})});navigator.geolocation.getCurrentPosition(v=>{try{const{latitude:a,longitude:u}=v.coords;n.setView([a,u],14),p.setLatLng([a,u])}catch{console.log("Not able to get current position")}}),D.addTo(n),n.on("moveend",function(v){const a=n.getCenter();console.log("map center"),console.log(a),o.value=[a.lat,a.lng],console.log(o.value)})}),{eventTypes:r,eventType:t,eventLocation:c,eventGeolocation:o,eventDate:l,eventDescription:d,markerPosition:m}},methods:{async addEvent(){if(!this.eventLocation||!this.eventDate){alert("Please fill in all required fields");return}if(k.currentUser){const t=k.currentUser.uid,c=M(C,"users",t),o={type:this.eventType,location:this.eventLocation,geolocation:this.eventGeolocation,date:this.eventDate,description:this.eventDescription,attendees:[c]},l=j(C,"events");await N(l,o),console.log("Event added successfully");var r=new Audio("/MojPies/bark.mp3");r.play(),this.$router.push("/events")}}},data(){return{eventGeolocation:{},map:null}}},A={class:"container"},G={class:"row justify-content-center align-items-center"},I=e("div",{class:"col-md-4 text-center"},[e("img",{src:S,class:"img-fluid"})],-1),F={class:"col-md-4"},R=e("h4",{class:"mt-3"},"Rodzaj",-1),X={class:"chip-container"},H=e("h4",{class:"mt-3"},"Opis",-1),O=e("h4",{class:"mt-3"},"Data i godzina",-1),Z=e("h4",{class:"mt-3"},"Miejsce",-1),J=e("div",{class:"map-wrapper"},[e("div",{id:"map"},[e("div",{id:"custom-icon",style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)","z-index":"9998"}},[e("img",{src:B,alt:"Custom Icon",class:"marker"})])])],-1),K={class:"mt-3"};function Q(r,t,c,o,l,d){const m=_("VueDatePicker"),i=_("NavBarComponent");return b(),P(E,null,[e("div",A,[e("div",G,[I,e("div",F,[R,e("div",X,[e("div",{class:f(["chip",{selected:o.eventType==="Spacer"}]),onClick:t[0]||(t[0]=n=>o.eventType="Spacer")}," Spacer ",2),e("div",{class:f(["chip",{selected:o.eventType==="Trening"}]),onClick:t[1]||(t[1]=n=>o.eventType="Trening")}," Trening ",2)]),H,g(e("textarea",{class:"form-control mb-3","onUpdate:modelValue":t[2]||(t[2]=n=>o.eventDescription=n)},null,512),[[h,o.eventDescription]]),O,y(m,{class:"mb-3",format:"dd/MM/yyyy H:mm",modelValue:o.eventDate,"onUpdate:modelValue":t[3]||(t[3]=n=>o.eventDate=n),"enable-time-picker":!0,clearable:!1,"text-input":"",required:""},null,8,["modelValue"]),Z,g(e("input",{type:"text",class:"form-control mb-3","onUpdate:modelValue":t[4]||(t[4]=n=>o.eventLocation=n),required:""},null,512),[[h,o.eventLocation]]),J]),e("div",K,[e("img",{src:U,width:"150",onClick:t[5]||(t[5]=(...n)=>d.addEvent&&d.addEvent(...n))})])])]),y(i)],64)}const oe=T(q,[["render",Q]]);export{oe as default};
