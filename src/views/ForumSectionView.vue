<template>
    <div class="container mt-4">
      <img src="/src/assets/dogForum.png" alt="Dogs" class="forum-image">
      <div v-if="currentSection">
        <h1 class="text-center">{{ currentSection.sectionName }}</h1>
        <div class="row justify-content-center">
          <div class="col-9">
            <hr>
            <div v-if="threads">
              <div v-for="(thread, index) in threads" :key="index" class="card mb-1">
                <div class="card-body">
                  <router-link :to="{ name: 'forumThread', params: { sectionKey: currentSection.id, threadId: thread.id } }" class="card-title">{{ thread.topic }}</router-link>
                  <p class="card-text text-muted">
                    <small>
                      <router-link :to="{ name: 'profile', params: { userId: thread.authorData.id } }">{{ thread.authorData.name }}</router-link>, {{ formatDate(thread.date) }}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <router-link :to="{ name: 'forumNewThread', params: { sectionKey: currentSection.id } }">
            <img class="bottom-button" src="/src/assets/add.png" height="100" width="100">
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>

  import { db } from '@/firebase';
  import { useRoute } from 'vue-router'
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

        const getAuthorData = async (authorRef) => {
            const authorDoc = await getDoc(authorRef);
            return {name: authorDoc.data().name, id: authorDoc.id};
        }

        onMounted(async () => {
            const route = useRoute();
            const snap = await getDoc(doc(db, `forum/${route.params.sectionKey}`));
            const docData = snap.data();
            const section = { id: snap.id, sectionName: docData.sectionName };
            currentSection.value = section;
    
            const threadSnap = await getDocs(collection(db, `forum/${route.params.sectionKey}/threads`));
            threads.value = await Promise.all(threadSnap.docs.map(async (doc) => {
                const data = doc.data();
                const authorData = await getAuthorData(data.authorRef);
                return { id: doc.id, date: data.date, ...data, authorData: authorData};
            }).sort((a, b) => new Date(a.date) - new Date(b.date)));
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
.card {
  width: 125%;
}
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


