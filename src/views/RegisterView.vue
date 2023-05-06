<template>
    <img src="/src/assets/banner.png" alt="Banner" class="banner-image">

    <h1>Utwórz swoje konto</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Hasło" v-model="password" /></p>

    <p><button @click="register">Zarejestruj się</button></p>
    <p><button @click="signInWithGoogle">Zaloguj się przy pomocy swojego konta Google</button></p>
</template>


<script setup>

import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import router from "../router";
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "@/firebase";


const email = ref("");
const password = ref("");
const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Successfully registered!");
            console.log(auth.currentUser)
            router.push({ name: 'editprofile', params: { userId: auth.currentUser.uid } })
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(auth.currentUser)
            router.push({ name: 'editprofile', params: { userId: auth.currentUser.uid } })
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorMessage)
            alert(error.message);
  });
}
</script>