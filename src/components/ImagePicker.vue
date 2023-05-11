<template>
    <div class="text-center">
        <div class="text-center">
                <img id="profile-image" class="card-img-top user-avatar rounded-circle mb-3">
            </div>
        <input type="file" @change="onFileSelected">
        <!-- <input type="file" accept="image/*" capture="camera" @change="onFileSelected"> -->

        <button v-if="file" @click="uploadFile">Zapisz zdjęcie</button>
    </div>
  </template>
  
<script>
    import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { auth, storage } from '@/firebase/index.js';
    import { ref, onMounted } from 'vue';
  

    export default {
      setup() {
        const userId = ref()
        const file = ref()


        onMounted(async () => {
            if (auth.currentUser) {
                userId.value = auth.currentUser.uid
                const img = document.getElementById('profile-image');
                getDownloadURL(storageRef(storage, `images/${auth.currentUser.uid}`))
                .then((url) => {
                    img.setAttribute('src', url);
                })
                .catch((error) => {
                    img.setAttribute('src', '/public/profile.png');
                });
            }

        })
        return {file, userId}

      },
      methods: {
        onFileSelected: function(event) {
          this.file = event.target.files[0]
          console.log(this.file)
          let imageUrl = URL.createObjectURL(this.file);
          const img = document.getElementById('profile-image');
          img.setAttribute('src', imageUrl);
        },

        uploadFile: function() {
          const stRef = storageRef(storage, `images/${this.userId}`)
          uploadBytes(stRef, this.file).then((snapshot) => {
            console.log('Załadowano plik');
          });
          this.file = null
        }
      }
    }
  </script>

<style scoped>
.user-avatar {
    width: 220px; 
    height: 200px;
}
</style> 



