<template>
    <div>
      <form @submit.prevent="submitTopic">
        <div class="form-group">
          <label for="topic">Temat</label>
          <input type="text" class="form-control" id="topic" v-model="newTopic.topic">
        </div>
        <div class="form-group">
          <label for="description">Treść</label>
          <textarea class="form-control" id="description" v-model="newTopic.description"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Opublikuj</button>
      </form>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import { doc, collection, addDoc } from 'firebase/firestore';
  import { useRouter, useRoute } from 'vue-router'
  
  export default {
    setup() {
    const router = useRouter();
    const route = useRoute();
    
    const newTopic = {
      topic: '',
      description: '',
    };
      async function submitTopic() {
        //Zmienic!!!!!!!!!!!!
        //   const user = auth.currentUser;
      // const userRef = doc(db, 'users', user.uid);
      const userRef = doc(db, 'users', 'xo9FaiazKTo5ATkJa7Bj');
      const topic = {
        topic: this.newTopic.topic,
        description: this.newTopic.description,
        date: new Date(),
        authorRef: userRef,
        answers: [],
      };
      const path = `forum/${route.params.sectionKey}/threads`;
      const collectionRef = collection(db, path);
    await addDoc(collectionRef, topic);
      this.newTopic.topic = '';
      this.newTopic.description = '';
      router.back();
    }

      return { newTopic, submitTopic };
    },
  };
  </script>
