<template>
    <div class="container" style="margin-bottom: 50px;">
      <img src="/src/assets/dogForum.png" alt="Dogs" class="forum-image">
      <div v-if="currentSection">
        <h1 class="text-center">{{ currentSection.sectionName }}</h1>
          <div class="col-9">
            <hr>
            <div v-if="threads">
              <div v-for="(thread, index) in threads" :key="index" class="card mb-1">
                <router-link :to="{ name: 'forumThread', params: { sectionKey: currentSection.id, threadId: thread.id } }" class="card-title">
                <div class="card-body">
                    {{ thread.topic }}
                  <p class="card-text text-muted">
                    <small>
                      <router-link :to="{ name: 'profile', params: { userId: thread.authorData.id } }">
                        <img :src="thread.imageSrc" class="user-avatar rounded-circle" alt="User avatar">
                        {{ thread.authorData.name }}
                      </router-link>, {{ formatDate(thread.date) }}
                    </small>
                  </p>
                </div>
                </router-link>
              </div>
            </div>
          </div>
        <div class="text-center mt-3">
          <router-link :to="{ name: 'forumNewThread', params: { sectionKey: currentSection.id } }">
            <img class="bottom-button" src="/src/assets/add_h.png" width="150"> 
          </router-link>
        </div>
      </div>
    </div>
    <NavBarComponent />
</template>
  
  
<script>

  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue';
  import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
  import { ref as storageRef, getDownloadURL } from 'firebase/storage';
  import { db, storage } from '@/firebase/index.js';
  import NavBarComponent from '@/components/NavBarComponent.vue';
  

  export default {
    components: {  NavBarComponent },
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

                let imageSrc;
                await getDownloadURL(storageRef(storage, `images/${route.params.userId}`))
                .then((url) => {
                    imageSrc = url
                })
                .catch((error) => {
                    imageSrc = '/src/assets/profile.png'
                });

                return { id: doc.id, date: data.date, ...data, authorData: authorData, imageSrc: imageSrc};
            }))

            threads.value.sort((a, b) => {
                const dateA = new Date(a.date.toMillis());
                const dateB = new Date(b.date.toMillis());
                return dateA - dateB;
            });
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
  .user-avatar {
      width: 20px; 
      height: 20px;
  }
</style>


