<template>
    <img src="/src/assets/forest.png">
    <p>Rodzaj</p>
    <div class="chip-container">
        <div :class="['chip', {'selected': eventType === 'Spacer'}]" @click="eventType = 'Spacer'">
            Spacer
        </div>
        <div :class="['chip', {'selected': eventType === 'Trening'}]" @click="eventType = 'Trening'">
            Trening
        </div>
    </div>
  
    <p>Miejsce</p>
    <input type="text" v-model="eventLocation" required>
    <p>Współrzędne</p>
    <input type="text" v-model="eventGeolocation">
    <button @click="openMap">Select location on map</button>
    <div v-if="showMap">
    <MapView @location-selected="onLocationSelected" />
</div>
    <p>Data i godzina</p>
    <VueDatePicker format="dd/MM/yyyy H:mm" v-model="eventDate" :enable-time-picker="true" :clearable="false" text-input required></VueDatePicker>
    <p>Opis</p>
    <textarea v-model="eventDescription"></textarea>
    <img src="/src/assets/add.png" width="70" height="70" v-on:click="addEvent" />
</template>
  
<script>
  import { ref } from 'vue';
  import { collection, addDoc } from 'firebase/firestore';
  import { db } from '@/firebase';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import MapView from '@/views/MapView.vue';

  export default {
    components: { VueDatePicker, MapView },
    setup() {
        const eventTypes = ref(['Spacer', 'Trening']);
    const eventType = ref(eventTypes.value[0]);
      const eventLocation = ref('');
      const eventGeolocation = ref('');
      const eventDate = ref();
      const eventDescription = ref('');
  
      return {
        eventTypes,
        eventType,
        eventLocation,
        eventGeolocation,
        eventDate,
        eventDescription,
      };
    },
  
    methods: {
      async addEvent() {
        if (!this.eventLocation || !this.eventDate) {
        alert('Please fill in all required fields');
        return;
      }

        const newEvent = {
          type: this.eventType,
          location: this.eventLocation,
          geolocation: this.eventGeolocation,
          date: this.eventDate,
          description: this.eventDescription,
          attendees: ['xo9FaiazKTo5ATkJa7Bj'], //to be changed to current user id
        };
        console.log(this.eventType);
        const eventsCollection = collection(db, 'events');
        await addDoc(eventsCollection, newEvent);
        console.log('Event added successfully');
        this.$router.push('/events');
      },
      openMap() {
    this.showMap = true;
  },
  onLocationSelected(location) {
    this.eventGeolocation = location;
    this.showMap = false;
  },
    },
    data() {
  return {
    showMap: false,
  };
},
  };
</script>
  
<style>
    img {
        max-width: 90%;
        height: auto;
        object-fit: cover;
    }
    .chip-container {
    display: flex;
    justify-content: center;
    }

    .chip {
    padding: 6px 12px;
    border-radius: 15px;
    background-color: #c4c4c4;
    margin-right: 10px;
    cursor: pointer;
    }

    .selected {
    background-color: green;
    color: white;
    }
</style>
  