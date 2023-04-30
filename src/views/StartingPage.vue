<template>
    <div class="logo">
        <p><img src="/src/assets/banner.png" alt="Banner" class="banner"></p>
        <p><img src="/src/assets/dog1.png" alt="Banner" class="startingDog"></p>
    </div>
    <h1>Cześć!</h1>
    <p>Dołącz do największej społeczności psich właścicieli już dziś!</p>
    <p><button><router-link to="/sign-in">Zaloguj się</router-link></button></p>
    <p><button><router-link to="/register">Zarejestruj się</router-link></button></p>
</template>

<style>
    .banner {
        width: 20%;
        height: 20%;
        margin-left: 10%;
    }
</style>

