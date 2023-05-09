<script>
    import { ref } from 'vue';
    import { auth } from '@/firebase';
    import { RouterLink } from 'vue-router'

    export default {
        setup() {
        const currentUserId = ref(null);
        const user = auth.currentUser;
        if (user) {
            currentUserId.value = user.uid;
        }
        console.log(currentUserId.value);
        return { currentUserId};
        }
    }
</script>

<!-- <script setup>
    import { ref } from 'vue';
    import { auth } from '@/firebase';
    import { RouterLink } from 'vue-router'

    // export default {
    //     setup() {
      const currentUserId = await auth.currentUser.id
        // const currentUserId = ref(null);
        // const user = auth.currentUser;
        // if (user) {
        //     currentUserId.value = user.uid;
        // }
        // console.log(currentUserId.value);
        // return { currentUserId};
        // }
    // }
</script> -->


<template>

  <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
    <div class="justify-content-center" id="navbarNav">
      <!-- <Suspense> -->
        <router-link :to="{ name: 'profile', params: { userId: currentUserId } }" class="nav-link" active-class="active-link">
          <img class="mobile-only" src="/src/assets/profil_w.png" width="50" height="50">
          <span class="desktop-only">Profil</span>
        </router-link>
      <!-- </Suspense> -->
        <router-link to="/profiles" class="nav-link" active-class="active-link">
          <img class="mobile-only" src="/src/assets/users_w.png" width="50" height="50">
          <span class="desktop-only">Użytkownicy</span>
        </router-link>
        <router-link to="/forum" class="nav-link" active-class="active-link">
          <img class="mobile-only" src="/src/assets/forum_w.png" width="50" height="50">
          <span class="desktop-only">Forum</span>
        </router-link>
        <router-link to="/events" class="nav-link" active-class="active-link">
          <img class="mobile-only" src="/src/assets/calendar_w.png" width="50" height="50">
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

  .navbar-text,
  .desktop-only {
    font-size: 18px;
    color: white;
  }

  .navbar {
    display: flex;
    align-items: center;
    z-index: 9999;
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
