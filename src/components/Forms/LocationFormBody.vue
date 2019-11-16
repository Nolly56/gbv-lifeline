<template>
  <div class="container">
    <h5>Location Details</h5>
    <br />
    <div class="form-group address-container">
      <Address class="address-search" v-on:selectionChanged="searchSelectionChanged" />
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
            v-validate="{ required: true}"
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
    <div class="row forms-button-group">
      <div class="col-6 text-left">
        <button
          class="btn"
          type="button"
          id="prevBtn"
          @click="$emit('navigateForm',{index:-1})"
        >Previous</button>
      </div>
      <div class="col-6 text-right">
        <button
          class="btn btn-primary"
          type="button"
          id="nextBtn"
          @click="validateBeforePostBack()"
        >Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Address from "@/components/SearchComponents/Search";
import MapLocation from "@/components/Maps/MapLocation.vue";
export default {
  name: "LocationFormBody",
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

  },
  methods: {

  },
  watch: {

  }
};
</script>

<style>
.location-input {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
