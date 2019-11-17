<template>
    <div>
        <div class="input-group">
            <input type="text" class="form-control map-input" placeholder="   Click To Search On Map" disabled>
            <div class="input-group-prepend">
                <button @click="actionOpenMap" id="map-loction-btn"
                 style="border-radius: 0;background-color: #005495;border-color: #005495;"
                 class="btn btn-info rounded-right">
                    <i class="far fa-map"></i>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: "MapLocation",
  components: {},
  data() {
    return {
      isMapOpen: false,
      requestErrors: null
    };
  },
  props: {
    selectedLatLong: {},
    reverseGeocodeUrl: ""
  },
  methods: {
    actionOpenMap() {
      this.isMapOpen = !this.isMapOpen;
      this.$emit("isMapOpen", this.isMapOpen);
    },
    locationOnMap(clientLocation) {
      const query = `latitude=${clientLocation.lat}&longitude=${
        clientLocation.lng
      }`;
      const getReverseGeocode = `${this.reverseGeocodeUrl}?${query}`;
      this.$http.get(getReverseGeocode).then(
        data => {
          this.$emit("foundMapLocation", data);
          document.getElementById("map-loction-btn").click();
        },
        data => {
          this.requestErrors = data;
          document.getElementById("map-loction-btn").click();
        }
      );
    }
  },
  watch: {
    selectedLatLong(newValue) {
      this.locationOnMap(newValue);
    }
  }
};
</script>

<style>
.mapBox {
  position: relative;
  left: 0%;
  top: 0%;
  z-index: 100;
}
</style>
