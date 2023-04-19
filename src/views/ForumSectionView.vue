<template>
    <div>
      <h1>{{ section.name }}</h1>
      <ul>
        <li v-for="(thread, index) in section.threads" :key="index">
          <router-link :to="'/section/' + section.key + '/thread/' + thread.id">{{ thread.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import router from '@/router';
  import { useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  
  export default {
    router, 
    setup() {
        const router = useRouter()
    const route = useRoute()
      const section = ref(null);
  
      const fetchSection = async () => {
        const key = this.$route.params.key;
        const sectionRef = collection(db, 'forum').doc(key);
        const threadRef = collection(sectionRef, 'threads');
        const threadsSnapshot = await getDocs(threadRef);
        const threads = threadsSnapshot.docs.map((doc) => {
          return { id: doc.id, title: doc.data().title };
        });
  
        section.value = { key: key, name: sectionRef.name, threads: threads };
      };
  
      fetchSection();
  
      return {
        section,
      };
    },
  };
  </script>
  


