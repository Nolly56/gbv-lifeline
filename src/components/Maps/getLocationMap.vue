<template>
  <div>
      <Address class="address-search" :searchUrl="searchUrl" :addressDetailApiUrl="addressDetailApiUrl" :tokenUrl="tokenUrl" v-on:selectionChanged="setSearchtMarker"></Address>
      <div class="location-map" :id="mapId" :style="styles"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Address from "@/./components/Search/Address.vue";
export default {
  name: "getLocationMap",
  components: {
    Address
  },
  props: {
    addressDetailApiUrl: "",
    searchUrl: "",
    tokenUrl: "",
    searchText: ""
  },
  data() {
    return {
      map: null,
      styles: {
        height: document.documentElement.clientHeight + "px",
        width: document.documentElement.clientWidth + "px"
      },
      zoom: 5,
      mapId: "",
      mapMarker: null,
      searchMarker: null,
      contentData: {
        latitude: -28,
        longitude: 25
      },
      clientData: null
    };
  },
  beforeMount() {
    this.mapId = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = AfriGIS.map(this.mapId, {
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
        center: L.latLng(this.contentData.latitude, this.contentData.longitude),
        crs: L.CRS.EPSG4326,
        maxBoundViscosity: 0,
        minZoom: 2,
        maxZoom: 18,
        zoomOffset: 1,
        zoom: this.zoom,
        zoomControl: false,
        mapType: "hybrid",
        key: "_YOUR_KEY_HERE_"
      });
      L.DomUtil.addClass(this.map._container, "crosshair-cursor-enabled");
      this.setMarker();
    },
    setMarker() {
      if (this.searchMarker) {
        this.map.removeLayer(this.searchMarker);
      }
      const parnt = this;
      const map = this.map;
      let marker = this.mapMarker;

      const pinIcon = L.icon({
        iconUrl: require("@/../src/assets/client_location.png"),
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });

      this.map.on("click", function(e) {
        if (parnt.searchMarker) {
          map.removeLayer(parnt.searchMarker);
        }
        if (marker) {
          map.removeLayer(marker);
        }

        marker = L.marker(e.latlng, {
          icon: pinIcon
        });
        map.addLayer(marker);

        const latLngs = [marker.getLatLng()];
        const markerBounds = L.latLngBounds(latLngs);
        map.fitBounds(markerBounds);
        parnt.$emit("MapLatLong", latLngs);
      });
    },
    setSearchtMarker(data) {
      //Marker
      if (this.searchMarker) {
        this.map.removeLayer(this.searchMarker);
      }
      var pinIcon = L.icon({
        iconUrl: require("@/../src/assets/MapPin_36.png"),
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        className: "blinking"
      });
      this.searchMarker = L.marker([data.latitude, data.longitude], {
        icon: pinIcon
      }).addTo(this.map);

      const latLngs = [this.searchMarker.getLatLng()];
      const markerBounds = L.latLngBounds(latLngs);

      this.map.fitBounds(markerBounds);
    }
  }
};
</script>
<style scoped>
.location-map {
  min-height: 100px;
  z-index: 1002;
  overflow: hidden;
}
.address-search {
  margin: 85px 0 0 4%;
  position: absolute;
  z-index: 1963;
  width: 33%;
}
@keyframes fade {
  from {
    opacity: 0.5;
  }
}

.blinking {
  animation: fade 1s infinite alternate;
}
</style>
