<template>
  <div class="fullsize">
    <search class="d-sm-12" @positionLatLong="positionLatLong" />
    <div :id="mapId" class="fullsize" style="position: absolute">&nbsp;</div>
    <div class="baseDisplay">
      <button
        class="btn button btn-primary float-right mt-3 mr-3"
        title="Reset Map"
        @click="ResetMap"
      >
        <i class="fas fa-home fa-1x"></i>
      </button>
    </div>
    <Capture />
    <Legend
      @mapTypeChanged="changeMapType"
      :selected-map-type="selectedMapType"
      @togglePolice="flagPolice"
      @toggleSexualCrime="flagSexualCrime"
    />
    <IconInfo />
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet/dist/leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
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
      zoom: 9,
      policeIconUrl: require("@/assets/images/police-station.png"),
      policePointsData: require("@/assets/jsonLayers/Policestations.json"),
      policelayer: null,
      sexualCrimeCluster: null,
      sexualCrimeIconUrl: require("@/assets/images/crime-sexual.png"),
      sexualCrimeData: require("@/assets/jsonLayers/sexualcrime.json"),
      sexualCrimelayer: null,
      latitude: -34,
      longitude: 18.5
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
        iconSize: [5, 5],
        iconAnchor: [10, 5],
        mapType: this.defaultMapType,
        minZoom: 5,
        maxZoom: 18,
        zoom: this.zoom,
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
    },
    ResetMap() {
      this.clearMarkers();
      this.leafletMap.setView(
        new L.LatLng(this.latitude, this.longitude),
        this.zoom
      );
    },
    flagPolice(toggle) {
      toggle
        ? this.policelayer.addTo(this.leafletMap)
        : this.leafletMap.removeLayer(this.policelayer);
    },
    flagSexualCrime(toggle) {
      if (toggle) {
        this.leafletMap.addLayer(this.sexualCrimeCluster);
        this.sexualCrimeCluster.refreshClusters();
      } else {
        this.leafletMap.removeLayer(this.sexualCrimeCluster);
        this.sexualCrimeCluster.refreshClusters();
      }
    },
    initLayers() {
      //POLICE LAYER START
      let polIcon = L.icon({
        iconUrl: this.policeIconUrl,
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });

      this.policelayer = L.geoJSON(this.policePointsData, {
        pointToLayer: function(geoJsonPoint, latlng) {
          return L.marker(latlng, {
            icon: polIcon
          });
        },
        onEachFeature: function(feature, layer) {
          layer.bindPopup("This is a Police Station");
        }
      });
      //POLICE LAYER END

      //SEXUAL VIOLENCE LAYER START
      let sCCluster = L.markerClusterGroup();
      let sexualCIcon = L.icon({
        iconUrl: this.sexualCrimeIconUrl,
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });

      this.sexualCrimelayer = L.geoJSON(this.sexualCrimeData, {
        pointToLayer: function(geoJsonPoint, latlng) {
          return L.marker(latlng, {
            icon: sexualCIcon
          });
        },
        onEachFeature: function(feature, layer) {
          let inci = feature.properties
          layer.bindPopup(`<dl>
                          <dt>Incident : </dt><dd>${inci.Offence}</dd>
                          <dt>Time of Incident : </dt><dd>${inci.Hour} : ${inci.Minute}</dd>
                          <dt>Date of Incident : </dt><dd>${inci.Day}/${inci.Month}/${inci.Year} </dd>
                          </dl>`);
          sCCluster.addLayer(layer);
        }
      });
      this.sexualCrimeCluster = sCCluster;
      //SEXUAL VIOLENCE LAYER  END
    }
  },
  mounted() {
    this.initMap();
    this.initLayers();
  }
};
</script>

<style scoped>
.fullsize {
  width: 100%;
  height: 86%;
}
.baseDisplay {
  position: relative;
  z-index: 401;
}

.button {
  width: 45px;
  height: 45px;
}
</style>
