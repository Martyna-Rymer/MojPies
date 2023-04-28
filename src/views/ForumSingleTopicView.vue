<template>
  <div v-if="currentThread">
    <div>{{ currentThread.threadTopic }}</div>
    <div>{{ currentThread.threadDescription }}</div>

    <div>
      {{ currentThread.threadAuthor }}
      {{ formatDate(currentThread.threadStartDate) }}
    </div>
    <div v-for="item in currentThread.answers">
      {{ item.answer }}
      <div>
        {{ item.authorName }}
        {{ formatDate(item.date) }}
      </div>
    </div>
    <div>
    <textarea v-model="threadResponse"></textarea>
  </div>
      <!-- Zmienic obrazek na Odpowiedz!! -->
      <img class="bottom-button" src="/src/assets/join.png" height="100" width="100" @click="submitThreadResponse"> 
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
      
      const getAuthorName = async (authorRef) => {
        const authorDoc = await getDoc(authorRef);
        return authorDoc.data().name;
      }

      onMounted(async () => {
        const route = useRoute();
        path.value = `forum/${route.params.sectionKey}/threads/${route.params.threadId}`;
        
        const snap = await getDoc(doc(db, `forum/${route.params.sectionKey}/threads/${route.params.threadId}`));
        const docData = snap.data();
        const answers = docData.answers.map(async (answer) => {
          const authorName = await getAuthorName(answer.author);
          return {
            date: answer.date,
            answer: answer.answer,
            authorName: authorName
          };
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
        const threadAuthorName = await getAuthorName(docData.authorRef);
        const thread = { id: snap.id, threadTopic: docData.topic, threadDescription: docData.description, threadAuthor: threadAuthorName, threadStartDate: docData.date, answers: await Promise.all(answers) };
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
