<template>
    <p class="small text-muted mt-3 mb-1">Uczestnicy</p>
    <div v-if="attendeesData.length" v-for="attendee in attendeesData">
        <router-link :to="{ name: 'profile', params: { userId: attendee.attendeeId } }">
          <img :src="attendee.attendeeImgSrc" class="user-avatar rounded-circle" alt="User avatar">
          {{ attendee.attendeeName }}
        </router-link>
    </div>
    <p v-else><em>Nikt jeszcze nie dołączył</em></p>
    <div class="d-flex justify-content-center mt-3">
      <img :src="attendButtonSrc" width="80" height="80" @click.prevent="attendEvent()" />
    </div>
  </template>
  
<script>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router'
  import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
  import { ref as storageRef, getDownloadURL } from 'firebase/storage';
  import { db, auth, storage } from '@/firebase/index.js';
  
  export default {
    setup() {
      const currentUserId = ref(null);
      const userAttends = ref(false);
      const attendeesData = ref([])
      const route = useRoute();
  
      onMounted(async () => {
        const snap = await getDoc(doc(db, `events/${route.params.key}`));
        const docData = snap.data();
        const attendeeIds = docData.attendees.map(ref => ref.id);
        const attendees = await Promise.all(docData.attendees.map(async (ref) => {
        const attendee = await getUserData(ref);
        let imageSrc;
        await getDownloadURL(storageRef(storage, `images/${ref.id}`))
        .then((url) => {
            imageSrc = url
        })
        .catch((error) => {
            imageSrc = '/MojPies/profile.png'
        });
        return {
            attendeeId: ref.id,
            attendeeName: attendee.name,
            attendeeImgSrc: imageSrc
        };
        }));
        attendeesData.value = attendees;

        if (auth.currentUser) {
          currentUserId.value = auth.currentUser.uid;
          const userId = auth.currentUser.uid;
          userAttends.value = attendeeIds.includes(userId);
        }
      });
  
      async function attendEvent() {
        const snap = await getDoc(doc(db, `events/${route.params.key}`));
        const docData = snap.data();
        const attendeeIds = docData.attendees.map(ref => ref.id);
        console.log(attendeeIds)

        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const userRef = doc(db, 'users', userId);
            const attendeeIndex = attendeeIds.indexOf(userRef.id);
            const eventRef = doc(db, 'events', route.params.key);

            if (attendeeIndex === -1) {
            const fbAttendee = await getUserData(userRef)
            await updateDoc(eventRef, {
                attendees: arrayUnion(userRef)
            }).then(async () => {
                console.log('User added to attendees array');
                userAttends.value = true;
                let imageSrc;
                await getDownloadURL(storageRef(storage, `images/${userId}`))
                .then((url) => {
                    imageSrc = url
                })
                .catch((error) => {
                    imageSrc = '/MojPies/profile.png'
                });
                attendeesData.value.push({
                attendeeId: userId,
                attendeeName: fbAttendee.name,
                attendeeImgSrc: imageSrc
                });
            }).catch((error) => {
                console.error(error);
            });
            } else {
            await updateDoc(eventRef, {
                attendees: arrayRemove(userRef)
            }).then(() => {
                console.log('User removed from attendees array');
                userAttends.value = false;
                attendeesData.value = attendeesData.value.filter((attendee) => attendee.attendeeId !== userId);
            }).catch((error) => {
                console.error(error);
            });
            }
            var audio = new Audio('/MojPies/bark.mp3');
            audio.play();
        }
        }

  
      const attendButtonSrc = computed(() => {
        return userAttends.value ? '/MojPies/leave.png' : '/MojPies/join.png';
      });

    async function getUserData (userRef)  {
        const userDoc = await getDoc(userRef);
        return {name: userDoc.data().name, id: userDoc.id};
    }
      return { attendEvent, attendButtonSrc, attendeesData };
    }
  }
</script>

<style>
  .user-avatar {
      width: 15px; 
      height: 15px;
  }
</style>
  