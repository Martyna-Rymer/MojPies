<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    methods: {
      hideMenu() {
        const navbar = document.querySelector('.navbar-collapse')
        navbar.classList.remove('show')
      }
    },
    mounted() {
      this.$router.afterEach((to, from) => {
        this.hideMenu()
      })
    }
  }
</script>

<template>
    <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
       <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link to="/" class="nav-link" active-class="active-link" @click="hideMenu">Dane autorów</router-link>
        </li>
        <li class="nav-item active">
          <router-link to="/map" class="nav-link" active-class="active-link" @click="hideMenu">Mapa</router-link>
        </li>
        <li class="nav-item active">
          <router-link to="/forum" class="nav-link" active-class="active-link" @click="hideMenu">Forum</router-link>
        </li>
       </ul>
      </div>
    </nav>
    
    <div class="container">
      <RouterView />
    </div>

</template>



<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.container {
    max-width: 1280px;
    margin-top: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

@media (min-width: 1024px) {
  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>
