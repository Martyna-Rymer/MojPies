<template>
    <img src="/src/assets/dogForum.png" alt="Dogs" class="forum-image">
    <div v-if="currentSection">
      <h1>{{ currentSection.sectionName }}</h1>
      <div class="forum-sections">
        <div v-if="threads">
            <div v-for="(thread, index) in threads" :key="index"  class="thread-item">
                <router-link :to="{ name: 'forumThread', params: { sectionKey: currentSection.id,  threadId: thread.id} }">{{ thread.topic }}</router-link>
                <p>{{ thread.userName }}, {{ formatDate(thread.date) }}</p>
            </div>
        </div>
      </div>
      <div>
        <router-link :to="{ name: 'forumNewThread', params: { sectionKey: currentSection.id} }">
      <img class="bottom-button" src="/src/assets/add.png" height="100" width="100"> 
    </router-link>
    </div>
    </div>
     
  </template>


  
  <script>

  import { db } from '@/firebase';
  import router from '@/router';
  import { useRouter, useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue';
  import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
  

  export default {
    setup() {
      const currentSection = ref();
      const threads = ref([]);
  
      const formatDate = (timestamp) => {
      const date = new Date(timestamp.toMillis());
      const dayOfMonth = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth()+1).padStart(2, '0');
      const year = date.getFullYear();
      return `${dayOfMonth}.${month}.${year}`;
    };

      onMounted(async () => {
        const route = useRoute();
        const snap = await getDoc(doc(db, `forum/${route.params.sectionKey}`));
        const docData = snap.data();
        const section = { id: snap.id, sectionName: docData.sectionName };
        currentSection.value = section;
  
        const threadSnap = await getDocs(collection(db, `forum/${route.params.sectionKey}/threads`));
        threads.value = threadSnap.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
  
        for (const [index, thread] of threads.value.entries()) {
            try {
      const userDoc = await getDoc(doc(db, thread.authorRef.path));
      const userName = userDoc.data().name;
      threads.value[index] = { ...thread, userName };
    } catch (e) {
      console.error(e);
    }}
      });
  
      return {
        currentSection,
        threads,
        formatDate,
      }
    }
}
</script>
  

<style>
  .forum-image {
    max-width: 100%;
  }
  .forum-sections {
    margin-top: 20px;
  }
  .forum-sections h2 {
    font-size: 24px;
    font-weight: bold;
  }
  .forum-sections ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .forum-sections li {
    margin: 20px 0;
  }
  
    .forum-sections h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    }
    .forum-sections p {
        margin: 0;
        font-size: 14px;
    }
    .thread-item {
    color: grey;
    }
</style>


