<!-- <script>
  export default {
    mounted() {
      var mapOptions = {
          center: [50.0521, 19.9766],
          zoom: 10
      };
      var map = new L.map('map', mapOptions);
      var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      map.addLayer(layer);

      navigator.eventGeolocation.getCurrentPosition(position => {
          var lat = position.coords.latitude
          var lng = position.coords.longitude
          var marker = L.marker([lat, lng]);
          marker.addTo(map);
          map.setView([lat, lng], 15)
      }, error => {
          console.log('Error getting user location:', error)
      })
    }
  }  
</script>

<template>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
</template>-->

<!-- <style scoped>
  .map-wrapper {
    position: fixed;
    top: 0;
  left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
</style>
<template>
  <div class="map-wrapper">
    <div id="map"></div>
    <button @click="selectLocation">Select this location</button>
  </div>
</template>

<script>
  export default {
    mounted() {
      var mapOptions = {
        center: [50.0521, 19.9766],
        zoom: 10,
      };
      var map = new L.map("map", mapOptions);
      var layer = new L.TileLayer(
        "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      );
      map.addLayer(layer);

      var marker = null;

      map.on("click", (e) => {
        if (marker) {
          map.removeLayer(marker);
        }

        marker = L.marker(e.latlng).addTo(map);
      });

      navigator.eventGeolocation.getCurrentPosition(
        (position) => {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          var marker = L.marker([lat, lng]);
          marker.addTo(map);
          map.setView([lat, lng], 15);
        },
        (error) => {
          console.log("Error getting user location:", error);
        }
      );
    },
    methods: {
      selectLocation() {
        this.$emit("location-selected", marker.getLatLng());
      },
    },
  };
</script> -->



<!-- <template>
  <div class="map-wrapper" ref="mapWrapper">
    <div id="map"></div>
  </div>
</template>

<script>
// import L from 'leaflet';

export default {
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      var mapOptions = {
        center: [50.0521, 19.9766],
        zoom: 10,
      };
      this.map = new L.map('map', mapOptions);
      var layer = new L.TileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      );
      this.map.addLayer(layer);

      // this.map.on('click', (event) => {
      //   const lat = event.latlng.lat;
      //   const lng = event.latlng.lng;
      //   this.$emit('location-selected', { lat, lng });
      //   this.closeMap();
      // });

      this.map.on('click', (event) => {
  var latlng = e.latlng;
  this.eventeventGeolocation = {
    latitude: latlng.lat,
    longitude: latlng.lng
  };
  this.$emit('selected', this.eventeventGeolocation); // emit selected event
  // this.closeMap();
  map.remove(); // remove the map from the DOM
});

      navigator.eventGeolocation.getCurrentPosition(
        (position) => {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          this.marker = L.marker([lat, lng]);
          this.marker.addTo(this.map);
          this.map.setView([lat, lng], 15);
        },
        (error) => {
          console.log('Error getting user location:', error);
        }
      );
    },
    closeMap() {
      this.map.remove();
      this.$refs.mapWrapper.style.display = 'none';
    },
  },
};
</script>

<style scoped>
.map-wrapper {
  position: fixed;
  top: 0;
  left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
}
</style> -->



<!-- <template>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue';
  import L from 'leaflet';
  import "leaflet/dist/leaflet.css";
// import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

  export default {
    setup() {
      const mapRef = ref(null);
      const markerRef = ref(null);
      const geolocation = ref(null);

      onMounted(() => {
        const map = L.map('map').setView([50.0521, 19.9766], 10);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; OpenStreetMap contributors',
          maxZoom: 18
        }).addTo(map);

        const marker = L.marker([50.0521, 19.9766]).addTo(map);
        marker.bindPopup("Click to confirm location.").openPopup();

        marker.on('click', function(e) {
          geolocation.value = e.latlng;
          map.removeControl(control);
        });

        const control = L.control({position: 'bottomleft'});

        control.onAdd = function (map) {
          const button = L.DomUtil.create('button');
          button.innerHTML = 'Confirm location';
          button.onclick = function() {
            map.removeControl(control);
          }
          return button;
        };

        control.addTo(map);

        mapRef.value = map;
        markerRef.value = marker;
      });

      return {
        mapRef,
        markerRef,
        geolocation
      }
    }
  }
</script>

<style scoped>
  .map-wrapper {
    position: fixed;
    top: 0;
  left: 0;
    width: 100%;
    height: 100%;
  }
  #map {
    height: 100%;
  }
</style> -->

<template>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {


  mounted() {
    const map = L.map(this.$refs.map).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    let marker = null;

    const setMarker = (e) => {
      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }
      this.geolocation = e.latlng;
    };

    map.on('click', setMarker);
  },


  // mounted() {
  //   const lat = ref(50.0521);
  //   const lng = ref(19.9766);
  //   var mapOptions = {
  //     center: [lat.value, lng.value],
  //     zoom: 10
  //   };
  //   var map = new L.map('map', mapOptions);
  //   var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  //   map.addLayer(layer);

  //   var marker = L.marker([lat.value, lng.value], { draggable: true });
  //   marker.addTo(map);

  //   map.on('click', function(e) {
  //     lat.value = e.latlng.lat;
  //     lng.value = e.latlng.lng;
  //     marker.setLatLng(e.latlng);
  //   });

  //   navigator.geolocation.getCurrentPosition(position => {
  //     lat.value = position.coords.latitude;
  //     lng.value = position.coords.longitude;
  //     marker.setLatLng([lat.value, lng.value]);
  //     map.setView([lat.value, lng.value], 15)
  //   }, error => {
  //     console.log('Error getting user location:', error)
  //   })
  // }
}
</script>

<style scoped>
  .map-wrapper {
    position: fixed;
    top: 0;
  left: 0;
    width: 100%;
    height: 100%;
  }
  #map {
    height: 100%;
  }
</style>
