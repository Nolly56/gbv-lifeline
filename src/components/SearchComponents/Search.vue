<template>
  <section>
    <div class="col-5 input-group input-group-lg search">
      <gmap-autocomplete
        class="form-control"
        placeholder="Type address..."
        @place_changed="setPlace"
        autocomplete="off"
      />
      <button
        style="border-radius: 0;background-color: #005495;border-color: #005495;"
        class="btn btn-info rounded-right"
        @click="usePlace"
      >
        <span class="fa fa-search" />
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Search',
  props: {},
  components: {},
  data () {
    return {
      place: null
    }
  },
  mounted () {},
  methods: {
    setPlace (place) {
      if (place) {
        this.place = place
        let latlong = {
          latitude: this.place.geometry.location.lat(),
          longitude: this.place.geometry.location.lng()
        }
        this.$emit('positionLatLong', latlong)
      }
    },
    usePlace (place) {
      if (place) {
        this.place = place
        let latlong = {
          latitude: this.place.geometry.location.lat(),
          longitude: this.place.geometry.location.lng()
        }
        this.$emit('positionLatLong', latlong)
        this.place = null
      }
    }
  },
  created: {
  },
  watch: {}
}
</script>
<style scoped>
.search {
  z-index: 1001;
  width: 100%;
  pointer-events: all;
  padding-top: 15px;
  padding-right: 0px;
  position: relative;
  float: left;
}
.searchBox {
  max-width: 600px;
  max-height: 45px;
}
</style>
