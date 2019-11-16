<template>
  <div class="fullsize">
    <search class="d-sm-12" @positionLatLong="positionLatLong" />
    <div :id="mapId" class="fullsize" style="position: absolute">&nbsp;</div>
    <Capture />
    <Legend @mapTypeChanged="changeMapType" :selected-map-type="selectedMapType" />

    <IconInfo />
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet/dist/leaflet";
import Capture from "@/components/Capture";
import IconInfo from "@/components/IconInfo";
import Legend from "@/components/Legend";
import Search from "@/components/SearchComponents/Search";
const uuidv1 = require("uuid/v1");
const pinUrl = require("@/assets/pins/pin.png");
export default {
  name: "Landing",
  components: {
    Capture,
    IconInfo,
    Legend,
    Search
  },
  data() {
    return {
      mapId: `mapId${uuidv1()}`,
      defaultMapType: "hybrid",
      selectedMapType: this.defaultMapType,
      center: [this.latitude, this.longitude],
      leafletMap: null,
      latitude: -28,
      longitude: 25
    };
  },
  props: {
    latlong: {
      type: Object,
      default() {}
    }
  },
  computed: {},
  methods: {
    initMap() {
      this.leafletMap = window.AfriGIS.map(this.mapId, {
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
        center: L.latLng(this.latitude, this.longitude),
        key: process.env.VUE_APP_AG_JS_API_KEY,
        maxBoundViscosity: 0,
        mapType: this.defaultMapType,
        minZoom: 5,
        maxZoom: 18,
        zoom: 5,
        zoomControl: false,
        crs: L.CRS.EPSG4326
      });
    },
    setMarker(latlong) {
      this.clearMarkers();
      const markerIcon = new L.Icon({
        iconUrl: pinUrl,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });
      const coordArray = [latlong.latitude, latlong.longitude];
      this.marker = L.marker(coordArray, {
        icon: markerIcon
      });
      this.leafletMap.fitBounds([coordArray]);

      this.marker.addTo(this.leafletMap);
    },
    changeMapType(mapType) {
      this.selectedMapType = mapType;
      this.leafletMap.switchTo(mapType);
    },
    positionLatLong(latlong) {
      this.setMarker(latlong);
    },
    clearMarkers() {
      if (this.marker != null) {
        this.leafletMap.removeLayer(this.marker);
      }
      this.marker = null;
    },
    iniRouting() {
      L.Routing.control({
        waypoints: [
          L.latLng(-25.749389, 28.238429),
          L.latLng(-25.5733535, 28.1001138)
        ],
        routeWhileDragging: true
      }).addTo(this.leafletMap);
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style scoped>
.fullsize {
  width: 100%;
  height: 86%;
}
</style>
