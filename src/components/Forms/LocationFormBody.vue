<template>
  <div>
    <div class="form-group address-container">
      <Address
      id="AddressComponet"
        class="address-search"
        v-on:locationDetail="locationDetail"
      />
    </div>
    <div>
      <p>_____________________________________</p>
    </div>
    <div class="form-group latlong-container">
      <MapLocation
        v-on:isMapOpen="isMapOpen"
        :selectedLatLong="selectedLatLong"
        :reverseGeocodeUrl="reverseGeocodeUrl"
        v-on:foundMapLocation="foundMapLocation"
        class="map-search"
      />
    </div>
    <div class="form-group">
      <div class="form-group row">
        <label class="col-2 col-form-label">Location:</label>
        <div class="col-10">
          <input
            type="text"
            v-model="locationForm.description"
            readonly
            class="form-control-plaintext location-input"
            name="location"
            id="client-location"
            placeholder="Location"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Address from "@/components/SearchComponents/Address.vue";
import MapLocation from "@/components/SearchComponents/MapLocation.vue";
export default {
  name: "LocationForm",
  components: {
    Address,
    MapLocation
  },
  data() {
    return {
      locationForm: {
        latitude: "",
        longitude: "",
        description: ""
      }
    };
  },
  props: {
    reverseGeocodeUrl: "",
    addressDetailApiUrl: "",
    searchUrl: "",
    tokenUrl: "",
    lbsUrl: "",
    clientDetails: {},
    selectedLatLong: {}
  },
  methods: {
    validateBeforePostBack() {
      this.$emit("isMapOpen", false);
      this.$emit("navigateForm", {
        vaild: true,
        form: "location",
        details: this.locationForm,
        index: 1
      });
    },
    locationDetail(data) {
      console.log(data)
    },
    foundMapLocation(data) {

    },
    isMapOpen(data) {
      this.$emit("isMapOpen", data);
    }
  },
  watch: {
    clientDetails() {}
  }
};
</script>

<style>
.location-input {
  text-overflow: ellipsis;
  overflow: hidden;
  z-index: 1100;
}
.search-button-group {
  position: absolute;
  margin-left: 450px;
}
.address-search{
  z-index:2147483647 !important;
}
</style>
