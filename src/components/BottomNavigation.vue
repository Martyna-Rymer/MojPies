<template>
    <VueBottomNavigation :options="options" v-model="selected" />
      <!-- <v-bottom-navigation v-model="activeItem" color="primary">
        <v-bottom-navigation-item v-for="(item, index) in items" :key="index" :to="item.route">
          <v-icon>{{ item.icon }}</v-icon>
          <span>{{ item.label }}</span>
        </v-bottom-navigation-item>
      </v-bottom-navigation> -->
      <!-- <div class="phone-viewport">
      <md-bottom-bar md-sync-route>
        <md-bottom-bar-item to="/vuematerial/components/bottom-bar" exact md-label="Profil" md-icon='/src/assets/profile.png'></md-bottom-bar-item>
        <md-bottom-bar-item to="/vuematerial/components/bottom-bar/posts" md-label="Forum" md-icon='/src/assets/forum.png'></md-bottom-bar-item>
        <md-bottom-bar-item to="/vuematerial/components/bottom-bar/favorites" md-label="Wydarzenia" md-icon='/src/assets/calendar.png'></md-bottom-bar-item>
      </md-bottom-bar>
    </div> -->
  </template>

<script>
import VueBottomNavigation from "bottom-navigation-vue";
export default {
    components: { VueBottomNavigation },
    data: () => ({
    selected: 1,
    options: [
      { 
        id: 1, 
        icon: "fas fa-home", 
        title: "Profil", 
        badge: 10 
      },
      { 
        id: 2, 
        icon: "fas fa-home", 
        title: "Forum", 
        badge: 10 
      },
      { 
        id: 3, 
        icon: "fas fa-home", 
        title: "Wydarzenia", 
        badge: 10 
      },
    ],
  }),
    // data() {
    //     return {
    //     items: [
    //         { icon: '/src/assets/profile.png', label: 'Profil', route: '/profile' },
    //         { icon: '/src/assets/forum.png', label: 'Forum', route: '/forum' },
    //         { icon: '/src/assets/calendar.png', label: 'Wydarzenia', route: '/events' },
    //     ],
    //     activeItem: 0,
    //     }
    // },
}
</script>

  
<style>
.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>