<script setup>
import { ref, onMounted, computed } from 'vue';

import { doc, onSnapshot, getDocs, getDoc, query, where } from 'firebase/firestore';

// import { doc, onSnapshot, getDocs, query, where } from 'firebase/firestore'
import { db, readDocument } from '@/firebase';
import { collection } from 'firebase/firestore'
  
const eventsList = ref([])

onMounted(async () => {
const querySnapshot = await getDocs(collection(db, 'events'));

const fbEventsList = [];
for (const doc of querySnapshot.docs) {
  const event = { id: doc.id, type: doc.data().type, location: doc.data().location, date: doc.data().date, attendees: doc.data().attendees};
  fbEventsList.push(event);
}

eventsList.value = fbEventsList;
});
</script>

<script>
export default {
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp.toMillis());
      const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
      const months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
      const dayOfWeek = days[date.getDay()];
      const dayOfMonth = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
    },


    attendEvent (event) {
      console.log(event.id);
          const attendeeIndex = event.attendees.indexOf('xo9FaiazKTo5ATkJa7Bj');
          if (attendeeIndex === -1) {
            event.attendees.push('xo9FaiazKTo5ATkJa7Bj');
            var audio = new Audio('/src/assets/bark.mp3')
            audio.play()
          }




  //         const user = firebase.auth().currentUser;
  // if (user) {
  //   const eventId = event.id;
  //   const eventRef = db.collection('events').doc(eventId);

  //   eventRef.update({
  //     attendees: firebase.firestore.FieldValue.arrayUnion(user.uid)
  //   }).then(() => {
  //     console.log('User added to attendees array');
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // } else {
  //   console.log('User not logged in');
  // }
    const currentUser = 'xo9FaiazKTo5ATkJa7Bj'; // replace with the current user's ID
    const eventId = event.id;
    const eventsCollection = collection(db, 'events');
    console.log(db);
    const docc = doc(db, 'events/gXKDPe3ZCFfAt2gnNxfK');
    console.log(getDoc(docc));
    const attendeesRef = db.collection('events').doc(eventId);
    attendeesRef.update({
      attendees: firebase.firestore.FieldValue.arrayUnion(currentUser)
    })
    .then(() => {
      console.log("User added to attendees list");
    })
    .catch(error => {
      console.error("Error adding user to attendees list:", error);
    });
        },
      },
    };
</script>

<template>
  <div class="events">
    <div class="events-list">
      <div v-for="event in eventsList" :key="event.id">
        <router-link :to="{ name: 'event', params: { key: event.id
        } }">
          <div class="event-info">
            <div class="event-details">
              <p class="event-title">{{ event.type }} - {{ event.location }}</p>
              <p class="event-subtitle">{{ formatDate(event.date) }}</p>
            </div>
            <div class="attendees">
              <button :class="{ 'attended': event.attendees.indexOf('xo9FaiazKTo5ATkJa7Bj') !== -1, 'not-attended': event.attendees.indexOf('xo9FaiazKTo5ATkJa7Bj') === -1 }" @click.prevent="attendEvent(event)">
                {{ event.attendees.indexOf('xo9FaiazKTo5ATkJa7Bj') !== -1 ? 'Dołączono' : 'Dołącz' }}
              </button>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <router-link to="/newevent" class="add-event-button">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </router-link>
  </div>
</template>

<style>

.event-info {
  display: flex;
  justify-content: space-between;
}

.event-details {
  width: 70%;
}

.event-title {
  font-size: 15px;
  font-weight: bold;
}

.event-subtitle {
  font-size: 12px;
}

.attended {
  background-color: rgb(0, 128, 255);
  color: white;
}

.not-attended {
  background-color: green;
  color: white;
}

.details {
  float: left;
  width: 60%;
}

.attendees {
  float: right;
  width: 40%;
  text-align: right;
}
.add-event-button {
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #212a38;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  .add-event-button:hover {
    transform: scale(1.1);
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.4);
  }

  .add-event-button i {
    font-size: 30px;
  }
</style>