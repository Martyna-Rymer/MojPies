
<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'
import { doc, onSnapshot, getDocs, getDoc, query, where, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';

import { db, readDocument } from '@/firebase';
import { collection } from 'firebase/firestore'
import { RouterLink, RouterView } from 'vue-router'
  
export default {
    setup() {
    const currentEvent = ref()
        //Zmienic!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //         const currentUserId = firebase.auth().currentUser.id;
        const currentUserId = 'xo9FaiazKTo5ATkJa7Bj';
      const userRef = doc(db, 'users', currentUserId);


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
        const event = { id: snap.id, type: docData.type, description: docData.description, location: docData.location, date: docData.date, attendees: docData.attendees, attendeesData: attendeesData, userAttends: userAttends};
        currentEvent.value = event;
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
    }
}
</script>


<template>
    <div class="event-details-container" v-if="currentEvent">
        <div class="top-container">
        <img
      :src="currentEvent.type === 'Spacer' ? '/src/assets/dogWalk2.png' : '/src/assets/dogTraining.png'">
        <h3>{{ currentEvent.type }}</h3>
        </div>
        <div class="details-container">
        <p>Gdzie i kiedy?</p>
        <p>{{ currentEvent.location }},</p>
        <p>{{ formatDate(currentEvent.date) }}</p>
        <p>Opis</p>
        <p>{{ currentEvent.description }}</p>
        <p>Uczestnicy</p>
        <div v-for="attendee in currentEvent.attendeesData">
            <router-link :to="{ name: 'profile', params: { userId: attendee.attendeeId } }">
                <p>{{ attendee.attendeeName }}</p>
            </router-link>
        </div>
        </div>
        <img :src="!currentEvent.userAttends ? '/src/assets/join.png' : '/src/assets/leave.png'" 
        width="80" height="80" @click.prevent="attendEvent(currentEvent)" />
    </div>
</template>

<style>
img {
    max-width: 70%;
    height: auto;
    object-fit: cover;
  }
  .event-details-container {
    position: fixed;
    top: 2;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 90%;
    text-align: left;
  }
  .top-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .details-container {
    margin-left: 20px;
  }
  .bottom-button {
    position: fixed;
    bottom: 55px;
    right: 25px;
  }
</style>