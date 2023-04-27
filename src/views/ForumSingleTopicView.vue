<template>
  <div v-if="currentThread">
    {{ currentThread.threadTopic }}
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
  <!-- Zmienic z routera na push to answers -->
    <router-link to="/forumRespondThread" class="add-event-button">
      <!-- Zmienic obrazek na Odpowiedz!! -->
      <img class="bottom-button" src="/src/assets/join.png" height="100" width="100"> 
 
    </router-link>
  </div>
</template>

<script>
  
  import { db } from '@/firebase';
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue';
  import { getDoc, doc } from 'firebase/firestore';
  

  export default {
    setup() {
      const threadResponse = ref('');
      const currentThread = ref();

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
        const snap = await getDoc(doc(db, `forum/${route.params.sectionKey}/threads/${route.params.threadId}`));
        const docData = snap.data();
        const answers = docData.answers.map(async (answer) => {
          const authorName = await getAuthorName(answer.author);
          return {
            date: answer.date,
            answer: answer.answer,
            authorName: authorName
          };
        });
        const threadAuthorName = await getAuthorName(docData.authorRef);
        const thread = { id: snap.id, threadTopic: docData.topic, threadDescription: docData.description, threadAuthor: threadAuthorName, threadStartDate: docData.date, answers: await Promise.all(answers) };
        currentThread.value = thread;
      });
      return {
        currentThread,
        formatDate,
        threadResponse
      }
    }
}
</script>




<!-- <template> -->
    <!-- <div>
      <h1>{{ thread.title }}</h1>
      <p>{{ thread.description }}</p>
      <hr>
      <div v-for="(answer, index) in answers" :key="index">
        <img :src="answer.author.avatar" :alt="answer.author.name" width="50">
        <h3>{{ answer.author.name }} <small>{{ answer.date }}</small></h3>
        <p>{{ answer.text }}</p>
        <hr>
      </div> -->
      <!-- <form @submit.prevent="submitAnswer">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="newAnswer.author.name">
        </div>
        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input type="text" class="form-control" id="avatar" v-model="newAnswer.author.avatar">
        </div>
        <div class="form-group">
          <label for="text">Answer</label>
          <textarea class="form-control" id="text" v-model="newAnswer.text"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Respond</button>
      </form> -->
    <!-- </div> -->
  <!-- </template> -->
  
  <!-- <script>
  import { db } from '@/firebase';
  
  export default {
    data() {
      return {
        thread: null,
        answers: [],
        newAnswer: {
          author: {
            name: '',
            avatar: '',
          },
          text: '',
        },
      };
    },
    created() {
      this.fetchThread();
      this.fetchAnswers();
    },
    methods: {
      async fetchThread() {
        const id = this.$route.params.id;
        const snapshot = await db.ref(`threads/${id}`).once('value');
        this.thread = snapshot.val();
      },
      async fetchAnswers() {
        const id = this.$route.params.id;
        const snapshot = await db.ref(`answers`).orderByChild('threadId').equalTo(id).once('value');
        this.answers = Object.values(snapshot.val());
      },
      async submitAnswer() {
        const id = this.$route.params.id;
        const newAnswer = {
          ...this.newAnswer,
          date: new Date().toISOString(),
          threadId: id,
        };
        await db.ref('answers').push(newAnswer);
        this.answers.push(newAnswer);
        this.newAnswer = {
          author: {
            name: '',
            avatar: '',
          },
          text: '',
        };
      },
    },
  };
  </script>
   -->