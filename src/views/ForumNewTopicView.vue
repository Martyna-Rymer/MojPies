<template>
    <div>
      <h1>New Topic</h1>
      <form @submit.prevent="submitTopic">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="newTopic.title">
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea class="form-control" id="message" v-model="newTopic.message"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Publish</button>
      </form>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  
  export default {
    data() {
      return {
        newTopic: {
          title: '',
          message: '',
        },
      };
    },
    methods: {
      async submitTopic() {
        const newTopic = {
          ...this.newTopic,
          date: new Date().toISOString(),
        };
        await db.ref('topics').push(newTopic);
        this.newTopic = {
          title: '',
          message: '',
        };
        this.$router.push('/');
      },
    },
  };
  </script>
  