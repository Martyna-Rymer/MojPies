<template>


</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase';



onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'forum'));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
})

</script>