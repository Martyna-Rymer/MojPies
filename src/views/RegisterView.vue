<template>
    <h1>Utwórz konto</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Hasło" v-model="password" /></p>

    <p><button @click="register">Zarejestruj się</button></p>
    <p><button @click="signInWithGoogle">Zarejestruj się przy pomocy swojego konta Google</button></p>
    <!-- <img src="/src/assets/dogForum.png" alt="Dogs" class="forum-image"> -->
</template>


<script setup>

import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { useRouter } from 'vue-router'; //import router
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
            router.push('/forum')   //redirect to forum page
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
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
  });
}
</script>