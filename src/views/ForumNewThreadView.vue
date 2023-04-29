<template>
    <div>
      <form @submit.prevent="submitTopic">
        <div class="mb-3" style="width: 100%;">
          <label for="topic" class="form-label">Temat</label>
          <input type="text" class="form-control" id="topic" v-model="newTopic.topic" required>
        </div>
        <div class="mb-3" style="width: 100%;">
          <label for="description" class="form-label">Treść</label>
          <textarea class="form-control w-100" id="description" v-model="newTopic.description" rows="6" required></textarea>
        </div>
        <button class="mt-3 d-block mx-auto" type="submit" :disabled="!isFormValid">
          <img src="/src/assets/join.png" height="100" width="100">
        </button>
      </form>
    </div>
  </template>
  
  
  
  <script>
    import { db } from '@/firebase';
    import { doc, collection, addDoc } from 'firebase/firestore';
    import { useRouter, useRoute } from 'vue-router'
    import { ref, onMounted, computed } from 'vue';
    
    export default {
      setup() {
        const router = useRouter();
        const route = useRoute();
        const newTopic = ref({
          topic: '',
          description: '',
        });
  
        async function submitTopic() {
                  //Zmienic!!!!!!!!!!!!
        //   const user = auth.currentUser;
      // const userRef = doc(db, 'users', user.uid);
          const userRef = doc(db, 'users', 'xo9FaiazKTo5ATkJa7Bj');
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
          newTopic.value.topic = '';
          newTopic.value.description = '';
          router.back();
        }
  
        const isFormValid = computed(() => {
          return newTopic.value.topic && newTopic.value.description;
        });
  
        return { newTopic, submitTopic, isFormValid };
      },
    };
  </script>
  