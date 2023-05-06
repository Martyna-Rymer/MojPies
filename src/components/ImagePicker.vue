<template>
    <div class="text-center">
        <input type="file" @change="onFileSelected">
        <button v-if="file" @click="uploadFile">Upload</button>
    </div>
  </template>
  
<script>
    import { ref as storageRef, uploadBytes } from 'firebase/storage';
    import { storage } from '@/firebase/index.js';
  
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
        methods: {
        onFileSelected(event) {
            this.file = event.target.files[0]
        },
        uploadFile() {
            const stRef = storageRef(storage, `images/${this.userId}`)
            uploadBytes(stRef, this.file).then((snapshot) => {
                console.log('Załadowano plik');
                window.location.reload();
            });
        },
        },
    }
  </script>