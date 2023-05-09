<template>
  <div v-if="currentThread" class="container"  :key="uniqueKey">
    <div class="card mb-3" style="width: 100%;">
      <div class="card-body">
        <h5 class="card-title">{{ currentThread.threadTopic }}</h5>
        <p class="card-text">{{ currentThread.threadDescription }}</p>
        <p class="card-text">
          <router-link :to="{ name: 'profile', params: { userId: currentThread.threadAuthor.id } }">
            <img :src="currentThread.threadAuthorImg" class="user-avatar rounded-circle" alt="User avatar">
            {{ currentThread.threadAuthor.name }}
          </router-link>,
          <small class="text-muted">{{ formatDate(currentThread.threadStartDate) }}</small>
        </p>
      </div>
    </div>

    <!-- <div v-for="item in currentThread.answers" class="card mb-3" style="width: 100%;"> -->
      <div v-for="item in threadAnswers" class="card mb-3" style="width: 100%;">
      <div class="card-body">
        <p class="card-text">{{ item.answer }}</p>
        <p class="card-text">
          <router-link :to="{ name: 'profile', params: { userId: item.authorId } }">
            <img :src="item.imageSrc" class="user-avatar rounded-circle" alt="User avatar">
            {{ item.authorName }}
          </router-link>,
          <small class="text-muted">{{ formatDate(item.date) }}</small>
        </p>
      </div>
      <hr class="m-0">
    </div>

    <div class="card mb-3" style="width: 100%;">
      <div class="card-body">
        <textarea v-model="threadResponse" class="form-control w-100"></textarea>
        <img class="mt-3 d-block mx-auto" src="/src/assets/send_h.png" width="150" @click="submitThreadResponse">
      </div>
    </div>
  </div>
  <NavBarComponent />
</template>


<script>
  
  // import { db, auth } from '@/firebase';
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue';
  import { ref as storageRef, getDownloadURL } from 'firebase/storage';
  import { db, auth, storage } from '@/firebase/index.js';
  import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
  import NavBarComponent from '@/components/NavBarComponent.vue';
  // import router from "../router";
  import { getCurrentInstance } from 'vue';
  

  export default {
    components: { NavBarComponent },
    setup() {
      const threadResponse = ref('');
      const currentThread = ref();
      const path = ref();
      const threadAnswers = ref([])
      // const sectionKey = ref();
      // const threadId = ref();
      // const uniqueKey = ref(0);

      const formatDate = (timestamp) => {
        const date = new Date(timestamp.toMillis());
        const dayOfMonth = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()+1).padStart(2, '0');
        const year = date.getFullYear();
        const hour = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`;
      };
      
      const getAuthorData = async (authorRef) => {
        const authorDoc = await getDoc(authorRef);

        return {name: authorDoc.data().name, id: authorDoc.id};
      }

      onMounted(async () => {
        const route = useRoute();
        path.value = `forum/${route.params.sectionKey}/threads/${route.params.threadId}`;
        // sectionKey.value = route.params.sectionKey;
        // threadId.value = route.params.threadId;
        let imageSrc;
        const snap = await getDoc(doc(db, `forum/${route.params.sectionKey}/threads/${route.params.threadId}`));
        const docData = snap.data();
        const answers = docData.answers.map(async (answer) => {
        const authorData = await getAuthorData(answer.author);

        
        await getDownloadURL(storageRef(storage, `images/${authorData.id}`))
        .then((url) => {
            imageSrc = url
        })
        .catch((error) => {
            imageSrc = '/MojPies/profile.png'
        });

        return {
          date: answer.date,
          answer: answer.answer,
          authorName: authorData.name,
          authorId: authorData.id,
          imageSrc: imageSrc
        };
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
        const threadAuthorData = await getAuthorData(docData.authorRef);
        await getDownloadURL(storageRef(storage, `images/${threadAuthorData.id}`))
        .then((url) => {
            imageSrc = url
        })
        .catch((error) => {
            imageSrc = '/MojPies/profile.png'
        });
        const thread = { id: snap.id, threadTopic: docData.topic, threadDescription: docData.description, threadAuthor: threadAuthorData, threadAuthorImg: imageSrc, threadStartDate: docData.date, answers: await Promise.all(answers) };
        currentThread.value = thread;
        threadAnswers.value = await Promise.all(answers);
      });

      const updateThread = async () => {
        const threadRef = doc(db, path.value);
        if (auth.currentUser) {
          const userId = auth.currentUser.uid;
          const userRef = doc(db, 'users', userId);
          await updateDoc(threadRef, {
            answers: arrayUnion({
              answer: threadResponse.value,
              date: new Date(),
              author: userRef,
            })
          });

          var audio = new Audio('/MojPies/bark.mp3')
          audio.play();

          let imageSrc;
          await getDownloadURL(storageRef(storage, `images/${userId}`))
        .then((url) => {
            imageSrc = url
        })
        .catch((error) => {
            imageSrc = '/MojPies/profile.png'
        });
          
        let authorDoc = await getDoc(authorRef);

          threadAnswers.value.push({
            date: new Date(),
          answer: threadResponse.value,
          authorName: authorDoc.name,
          authorId: userId,
          imageSrc: imageSrc}

          )
          threadResponse.value = '';
          // console.log(sectionKey)
          // uniqueKey.value += 1; 

  //         const instance = getCurrentInstance();
  // instance.proxy.forceUpdate();
          // setTimeout(() => {
          //   console.log('before router');
          // window.location.reload();
          //   router.push({ name: 'forumThread', params: { sectionKey: sectionKey, threadId: threadId } });
          // }, 5000);

          
          // router.back
          // window.location.reload();
        }
      }

      const submitThreadResponse = async () => {
        if (threadResponse.value.trim() !== '') {
          await updateThread();
        }
      }

      return {
        currentThread,
        formatDate,
        threadResponse,
        submitThreadResponse,
        path,
        threadAnswers
        // sectionKey,
        // threadId,
        // uniqueKey,
      }
    }
  }
</script>

<style>
  .container {
    max-width: 800px; 
    margin-bottom: 50px;
  }
  .user-avatar {
        width: 20px; 
        height: 20px;
  }
</style>