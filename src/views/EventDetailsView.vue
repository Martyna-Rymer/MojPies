<template>
    <div class="event-details-container" style="margin-bottom: 50px;" v-if="currentEvent">
        <div class="top-container d-flex justify-content-center align-items-center flex-column">
            <img :src="currentEvent.type === 'Spacer' ? '/MojPies/dogWalk.png' : '/MojPies/dogTraining.png'" class="img-fluid" style="max-width: 70%;">
            <h3 class="mt-3 text-center">{{ currentEvent.type }}</h3>
        </div>
        <div class="details-container me-3">
            <p class="small text-muted mb-1">Gdzie i kiedy?</p>
            <h5>{{ currentEvent.location }},</h5>
            <h6>{{ formatDate(currentEvent.date) }}</h6>
            <p class="small text-muted mt-3 mb-1">Opis</p>
            <p>{{ currentEvent.description }}</p>
            <p class="small text-muted mb-1">Miejsce spotkania</p>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <div class="map-wrapper" v-if="currentEvent.geolocation">
                <MapComponent :geolocation="currentEvent.geolocation" />
            </div>
        </div>
        <EventAttendance/>
    </div>
    <NavBarComponent />
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import MapComponent from '@/components/MapComponent.vue';
import EventAttendance from '@/components/EventAttendance.vue';
import NavBarComponent from '@/components/NavBarComponent.vue';
  
export default {
    components: { MapComponent, EventAttendance, NavBarComponent },
    setup() {
    const currentEvent = ref()

    onMounted(async () => {
        const route = useRoute()
        const snap = await getDoc(doc(db, `events/${route.params.key}`))
        const docData = snap.data();
        const event = { id: snap.id, type: docData.type, description: docData.description, location: docData.location, date: docData.date, geolocation: docData.geolocation};
        currentEvent.value = event;

    });

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

    return {formatDate, currentEvent}
    },

}
</script>


<style>
    .map-wrapper {
        width: 350px;
        border: 1px solid green;
        height: 350px;
    }
    #mapa {
        width: 100%;
        height: 350px;
        height: 100%;
    }
</style>
