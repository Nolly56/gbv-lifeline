<template>
  <section>
    <div class="col-5 input-group input-group-lg search">
      <gmap-autocomplete
        class="form-control"
        placeholder="Type address..."
        @place_changed="setPlace"
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
  props: {

  },
  components: {},
  data () {
    return {
      place: null
    }
  },
  mounted () {},
  methods: {
    setDescription (description) {
      this.description = description
    },
    setPlace (place) {
      this.place = place
    },
    usePlace (place) {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          }
        })
        this.place = null
      }
    }
  },
  created: {
    searchQuery () {

    }
  },
  watch: {

  }
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
