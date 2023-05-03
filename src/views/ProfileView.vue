<script>
  import { db } from '@/firebase';
  import { useRoute } from 'vue-router'
  import { ref, onMounted, computed } from 'vue';
  import { getDoc, doc } from 'firebase/firestore';
  import { auth } from "@/firebase";
  import NavBarComponent from '@/components/NavBarComponent.vue';
  

  export default {
    components: { NavBarComponent },
    setup() {
        const profileData = ref();
        const isCurrentUser = ref();
        const userId = ref()

        const getAge = (year) => {
            const today = (new Date()).getFullYear();
            return today - year;
        };
    

        onMounted(async () => {
            const route = useRoute();
            const snap = await getDoc(doc(db, `users/${route.params.userId}`));
            const docData = snap.data();
            const dogs = docData.dogs.map(dog => {
                const age = getAge(dog.yearOfBirth);
                return { name: dog.name, race: dog.race, age: age };
            });
            const user = { id: snap.id, userName: docData.name, description: docData.description, city: docData.city, dogs: dogs, avatarUrl: docData.avatarUrl, favourites: docData.favourites};
            profileData.value = user;
            if (auth.currentUser) {
                isCurrentUser.value = route.params.userId == auth.currentUser.uid;
                userId.value = auth.currentUser.uid
            }
        });

        const showEditButton = computed(() => {
            return isCurrentUser.value;
        });
  
        return {
            profileData, showEditButton, userId
        }
    }
}
</script>


<template>
    <div class="container ml-2 me-2" style="margin-bottom: 70px;">
      <div v-if="profileData">
        <div v-if="showEditButton" class="d-flex flex-row-reverse mb-3">
            <router-link :to="{ name: 'editprofile', params: { userId: userId } }">
                <button class="button1">Edytuj</button>
            </router-link>
        </div>
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
    <NavBarComponent />
</template>
  
<style scoped>
    .user-avatar {
        width: 220px; 
        height: 200px;
    }

    .button1 {
        background-color: white; 
        color: #4CAF50;
        border: none;
        padding: 8px 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin: 4px 2px;
        transition-duration: 0.4s;
        cursor: pointer;
    }

    .button1:hover {
        background-color: #4CAF50;
        color: white;
    }

</style>