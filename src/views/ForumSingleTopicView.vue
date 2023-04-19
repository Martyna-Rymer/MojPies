<template>
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
  </template>
  
  <script>
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
  