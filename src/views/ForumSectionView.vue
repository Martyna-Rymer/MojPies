<template>
    <div>
      <h1>{{ section.name }}</h1>
      <ul>
        <li v-for="(thread, index) in section.threads" :key="index">
          <router-link :to="'/section/' + section.key + '/thread/' + thread.id">{{ thread.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import router from '@/router';
  import { useRouter, useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  


  export default {
  setup() {
    const route = useRoute();
    const section = ref({ key: '', name: '', threads: [] });
    const sectionId = route.params.key;

    onMounted(async () => {
      const sectionRef = collection(db, 'forum').doc(sectionId);
      const threadRef = collection(sectionRef, 'threads');
      const threadsSnapshot = await getDocs(threadRef);
      const threads = threadsSnapshot.docs.map((doc) => {
        return { id: doc.id, title: doc.data().title };
      });

      section.value = { key: sectionId, name: sectionRef.name, threads: threads };
    });

//     onMounted(async () => {
//   const querySnapshot = await getDocs(collection(db, 'forum'));

//   const fbForumSections = [];
//   for (const doc of querySnapshot.docs) {
//     const section = { id: doc.id, name: doc.data().sectionName, threadCount: 0 };
//     const threadsSnapshot = await getDocs(collection(doc.ref, 'threads'));
//     section.threadCount = threadsSnapshot.size;
//     fbForumSections.push(section);
//   }

//   forumSections.value = fbForumSections;

    return {
      section,
    };
  },
};

//   export default {
//     router, 
//     setup() {
//         const router = useRouter()
//         const route = useRoute()
//         const section = ref();
  

//         const fetchSection = async () => {
//   const sectionId = route.params.key;
//   const sectionRef = collection(db, 'forum').doc(sectionId);
//   const threadRef = sectionRef.collection('threads');
//   const threadsSnapshot = await getDocs(threadRef);
//   const threads = threadsSnapshot.docs.map((doc) => {
//     return { id: doc.id, title: doc.data().title };
//   });

//   section.value = { key: sectionId, name: sectionRef.id, threads: threads };
// };

// fetchSection();



    //   const fetchSection = async () => {
    //     const sectionId = route.params.key;
    //     const sectionRef = collection(db, 'forum').doc(sectionId);
    //     const threadRef = collection(sectionRef, 'threads');
    //     const threadsSnapshot = await getDocs(threadRef);
    //     const threads = threadsSnapshot.docs.map((doc) => {
    //       return { id: doc.id, title: doc.data().title };
    //     });
  
    //     section.value = { key: key, name: sectionRef.name, threads: threads };
    //   };
  
    //   fetchSection();
  
//       return {
//         section,
//       };
//     },
//   };
  </script>
  


