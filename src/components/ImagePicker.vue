<template>
                <div class="text-center">
                <!-- <img id="profile-image" class="card-img-top user-avatar rounded-circle mb-3"> -->
         
      <input type="file" @change="onFileSelected">
      <button v-if="file" @click="uploadFile">Upload</button>
    </div>
  </template>
  
  <script>
//   import firebase from 'firebase/app'
//   import 'firebase/storage'
  import { ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
//   import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '@/firebase/index.js';
import { ref, onMounted, reactive } from 'vue';
  
  export default {
    props: {
    userId: {
      type: String,
      required: true,
    },
  },
    data() {
      return {
        file: null,
      }
    },
// setup () {
//     onMounted(() => {

//         getDownloadURL(storageRef(storage, `images/${this.userId}`))
//         .then((url) => {
//             const img = document.getElementById('profile-image');
//             img.setAttribute('src', url);
//         })
//         .catch((error) => {
//             // Handle any errors
//         });
//     })},
    methods: {
      onFileSelected(event) {
        this.file = event.target.files[0]
      },
      uploadFile() {

        // const stRef = storageRef(storage, `images/${Date.now()}_${imageData.value.name}`)
        // stRef.put(imageData.value).then(() => {
        //     getDownloadURL(storageRef(storage, stRef))
        // .then((url) => {

        // //   storageRef.getDownloadURL().then(url => {
        //     img1.value = url;
        //     console.log('Image URL:', this.img1);
        //   });


        // const storageRef = firebase.storage().ref()
        const stRef = storageRef(storage, `images/${this.userId}`)

        uploadBytes(stRef, this.file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            window.location.reload();
            });

        // const fileRef = stRef.child(this.file.name)
        // fileRef.put(this.file).then(() => {
        //   console.log('File uploaded successfully.')
        // }).catch(error => {
        //   console.log(error)
        // })
      },

    },
  }
  </script>
  
  <style scoped>
  .user-avatar {
      width: 220px; 
      height: 200px;
  }
</style>