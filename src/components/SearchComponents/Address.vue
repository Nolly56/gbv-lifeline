<template>
  <section>
    <div class="input-group search">
      <gmap-autocomplete
        id="Address"
        class="form-control search"
        placeholder="..."
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
  name: 'Address',
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
        console.log(place);
        this.place = place

        this.$emit('locationDetail', latlong)
      }
    },
    usePlace (place) {
      if (place) {
        this.place = place
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
  z-index: 1400;

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
