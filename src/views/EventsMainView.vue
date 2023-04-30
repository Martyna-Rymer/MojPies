<template>
  <div class="container" style="margin-bottom: 100px;">
    <div class="d-flex justify-content-between mb-3">
      <button @click="showFutureEvents = !showFutureEvents" class="filter-button">
        {{ showFutureEvents ? '✔️ Nadchodzące' : 'Nadchodzące' }}
      </button>
      <button @click="showUserEvents = !showUserEvents" class="filter-button">
        {{ showUserEvents ? '✔️ Biorę udział'  : 'Biorę udział' }}
      </button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="event in filteredEvents" :key="event.id" class="col">
        <router-link :to="{ name: 'event', params: { key: event.id } }">
          <div class="card h-100 shadow">
            <div class="card-body">
              <h5 class="card-title">{{ event.type }} - {{ event.location }}</h5>
              <p class="card-text">{{ formatDate(event.date) }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <button :class="{ 'attended': event.userAttends, 'not-attended': !event.userAttends }" @click.prevent="attendEvent(event)">
                {{ event.userAttends ? 'Opuść' : 'Dołącz' }}
              </button>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
    <router-link to="/newevent" class="add-event-button">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </router-link>
</template>

<script>
  import { ref, onMounted, computed } from 'vue';
  import { doc, getDocs, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
  import { db } from '@/firebase';

  export default {
    setup() {
      const eventsList = ref([]);
      const currentUserId = 'xo9FaiazKTo5ATkJa7Bj';
      const userRef = doc(db, 'users', currentUserId);
      const showFutureEvents = ref(false);
      const showUserEvents = ref(false);

      // Filtering events
      const filteredEvents = computed(() => {
        let events = eventsList.value;
        if (showFutureEvents.value) {
          events = events.filter(event => {
            const eventDate = new Date(event.date.toMillis());
            return eventDate >= new Date();
          });
        }
        if (showUserEvents.value) {
          events = events.filter(event => event.userAttends);
        }
        // Sorting events by date
        events.sort((a, b) => {
          const dateA = new Date(a.date.toMillis());
          const dateB = new Date(b.date.toMillis());
          return dateA - dateB;
        });
        return events;
      });

      onMounted(async () => {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const fbEventsList = [];
        for (const doc of querySnapshot.docs) {
          const attendeeIds = doc.data().attendees.map(ref => ref.id);
          const event = {
            id: doc.id,
            type: doc.data().type,
            location: doc.data().location,
            date: doc.data().date,
            attendees: doc.data().attendees,
            userAttends: attendeeIds.includes(currentUserId)
          };
          fbEventsList.push(event);
        }
        eventsList.value = fbEventsList;
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

      async function attendEvent (event) {
        const attendeeIds = event.attendees.map(ref => ref.id);
        const attendeeIndex = attendeeIds.indexOf(currentUserId);
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

      return { formatDate, attendEvent, filteredEvents, showFutureEvents, showUserEvents };
    }
  }
</script>


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

.attended, .not-attended {
  border-radius: 1.50rem;
  color: white;
  border: none;
}

.attended {
  background-color: rgb(137, 58, 58);
}

.not-attended {
  background-color: rgb(86, 157, 86);
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
  .filter-button {
    flex: 1;
    margin: 0 5px;
    border: none;
    border-radius: 1.50rem;
    color: white;
    background-color: rgb(86, 157, 86);
  }
</style>