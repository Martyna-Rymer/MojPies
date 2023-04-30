<template>
    <div class="forum" style="margin-bottom: 50px;">
      <img src="/src/assets/dogForum.png" alt="Dogs" class="forum-image">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="w-75">
          <hr>
          <div v-for="section in forumSections" :key="section.id">
            <router-link :to="{ name: 'section', params: { sectionKey: section.id } }" class="d-flex justify-content-between align-items-center">
              <h6>{{ section.name }}</h6>
              <p class="topics">Tematów: {{ section.threadCount }}</p>
            </router-link>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<script setup>

import { ref, onMounted, computed } from 'vue';
import { collection, doc, onSnapshot, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase';
import { auth } from "@/firebase";


const forumSections = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'forum'));

  const fbForumSections = [];
  for (const doc of querySnapshot.docs) {
    const section = { id: doc.id, name: doc.data().sectionName, threadCount: 0 };
    const threadsSnapshot = await getDocs(collection(doc.ref, 'threads'));
    section.threadCount = threadsSnapshot.size;
    fbForumSections.push(section);
    // console.log(auth.currentUser);
    
  }

  forumSections.value = fbForumSections;
});

</script>


<style>
    .topics {
        font-size: 0.8em;
        color: grey;
    }
    .forum {
    overflow: auto;
    }
    .forum-image {
        max-width: 100%;
    }
    .router-link-active,
    .router-link-exact-active {
    color: black;
    }
</style>