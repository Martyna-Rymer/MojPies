<template>
  <div>
    <form @submit.prevent="submitTopic">
      <div class="mb-3 row">
        <label for="topic" class="form-label col-md-2">Temat</label>
        <div class="col-md-12">
          <input type="text" class="form-control" id="topic" v-model="newTopic.topic" required>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="description" class="form-label col-md-2">Treść</label>
        <div class="col-md-12">
          <textarea class="form-control w-100" id="description" v-model="newTopic.description" rows="6" required></textarea>
        </div>
      </div>
      <button class="mt-3 d-block mx-auto" type="submit" :disabled="!isFormValid">
        <img src="/src/assets/add_h.png">
      </button>
    </form>
  </div>
  <NavBarComponent />
</template>
  
<script>
    import { db, auth } from '@/firebase';
    import { doc, collection, addDoc } from 'firebase/firestore';
    import { useRouter, useRoute } from 'vue-router'
    import { ref, computed } from 'vue';
    import NavBarComponent from '@/components/NavBarComponent.vue';
    
    export default {
    components: {  NavBarComponent },
      setup() {
        const router = useRouter();
        const route = useRoute();
        const newTopic = ref({
          topic: '',
          description: '',
        });
  
        async function submitTopic() {
          if (auth.currentUser) {
              const userId = auth.currentUser.uid;
              const userRef = doc(db, 'users', userId);
              const topic = {
                topic: newTopic.value.topic,
                description: newTopic.value.description,
                date: new Date(),
                authorRef: userRef,
                answers: [],
              };
              const path = `forum/${route.params.sectionKey}/threads`;
              const collectionRef = collection(db, path);
              await addDoc(collectionRef, topic);

              var audio = new Audio('/MojPies/bark.mp3')
              audio.play();

              newTopic.value.topic = '';
              newTopic.value.description = '';
              router.back();
            }
        }
  
        const isFormValid = computed(() => {
          return newTopic.value.topic && newTopic.value.description;
        });
  
        return { newTopic, submitTopic, isFormValid };
      },
    };
</script>

<style scoped>
  img {
    max-width: 250px;
  }
</style>
  