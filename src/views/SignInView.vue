<template>
    <img src="/src/assets/banner.png" alt="Banner" class="banner-image mb-3">

    <h1>Zaloguj się do swojego konta</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Hasło" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="signIn">Zaloguj się</button></p>
    <p><button @click="signInWithGoogle">Zaloguj się przy pomocy swojego konta Google</button></p>
</template>


<script setup>

import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "../router";
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "@/firebase";


const email = ref("");
const password = ref("");
const errMsg = ref()
const signIn = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Successfully signed in!");
            console.log(auth.currentUser);
            router.push({ name: 'profile', params: { userId: auth.currentUser.uid } })
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Nieprawidłowy email";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "Brak użytkownika o podanym adresie email";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Nieprawidłowe hasło";
                    break;
                default:
                    errMsg.value = "Nieprawidłowy email lub hasło";
                    break;
            };
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
            router.push({ name: 'profile', params: { userId: auth.currentUser.uid } })
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(error.message);
  });
}
</script>