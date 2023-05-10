<template>
  <div id="mapa">
      <div id="custom-icon" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999">
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
        scrollWheelZoom: false,
        touchZoom: false
      }).setView(this.geolocation, 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
      }).addTo(map);

    // const marker = L.marker(this.geolocation)

    // var customIconLayer = L.layerGroup(marker, {icon: L.icon({
    //     iconUrl: '/src/assets/marker.png',
    //     iconSize: [5, 5],
    //     iconAnchor: [25, 25]
    // })});
    // customIconLayer.addTo(map);
  }}
</script>