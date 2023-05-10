<template>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-4 text-center">
          <img src="/src/assets/forest.png" class="img-fluid">
        </div>
        <div class="col-md-4">
            <h4 class="mt-3">Rodzaj</h4>
            <div class="chip-container">
                <div :class="['chip', {'selected': eventType === 'Spacer'}]" @click="eventType = 'Spacer'">
                    Spacer
                </div>
                <div :class="['chip', {'selected': eventType === 'Trening'}]" @click="eventType = 'Trening'">
                    Trening
                </div>
            </div>
          <h4 class="mt-3">Opis</h4>
          <textarea class="form-control mb-3" v-model="eventDescription"></textarea>
          <h4 class="mt-3">Data i godzina</h4>
          <VueDatePicker class="mb-3" format="dd/MM/yyyy H:mm" v-model="eventDate" :enable-time-picker="true" :clearable="false" text-input required></VueDatePicker>
          <h4 class="mt-3">Miejsce</h4>
          <input type="text" class="form-control mb-3" v-model="eventLocation" required>
        <div class="map-wrapper">
            <div id="map">
                <div id="custom-icon" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999">
                    <img src="/src/assets/marker.png" alt="Custom Icon" class="marker">
                  </div>
            </div>
        </div>
        </div>
        <div class="mt-3">
          <img src="/src/assets/add_h.png" width="150" v-on:click="addEvent" />
        </div>
      </div> 
    </div>
    <NavBarComponent />
</template> 


<script>
  import { ref, onMounted, reactive } from 'vue';
  import { collection, addDoc, doc } from 'firebase/firestore';
  import { db, auth } from '@/firebase';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import NavBarComponent from '@/components/NavBarComponent.vue';

  export default {
    components: { VueDatePicker, NavBarComponent},
    setup() {
      const eventTypes = ref(['Spacer', 'Trening']);
      const eventType = ref(eventTypes.value[0]);
      const eventLocation = ref('');
      const eventGeolocation = ref();
      const eventDate = ref();
      const eventDescription = ref('');
      const markerPosition = ref()

    const state = reactive({
      map: null,
      marker: null,
      markerCreated: false,
    });


    onMounted(() => {
        const map = L.map('map').setView([50.06143, 19.93658], 14);
        state.map = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(map);


        // const marker = L.marker([50.06143, 19.93658]);

        // state.marker = marker;
        // state.markerCreated = true;
        

        // var customIconLayer = L.layerGroup(marker, {icon: L.icon({
        //     iconUrl: '/src/asstes/marker.png',
        //     iconSize: [5, 5],
        //     iconAnchor: [25, 25]
        // })});


        navigator.geolocation.getCurrentPosition(position => {
            try {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 14);
                // marker.setLatLng([latitude, longitude]);
            }
            catch {
                console.log('Not able to get current position')
            }
        });

        // customIconLayer.addTo(map);

        map.on('moveend', function(e) {
            const center = map.getCenter();
            console.log('map center')
            console.log(center);
            eventGeolocation.value = [center.lat, center.lng];
            console.log(eventGeolocation.value)
        });
    });

      return {
        eventTypes,
        eventType,
        eventLocation,
        eventGeolocation,
        eventDate,
        eventDescription,
        markerPosition,
      };
    },
  
    methods: {
      async addEvent() {
        if (!this.eventLocation || !this.eventDate) {
          alert('Proszę uzupełnić wszystkie pola');
          return;
        }
    if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);
        const newEvent = {
          type: this.eventType,
          location: this.eventLocation,
          geolocation: this.eventGeolocation,
          date: this.eventDate,
          description: this.eventDescription,
          attendees: [userRef], 
        };
        const eventsCollection = collection(db, 'events');
        await addDoc(eventsCollection, newEvent);
        console.log('Event added successfully');
        var audio = new Audio('/MojPies/bark.mp3')
        audio.play();
        this.$router.push('/events');
      }}
    },
    data() {
    return {
        eventGeolocation: {},
        map: null,
    };
    },
  }
</script>
  
<style>
    img {
        max-width: 90%;
        height: auto;
        object-fit: cover;
    }
    /* .marker {
        position: absolute; 
        margin-top: -96px; 
        margin-left: -38px;
    } */
    .chip-container {
        display: flex;
        justify-content: left;
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
    .container {
        margin-bottom: 50px;
    }
    .map-wrapper {
        width: 100%;
        border: 1px solid green;
        height: 350px;
        display: flex;
    }
    #map {
        width: 100%;
        height: 350px;
        z-index: 1;
    }
</style>
  