<template>
  <div class="baseDisplay">
    <button
      class="btn button btn-primary float-right mt-3 mr-3"
      @click="displaySelector=!displaySelector"
    >
      <span :class="baseMapToggleClass" />
    </button>
    <div v-show="displaySelector">
      <div class="row float-right d-flex flex-column m-0 mt-3 mr-3">
        <button
          :class="menuOption('vector')"
          @click="select('vector')"
        >
          Vector
        </button>
        <button
          :class="menuOption('hybrid')"
          @click="select('hybrid')"
        >
          Hybrid
        </button>
        <button
          :class="menuOption('imagery')"
          @click="select('imagery')"
        >
          Image
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    baseMapToggleClass () {
      let baseMapClasses = 'fa '
      baseMapClasses += (this.displaySelector) ? 'fa-bars fa-rotate-90 ' : 'fa-bars'
      return baseMapClasses
    }
  },
  data () {
    return {
      displaySelector: false
    }
  },
  methods: {
    menuOption (mapType) {
      return [
        'btn',
        'w-100',
        mapType === this.selectedMapType ? 'btn-primary' : 'bg-white'
      ]
    },
    select (mapType) {
      this.$emit('mapTypeChanged', mapType)
      this.displaySelector = !this.displaySelector
    }
  },
  name: 'BaseDisplay',
  props: {
    selectedMapType: {
      required: true,
      type: String,
      default: 'hybrid'
    }
  },
  watch: {
    selectedMapType (val) {
      this.selectedType = val
    }
  }
}
</script>

<style scoped>
.baseDisplay {
  position: relative;
  z-index: 401;
}

.button {
  width: 45px;
  height: 45px;
}
</style>
