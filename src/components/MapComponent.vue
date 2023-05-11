<template>
  <div id="mapa">
      <div id="custom-icon" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); z-index: 999">
        <img src="/src/assets/marker.png" alt="Custom Icon" class="marker">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      geolocation: {
        type: Array,
        required: true
      }
    },
    mounted () {
      const map = L.map("mapa", {
        dragging: false,
        touchZoom: false
      })
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
      }).addTo(map);

      map.setView(this.geolocation, 14);
  }}
</script>