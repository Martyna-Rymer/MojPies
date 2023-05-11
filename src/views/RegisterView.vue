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
import { auth, db } from "@/firebase";
import { getDoc, doc } from "firebase/firestore";


const email = ref("");
const password = ref("");
const errMsg = ref("");

const validateEmail = () => {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email.value)) {
    errMsg.value = "Podaj poprawny format adresu email";
    return false;
  }
  return true;
};

const validatePassword = () => {
  if (password.value.length < 5) {
    errMsg.value = "Hasło musi zawierać przynajmniej 5 znaków";
    return false;
  }
  return true;
};

const register = () => {
    if (!validateEmail() || !validatePassword()) {
      alert(errMsg.value);
      return;
    }
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

      // Sprawdzamy, czy użytkownik o podanym uid istnieje w bazie danych Firebase
      getDoc(doc(db, "users", auth.currentUser.uid))
        .then((doc) => {
          if (doc.exists()) {
            // Jeśli użytkownik istnieje, przekieruj do strony "profile"
            router.push({ name: "profile", params: { userId: auth.currentUser.uid } });
          } else {
            // Jeśli użytkownik nie istnieje, przekieruj do strony "editprofile"
            router.push({ name: "editprofile", params: { userId: auth.currentUser.uid } });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      alert(error.message);
    });
};
</script>