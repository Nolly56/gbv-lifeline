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
    <div class="baseDisplay">
      <button class="btn button btn-primary float-right mt-3 mr-3" @click="flagcrimeRate">
        <i class="fas fa-user-ninja fa-1x"></i>
      </button>
    </div>

    <Capture />
    <Legend
      @mapTypeChanged="changeMapType"
      :selected-map-type="selectedMapType"
      @togglePolice="flagPolice"
      @toggleCommunity="flagCommunity"
      @toggleSexualCrime="flagSexualCrime"
      @toggleAbductionsCrime="flagAbductionsCrime"
      @toggleRapeCrime="flagRapeCrime"
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
      abductionsCrimeCluster: null,
      abductionsCrimeIconUrl: require("@/assets/images/crimeabductions.png"),
      abductionsCrimeData: require("@/assets/jsonLayers/abductions.json"),
      abductionsCrimelayer: null,
      rapeCrimeCluster: null,
      rapeCrimeCrimeIconUrl: require("@/assets/images/crimerape.png"),
      rapeCrimeCrimeData: require("@/assets/jsonLayers/Rape.json"),
      rapeCrimeCrimelayer: null,
      communityCluster: null,
      communityIconUrl: require("@/assets/images/communityCentre.png"),
      communityData: require("@/assets/jsonLayers/RecHubs.json"),
      communitylayer: null,
      crimeRate: require("@/assets/jsonLayers/crimerate.json"),
      crimeRateLayer: null,
      legendControl: null,
      crimeEnabled: false,
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
      if(mapType ==="openS"){
         //Add open layer code here
      }else{
        this.leafletMap.switchTo(mapType);
      }

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
    flagAbductionsCrime(toggle) {
      if (toggle) {
        this.leafletMap.addLayer(this.abductionsCrimeCluster);
        this.abductionsCrimeCluster.refreshClusters();
      } else {
        this.leafletMap.removeLayer(this.abductionsCrimeCluster);
        this.abductionsCrimeCluster.refreshClusters();
      }
    },
    flagRapeCrime(toggle) {
      if (toggle) {
        this.leafletMap.addLayer(this.rapeCrimeCluster);
        this.rapeCrimeCluster.refreshClusters();
      } else {
        this.leafletMap.removeLayer(this.rapeCrimeCluster);
        this.rapeCrimeCluster.refreshClusters();
      }
    },
    flagcrimeRate() {
      this.crimeEnabled = !this.crimeEnabled;
      this.initLegend();
      if (this.crimeEnabled) {
        this.leafletMap.addLayer(this.crimeRateLayer);
      } else {
        this.legendControl.remove();
        this.leafletMap.removeLayer(this.crimeRateLayer);
      }
    },
    flagCommunity(toggle){
        if (toggle) {
        this.leafletMap.addLayer(this.communityCluster);
        this.communityCluster.refreshClusters();
      } else {
        this.leafletMap.removeLayer(this.communityCluster);
        this.communityCluster.refreshClusters();
      }
    },
    crimeLayer() {
      let map = this.leafletMap;
      let getColor = d => {
        return d > 1000
          ? "#800026"
          : d > 500
          ? "#BD0026"
          : d > 200
          ? "#E31A1C"
          : d > 100
          ? "#FC4E2A"
          : d > 50
          ? "#FD8D3C"
          : d > 20
          ? "#FEB24C"
          : d > 10
          ? "#FED976"
          : "#FFEDA0";
      };

      let style = feature => {
        return {
          fillColor: getColor(feature.properties.Ass_Rate),
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7
        };
      };
      let highlightFeature = e => {
        let layer = e.target;
        layer.setStyle({
          weight: 5,
          color: "#666",
          dashArray: "",
          fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
      };
      let resetHighlight = e => {
        this.crimeRateLayer.resetStyle(e.target);
      };
      let zoomToFeature = e => {
        map.fitBounds(e.target.getBounds());
      };
      let onEachFeature = (feature, layer) => {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
        layer.bindPopup(
          "Subplace Name: " +
            feature.properties.SP_NAME +
            "<br>" +
            "Crime rate: " +
            feature.properties.Ass_Rate +
            " per 100 population" +
            "<br>" +
            "Lat: " +
            feature.properties.Y_Coord +
            "<br>" +
            "Long: " +
            feature.properties.X_Coord
        );
      };
      let localCrimeRateLayer = L.geoJson(this.crimeRate, {
        style: style,
        onEachFeature: onEachFeature
      });

      this.crimeRateLayer = localCrimeRateLayer;
    },
    initLayers() {
            //POLICE LAYER START
     let comCluster = L.markerClusterGroup();
      let communityIcon = L.icon({
        iconUrl: this.communityIconUrl,
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });

      this.communitylayer = L.geoJSON(this.communityData, {
        pointToLayer: function(geoJsonPoint, latlng) {
          return L.marker(latlng, {
            icon: communityIcon
          });
        },
        onEachFeature: function(feature, layer) {
          let name = feature.properties.NAME;
          layer.bindPopup(`<dl>
                          <dt>Community Centre Name : </dt><dd>${name}</dd></dl>`);
                          comCluster.addLayer(layer);
        }
      });
      this.communityCluster = comCluster;
      //POLICE LAYER END


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
          let name = feature.properties2.NAME;
          layer.bindPopup(`<dl>
                          <dt>Police Station Name : </dt><dd>${name}</dd></dl>`);
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
          let inci = feature.properties;
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

      //Abductions LAYER START
      let aCCluster = L.markerClusterGroup();
      let abductionCIcon = L.icon({
        iconUrl: this.abductionsCrimeIconUrl,
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });

      this.abductionsCrimelayer = L.geoJSON(this.abductionsCrimeData, {
        pointToLayer: function(geoJsonPoint, latlng) {
          return L.marker(latlng, {
            icon: abductionCIcon
          });
        },
        onEachFeature: function(feature, layer) {
          let inci = feature.properties;
          layer.bindPopup(`<dl>
                          <dt>Incident : </dt><dd>${inci.Offence}</dd>
                          <dt>Time of Incident : </dt><dd>${inci.Hour} : ${inci.Minute}</dd>
                          <dt>Date of Incident : </dt><dd>${inci.Day}/${inci.Month}/${inci.Year} </dd>
                          </dl>`);
          aCCluster.addLayer(layer);
        }
      });
      this.abductionsCrimeCluster = aCCluster;
      //ABDuctions LAYER  END

      //Rape LAYER START
      let rCCluster = L.markerClusterGroup();
      let rapeCIcon = L.icon({
        iconUrl: this.rapeCrimeCrimeIconUrl,
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });

      this.rapeCrimeCrimelayer = L.geoJSON(this.rapeCrimeCrimeData, {
        pointToLayer: function(geoJsonPoint, latlng) {
          return L.marker(latlng, {
            icon: rapeCIcon
          });
        },
        onEachFeature: function(feature, layer) {
          let inci = feature.properties;
          layer.bindPopup(`<dl>
                          <dt>Incident : </dt><dd>${inci.Offence}</dd>
                          <dt>Time of Incident : </dt><dd>${inci.Hour} : ${inci.Minute}</dd>
                          <dt>Date of Incident : </dt><dd>${inci.Day}/${inci.Month}/${inci.Year} </dd>
                          </dl>`);
          rCCluster.addLayer(layer);
        }
      });
      this.rapeCrimeCluster = rCCluster;


      //Rape LAYER  END
      this.crimeLayer();
    },
    initLegend(enable) {
      if (this.legendControl) {
        this.legendControl.remove();
      }
      let getColor = d => {
        return d > 1000
          ? "#800026"
          : d > 500
          ? "#BD0026"
          : d > 200
          ? "#E31A1C"
          : d > 100
          ? "#FC4E2A"
          : d > 50
          ? "#FD8D3C"
          : d > 20
          ? "#FEB24C"
          : d > 10
          ? "#FED976"
          : "#FFEDA0";
      };
      this.legendControl = L.control({ position: "bottomright" });
      this.legendControl.onAdd = function(mymap) {
        let div = L.DomUtil.create("div", "info legend"),
          grades = [0, 10, 20, 50, 100, 200, 500, 1000],
          labels = ["<strong>Crime rate</strong>"];

        // loop through our crime rate intervals and generate a label with a colored square for each interval
        for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' +
            getColor(grades[i] + 1) +
            '"></i> ' +
            grades[i] +
            (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }

        return div;
      };
      this.legendControl.addTo(this.leafletMap);
    }
  },
  mounted() {
    this.initMap();
    this.initLayers();
  }
};
</script>

<style>
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
.legend {
  line-height: 30px;
  color: #555;
}

.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 1;
}
.leaflet-control {
  background-color: white;
}
</style>
