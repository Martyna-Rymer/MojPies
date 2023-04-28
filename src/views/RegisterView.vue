<template>
    <h1>Utwórz konto</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Hasło" v-model="password" /></p>
    
    <p><button @click="register">Zarejestruj się</button></p>
    <p><button @click="signInWithGoogle">Zarejestruj się przy pomocy swojego konta Google</button></p>
</template>


<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router' //import router
import router from "../router";
const email = ref("");
const password = ref("");
const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Successfully registered!");
            router.push('/forum')   //redirect to forum page
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })
};
const signInWithGoogle = () => {

}
</script>