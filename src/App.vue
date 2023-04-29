<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  data() {
    return {
      pageTitle: 'Profil',
    };
  },
  watch: {
    '$route'(to, from) {
      this.pageTitle = to.meta.pageTitle;
    }
  }
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid d-flex justify-content-between">
          <a @click="$router.back()">
          <font-awesome-icon :icon="['fas', 'arrow-left']" /></a>
        <span class="navbar-text">
          {{ pageTitle }}
        </span>
    </div>
  </nav>
  <div class="container">
    <RouterView />
  </div>
  <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
    <div class="justify-content-center" id="navbarNav">
        <router-link to="/" class="nav-link" active-class="active-link">
          <img class="mobile-only" src="/src/assets/profile.png" width="50" height="50">
          <span class="desktop-only">Profil</span>
        </router-link>
        <router-link to="/forum" class="nav-link" active-class="active-link">
          <img class="mobile-only" src="/src/assets/forum.png" width="50" height="50">
          <span class="desktop-only">Forum</span>
        </router-link>
        <router-link to="/events" class="nav-link" active-class="active-link">
          <img class="mobile-only" src="/src/assets/calendar.png" width="50" height="50">
          <span class="desktop-only">Wydarzenia</span>
        </router-link>
    </div>
  </nav>
</template>

<style scoped>
  .mobile-only {
    display: block;
  }

  .desktop-only {
    display: none;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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

  .navbar-text,
  .desktop-only {
    font-size: 18px;
  }

  .navbar {
  display: flex;
  align-items: center;
}

.navbar-text {
  flex-grow: 1; 
  text-align: center;
}

  @media (min-width: 576px) {
    .mobile-only {
      display: none;
    }

    .desktop-only {
      display: inline-block;
    }
  }
</style>
