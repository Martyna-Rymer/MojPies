<template>
  <div class="container ml-2 me-2" style="margin-bottom: 70px;">
      <div v-if="profileData">
          <ImagePicker />
          <form @submit.prevent="saveChanges">
          <div class="form-group mt-4">
              <label for="profileData.userName">Nazwa użytkownika *</label>
              <input type="text" class="form-control" id="name" v-model="profileData.name" required>
          </div>
          <div class="form-group mt-4">
              <label for="profileData.city">Miejscowość</label>
              <input type="text" class="form-control" id="city" v-model="profileData.city">
          </div>
          <div class="form-group mt-4">
              <label for="profileData.description">Opis</label>
              <textarea class="form-control" id="description" rows="3" v-model="profileData.description"></textarea>
          </div>
          <div class="form-group mt-4">
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

          <!-- <div v-for="(dog, index) in profileData.dogs" :key="index">
  <div class="form-row mb-3">
    <div class="col-lg-3 col-md-6">
      <input type="text" class="form-control" placeholder="Imię" v-model="dog.name">
    </div>
    <div class="col-lg-3 col-md-6">
      <input type="text" class="form-control" placeholder="Rok urodzenia" v-model="dog.yearOfBirth">
    </div>
    <div class="col-lg-3 col-md-6">
      <input type="text" class="form-control" placeholder="Rasa" v-model="dog.race">
    </div>
    <div class="col-lg-3 col-md-6">
      <button type="button" class="btn btn-danger" @click="removeDog(index)">Usuń</button>
    </div>
  </div>
</div> -->


<div class="form-group mt-4">
  <label for="dogs">Psy</label>
  <div v-for="(dog, index) in profileData.dogs" :key="index">
    <div class="form-row mb-3">
      <div class="col-sm-4">
        <input type="text" class="form-control" placeholder="Imię" v-model="dog.name">
      </div>
      <div class="col-sm-4">
        <input type="text" class="form-control" placeholder="Rok urodzenia" v-model="dog.yearOfBirth">
      </div>
      <div class="col-sm-4">
        <input type="text" class="form-control" placeholder="Rasa" v-model="dog.race">
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-danger" @click="removeDog(index)">Usuń</button>
      </div>
    </div>
  </div>
  <div><button type="button" class="btn btn-success mt-2" @click="addDog">Dodaj psa</button></div>
</div>


          <div class="form-group mt-4">
              <label for="dogs">Psy</label>
              <div v-for="(dog, index) in profileData.dogs" :key="index">
                <div class="form-row mb-3">
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
          <button type="submit" :disabled="!isFormValid" class="d-block mx-auto mt-3"><img src="/src/assets/save_h.png" width="150" @click="saveChanges"></button>
          </form>
      </div>
  </div>
  <div v-if="isUserRegistered"><NavBarComponent /></div>
</template>



<script>
import { auth, db } from "@/firebase";
import { useRoute } from 'vue-router'
import { ref as vueRef, onMounted, reactive, computed } from 'vue';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import router from '../router';
import NavBarComponent from '@/components/NavBarComponent.vue';
import ImagePicker from '@/components/ImagePicker.vue';


export default{
  components: { NavBarComponent, ImagePicker },
  setup() {
    const userId = vueRef()
    const initialUrl = vueRef()
    const isUserRegistered = vueRef()
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



        // Sprawdzamy, czy użytkownik o podanym uid istnieje w bazie danych Firebase.
        // Jesli tak, menu dolne zostanie wyswietlone
        getDoc(doc(db, "users", auth.currentUser.uid))
          .then((doc) => {
            if (doc.exists()) {
              isUserRegistered.value = true
            } else {
              isUserRegistered.value = false
            }
          })
          .catch((error) => {
            console.log(error);
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
  
    const isFormValid = computed(() => {
          return profileData.name != '';
        });

    async function saveChanges() {
      const userDoc = doc(db, 'users', userId.value)
      if (profileData.name != '') {
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
      else {
        alert('Proszę wypełnić wymagane pola')
      }
    }

    return {
      userId,
      initialUrl,
      profileData,
      addDog,
      removeDog,
      addPlace,
      removePlace,
      saveChanges,
      isFormValid,
      isUserRegistered
    }
  }
}

</script>