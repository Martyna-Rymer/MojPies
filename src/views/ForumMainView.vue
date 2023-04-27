<template>
    <div class="forum">
        <img src="/src/assets/dogForum.png" alt="Dogs" class="forum-image">
        <div class="forum-sections">
            <div v-for="section in forumSections" :key="section.id">
                <!-- <router-link :to="'/section/' + key"> -->
                    <router-link :to="{ name: 'section', params: { sectionKey: section.id } }">
                <h3>{{ section.name }} (Tematów: {{ section.threadCount }})</h3>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue';
import { collection, doc, onSnapshot, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase';

const forumSections = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'forum'));

  const fbForumSections = [];
  for (const doc of querySnapshot.docs) {
    const section = { id: doc.id, name: doc.data().sectionName, threadCount: 0 };
    const threadsSnapshot = await getDocs(collection(doc.ref, 'threads'));
    section.threadCount = threadsSnapshot.size;
    fbForumSections.push(section);
  }

  forumSections.value = fbForumSections;
});

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
  </style>


<!-- <template>
    <div class="forum">
      <img src="/src/assets/dogForum.png" alt="Dogs" class="forum-image">
      <div class="forum-sections">
        <h2>Psie forum</h2>
        <ul>
          <li v-for="(section, index) in sections" :key="index">
            <router-link :to="'/section/' + section.key">
  <h3>{{ section.name }}</h3>
  <p>{{ section.topics.length }} topics</p>
  <p>{{ totalPosts(section) }} posts</p>
</router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sections: [
          {
            id: 1,
            name: 'General Discussion',
            topics: [
              { id: 1, title: 'What breed of dog do you have?', posts: 10 },
              { id: 2, title: 'Training tips', posts: 20 },
              { id: 3, title: 'Adopting a rescue dog', posts: 15 },
            ]
          },
          {
            id: 2,
            name: 'Breeds',
            topics: [
              { id: 4, title: 'Labrador Retrievers', posts: 5 },
              { id: 5, title: 'Golden Retrievers', posts: 8 },
              { id: 6, title: 'German Shepherds', posts: 12 },
            ]
          },
          {
            id: 3,
            name: 'Activities',
            topics: [
              { id: 7, title: 'Hiking with your dog', posts: 6 },
              { id: 8, title: 'Dog-friendly cafes and restaurants', posts: 3 },
              { id: 9, title: 'Dog parks in the area', posts: 4 },
            ]
          },
        ]
      }
    },
    methods: {
      totalPosts(section) {
        let total = 0;
        section.topics.forEach(topic => {
          total += topic.posts;
        });
        return total;
      }
    }
  }
  </script>
     -->
