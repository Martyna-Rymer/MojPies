<template>
  <div v-if="currentThread" class="container" style="max-width: 800px;">
    <div class="card mb-3" style="width: 100%;">
      <div class="card-body">
        <h5 class="card-title">{{ currentThread.threadTopic }}</h5>
        <p class="card-text">{{ currentThread.threadDescription }}</p>
        <p class="card-text">
          <router-link :to="{ name: 'profile', params: { userId: currentThread.threadAuthor.id } }">
            {{ currentThread.threadAuthor.name }}
          </router-link>,
          <small class="text-muted">{{ formatDate(currentThread.threadStartDate) }}</small>
        </p>
      </div>
    </div>

    <div v-for="item in currentThread.answers" class="card mb-3" style="width: 100%;">
      <div class="card-body">
        <p class="card-text">{{ item.answer }}</p>
        <p class="card-text">
          <router-link :to="{ name: 'profile', params: { userId: item.authorId } }">
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

        <!-- Zmienic obrazek na Odpowiedz!!  -->
        <img class="mt-3 d-block mx-auto" src="/src/assets/join.png" height="100" width="100" @click="submitThreadResponse">
      </div>
    </div>
  </div>
</template>


<script>
  
  import { db } from '@/firebase';
  import { useRouter, useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue';
  import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
  

  export default {
    setup() {
      const threadResponse = ref('');
      const currentThread = ref();
      const path = ref();

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
        const snap = await getDoc(doc(db, `forum/${route.params.sectionKey}/threads/${route.params.threadId}`));
        const docData = snap.data();
        const answers = docData.answers.map(async (answer) => {
          const authorData = await getAuthorData(answer.author);
          return {
            date: answer.date,
            answer: answer.answer,
            authorName: authorData.name,
            authorId: authorData.id
          };
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
        const threadAuthorData = await getAuthorData(docData.authorRef);
        const thread = { id: snap.id, threadTopic: docData.topic, threadDescription: docData.description, threadAuthor: threadAuthorData, threadStartDate: docData.date, answers: await Promise.all(answers) };
        currentThread.value = thread;
      });

      const updateThread = async () => {
        const threadRef = doc(db, path.value);
        //Zmienic!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //   const user = auth.currentUser;
      // const userRef = doc(db, 'users', user.uid);
        const userRef = doc(db, 'users', 'xo9FaiazKTo5ATkJa7Bj');
        await updateDoc(threadRef, {
          answers: arrayUnion({
            answer: threadResponse.value,
            date: new Date(),
            author: userRef,
          })
        });
        threadResponse.value = '';
        window.location.reload();
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
        path
      }
    }
  }
</script>