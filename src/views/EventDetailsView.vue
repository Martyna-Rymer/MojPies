
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'
import { doc, onSnapshot, getDocs, getDoc, query, where } from 'firebase/firestore';

import { db, readDocument } from '@/firebase';
import { collection } from 'firebase/firestore'
import { RouterLink, RouterView } from 'vue-router'
  
const currentEvent = ref()

onMounted(async () => {
    const route = useRoute()
    const snap = await getDoc(doc(db, `events/${route.params.key}`))
    const docData = snap.data();
    const event = { id: doc.id, type: docData.type, description: docData.description, location: docData.location, date: docData.date, attendees: docData.attendees};
    currentEvent.value = event;
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
    },}}
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
        <p></p>
        </div>
        <img class="bottom-button" src="/src/assets/join.png" height="100" width="100">
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