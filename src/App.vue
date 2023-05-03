<script>
import { RouterView } from 'vue-router'
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
          <font-awesome-icon :icon="['fas', 'arrow-left']"  color="white"/></a>
        <span class="navbar-text">
          {{ pageTitle }}
        </span>
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

  .navbar-text {
    font-size: 18px;
    color: white;
  }

  .navbar {
  display: flex;
  align-items: center;
  z-index: 9999;
}

.navbar-text {
  flex-grow: 1; 
  text-align: center;
}
</style>
