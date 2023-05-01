<template>
    <div class="event-details-container" style="margin-bottom: 50px;" v-if="currentEvent">
        <div class="top-container d-flex justify-content-center align-items-center flex-column">
            <img :src="currentEvent.type === 'Spacer' ? '/src/assets/dogWalk2.png' : '/src/assets/dogTraining.png'" class="img-fluid" style="max-width: 70%;">
            <h3 class="mt-3 text-center">{{ currentEvent.type }}</h3>
        </div>
        <div class="details-container me-3">
            <p class="small text-muted">Gdzie i kiedy?</p>
            <h5>{{ currentEvent.location }},</h5>
            <h6>{{ formatDate(currentEvent.date) }}</h6>
            <p class="small text-muted mt-3">Opis</p>
            <p>{{ currentEvent.description }}</p>
            <p class="small text-muted mt-3">Uczestnicy</p>
            <div v-if="currentEvent.attendeesData.length" v-for="attendee in currentEvent.attendeesData">
                <router-link :to="{ name: 'profile', params: { userId: attendee.attendeeId } }">
                    {{ attendee.attendeeName }}
                </router-link>
            </div>
            <p v-else><em>Nikt jeszcze nie dołączył</em></p>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <div class="map-wrapper" v-if="currentEvent.geolocation">
                <!-- <div id="mapa" ref="mapElement"></div> -->
                <!-- <div v-if="currentEvent.geolocation" class="map-wrapper"> -->
                <!-- <div id="mapa" v-bind:class="showMap ? 'isVisble' : 'notVisible'"></div></div> -->
                <!-- <div id="mapa"></div> -->
                <MapView :geolocation="currentEvent.geolocation" />
            </div>
        </div>
            <div class="d-flex justify-content-center mt-3">
                <img :src="!currentEvent.userAttends ? '/src/assets/join.png' : '/src/assets/leave.png'" width="80" height="80" @click.prevent="attendEvent(currentEvent)" />
            </div>
       
    
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router'
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '@/firebase';
import MapView from '@/views/MapView.vue';
  
export default {
    components: { MapView },
    setup() {
    const currentEvent = ref()
        //Zmienic!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //         const currentUserId = firebase.auth().currentUser.id;
    const currentUserId = 'xo9FaiazKTo5ATkJa7Bj';
    const userRef = doc(db, 'users', currentUserId);
    // let showMap = false;
    //   let container = null;

    onMounted(async () => {
        const route = useRoute()
        const snap = await getDoc(doc(db, `events/${route.params.key}`))
        const docData = snap.data();
        const attendeeIds = docData.attendees.map(ref => ref.id);
        const userAttends = attendeeIds.includes(currentUserId);
        const attendeesData = await Promise.all(docData.attendees.map(async (ref) => {
            const attendee = await getUserData(ref);
            return {
                attendeeId: ref.id,
                // avatar: ,
                attendeeName: attendee.name
            };
        }));
        const event = { id: snap.id, type: docData.type, description: docData.description, location: docData.location, date: docData.date, attendees: docData.attendees, attendeesData: attendeesData, userAttends: userAttends, geolocation: docData.geolocation};
        currentEvent.value = event;

        // console.log(event.geolocation)
            // if (event.geolocation) {
            //     console.log('true')
        // if (event.geolocation !== null) {
            // showMap = true;
            // console.log('show Map', showMap)
            // console.log(event.geolocation !== null)
            // console.log('trueeee')
            // console.log(event.geolocation[0])
            // console.log(event.geolocation[1])
            // console.log(document.getElementById("mapa"))
            // //   const mapa = map('map').setView([50.06143, 19.93658], 14);
            // // container = map("map").setView([51.959, -8.623], 12);
            // const map = L.map("mapa").setView([50.06143, 19.93658], 14);
            // //   state.map = map;
            // console.log('tu')
            // //   console.log(map)
            // //   map.setView([event.geolocation[0], event.geolocation[1]], 14);
            
            // //   state.map = map;

            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //     maxZoom: 18,
            // }).addTo(map);


            // const marker = L.marker([event.geolocation[0], event.geolocation[1]], {
            //     draggable: false,
            // }).addTo(map);
        // }
    });

    async function attendEvent (event) {
      const attendeeIds = event.attendees.map(ref => ref.id);
      const attendeeIndex = attendeeIds.indexOf(userRef.id);
      const eventRef = doc(db, 'events', event.id);
      if (attendeeIndex === -1) {
        event.attendees.push(currentUserId);
        await updateDoc(eventRef, {
        attendees: arrayUnion(userRef)
        }).then(() => {
          console.log('User added to attendees array');
        }).catch((error) => {
          console.error(error);
        });
      }
      else {
        event.attendees.splice(attendeeIndex, 1);
        await updateDoc(eventRef, {
        attendees: arrayRemove(userRef)
        }).then(() => {
          console.log('User removed from attendees array');
        }).catch((error) => {
          console.error(error);
        });;
      }
      var audio = new Audio('/src/assets/bark.mp3')
        audio.play();
        window.location.reload();
    }

    function formatDate(timestamp) {
      const date = new Date(timestamp.toMillis());
      const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
      const months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
      const dayOfWeek = days[date.getDay()];
      const dayOfMonth = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
    }
    
    async function getUserData (userRef)  {
        const userDoc = await getDoc(userRef);
        return {name: userDoc.data().name, id: userDoc.id};
    }

    return {formatDate, getUserData, attendEvent, currentEvent}
    },

}
</script>


<style>
    .map-wrapper {
        width: 100%;
        border: 1px solid green;
        height: 350px;
    }
    #mapa {
        width: 100%;
        height: 350px;
    }
    /* .isVisible {
        display:block;
        }
    .notVisible {
        display:none;
    } */
</style>
