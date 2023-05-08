<template>
    <div class="container ml-2 me-2" style="margin-bottom: 70px;">
        <div v-if="profileData">
            <div class="text-center">
                <img id="profile-image" class="card-img-top user-avatar rounded-circle mb-3">
            </div>
            <div><ImagePicker :user-id="userId" /></div>
            <form @submit.prevent="saveChanges">
            <div class="form-group">
                <label for="profileData.userName">Nazwa użytkownika</label>
                <input type="text" class="form-control" id="name" v-model="profileData.name" required>
            </div>
            <div class="form-group">
                <label for="profileData.city">Miejscowość</label>
                <input type="text" class="form-control" id="city" v-model="profileData.city">
            </div>
            <div class="form-group">
                <label for="profileData.description">Opis</label>
                <textarea class="form-control" id="description" rows="3" v-model="profileData.description"></textarea>
            </div>
            <div class="form-group">
                <label for="profileData.favourite-places">Ulubione miejsca na wyjścia z psem</label>

                <div v-for="(loc, index) in profileData.favourites" :key="index">
                <div class="form-row">
                    <div class="col">
                    <input type="text" class="form-control" v-model="profileData.favourites[index]">
                    </div>
                    <div class="col-auto">
                    <button type="button" class="btn btn-danger" @click="removePlace(index)">Usuń</button>
                    </div>
                </div>
                </div>
                <div><button type="button" class="btn btn-success mt-2" @click="addPlace">Dodaj miejsce</button></div>
            </div>
            <div class="form-group">
                <label for="dogs">Psy</label>
                <div v-for="(dog, index) in profileData.dogs" :key="index">
                <div class="form-row">
                    <div class="col">
                    <input type="text" class="form-control" placeholder="Imię" v-model="dog.name">
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" placeholder="Rok urodzenia" v-model="dog.yearOfBirth">
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" placeholder="Rasa" v-model="dog.race">
                    </div>
                    <div class="col-auto">
                    <button type="button" class="btn btn-danger" @click="removeDog(index)">Usuń</button>
                    </div>
                </div>
                </div>
                <div><button type="button" class="btn btn-success mt-2" @click="addDog">Dodaj psa</button></div>
            </div>
            <button type="submit" class="d-block mx-auto mt-3"><img src="/src/assets/save_h.png" width="150" @click="saveChanges"></button>
            </form>
        </div>
    </div>
    <NavBarComponent />
</template>



<script>
import { db } from '@/firebase';
import { useRoute } from 'vue-router'
import { ref as vueRef, onMounted, reactive } from 'vue';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import router from '../router';
import NavBarComponent from '@/components/NavBarComponent.vue';
import ImagePicker from '@/components/ImagePicker.vue';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/index.js';


export default {
  components: { NavBarComponent, ImagePicker },
  setup() {
    const userId = vueRef()
    const profileData = reactive({
      id: null,
      name: '',
      city: '',
      description: '',
      favourites: [],
      dogs: []
    })

    onMounted(async () => {

        const route = useRoute();
        console.log(route.params.userId)
        userId.value = route.params.userId
        const docSnap = await getDoc(doc(db, `users/${route.params.userId}`));

        const docData = docSnap.data()

        profileData.id = route.params.userId
        profileData.name = docData.name
        profileData.city = docData.city
        profileData.description = docData.description
        profileData.favourites = docData.favourites || []
        profileData.dogs = docData.dogs || []

        const img = document.getElementById('profile-image');
        getDownloadURL(storageRef(storage, `images/${route.params.userId}`))
        .then((url) => {
            img.setAttribute('src', url);
        })
        .catch((error) => {
            img.setAttribute('src', '/MojPies/profile.png');
        });

    })

    const addDog = () => {
      profileData.dogs.push({ name: '', yearOfBirth: '', race: '' })
    }

    const removeDog = (index) => {
      profileData.dogs.splice(index, 1)
    }

    const addPlace = () => {
      profileData.favourites.push('')
    }

    const removePlace = (index) => {
      profileData.favourites.splice(index, 1)
    }
  

    async function saveChanges() {
      const userDoc = doc(db, 'users', userId.value)
      try {
        await setDoc(userDoc, {
          name: profileData.name,
          city: profileData.city,
          description: profileData.description,
          favourites: profileData.favourites,
          dogs: profileData.dogs
        })

        console.log('Changes saved successfully!')
        router.push({ name: 'profile', params: { userId: userId.value } })
      } catch (error) {
        console.log('Error saving changes: ', error)
      }
    }

    return {
      userId,
      profileData,
      addDog,
      removeDog,
      addPlace,
      removePlace,
      saveChanges,
    }
  }
}

</script>

<style scoped>
    .user-avatar {
        width: 220px; 
        height: 200px;
    }
</style>