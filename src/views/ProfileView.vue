<script>

  import { db } from '@/firebase';
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue';
  import { getDoc, doc } from 'firebase/firestore';
  import { auth } from "@/firebase";
  

  export default {
    setup() {
        const profileData = ref();

        const getAge = (year) => {
            const today = (new Date()).getFullYear();
            return today - year;
        };
    

        onMounted(async () => {
            const route = useRoute();
            // console.log(route.params.userId)
            const snap = await getDoc(doc(db, `users/${route.params.userId}`));
            const docData = snap.data();
            const dogs = docData.dogs.map(dog => {
                const age = getAge(dog.yearOfBirth);
                return { name: dog.name, race: dog.race, age: age };
            });
            const user = { id: snap.id, userName: docData.name, description: docData.description, city: docData.city, dogs: dogs, avatarUrl: docData.avatarUrl, favourites: docData.favourites};
            profileData.value = user;
            // console.log('current user', auth.currentUser.uid)
        });
  
        return {
            profileData,
        }
    }
}
</script>


<template>
    <div class="container ml-2 me-2" style="margin-bottom: 70px;">
      <div v-if="profileData">
        <div class="row justify-content-center">
            <img :src="profileData.avatarUrl ? profileData.avatarUrl : '/src/assets/profile.png'" class="card-img-top user-avatar rounded-circle mb-3" alt="User avatar">
            <div class="col-md-9 text-center">
            <h1>{{ profileData.userName }}</h1>
          </div>
        </div>
        <div class="row justify-content-start text-left">
            <div v-if="profileData.city">
                <p class="small text-muted mt-4 mb-1">Miasto</p>
                <h2>{{ profileData.city }}</h2>
            </div>
            <div v-if="profileData.description">
              <p class="small text-muted mt-4 mb-1">Opis</p>
              <h5>{{ profileData.description }}</h5>
            </div>
            <div v-if="profileData.dogs.length > 0">
                <p class="small text-muted mt-4 mb-1">Psy:</p>
                <div v-for="dog in profileData.dogs">
                <h5><img src="/src/assets/lapa_small.png">   <b>{{  dog.name }}</b>, {{ dog.race }}, {{ dog.age }} {{ dog.age <= 1 ? ' r.' : ' l.' }}</h5>
                </div>
            </div>
            <div v-if="profileData.favourites.length > 0">
                <p class="small text-muted mt-4 mb-1">Ulubione miejsca:</p>
                <div v-for="loc in profileData.favourites">
                <h5>{{  loc }}</h5>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>
  
<style scoped>
    .user-avatar {
        width: 220px; 
        height: 200px;
    }
</style>