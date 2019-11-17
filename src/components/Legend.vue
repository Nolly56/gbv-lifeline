<template>
  <div class="baseDisplay">
    <button
      class="btn button btn-primary float-right mt-3 mr-3"
      @click="displaySelector=!displaySelector"
      title="Legend"
    >
      <span :class="baseMapToggleClass" />
    </button>
    <div v-show="displaySelector">
      <div class="row float-right d-flex flex-column m-0 mt-3 mr-3">
        <div class="dropdown-legend">
          <div>
             <p>
            BASE MAPS
             </p>
            <button
              :class="menuOption('vector')"
              style="width:30px"
              @click="select('vector')"
            >Vector</button>
            <button :class="menuOption('hybrid')" @click="select('hybrid')">Hybrid</button>
            <button :class="menuOption('imagery')" @click="select('imagery')">Image</button>
          </div>
          <div>
           <hr>
            <p>
              MAP POI
            </p>
            <label @click="policePOI()" class="w-100">
              Police Station<span style="display:inline-block; width: 40px;"></span>
              <input

                type="checkbox"
                data-toggle="toggle"
                data-size="sm"
              />
            </label>
                <label class="w-100">
              Police Station<span style="display:inline-block; width: 40px;"></span>
              <input
                type="checkbox"
                data-toggle="toggle"
                data-size="sm"
              />
            </label>
                <label class="w-100">
              Police Station<span style="display:inline-block; width: 40px;"></span>
              <input
                type="checkbox"
                data-toggle="toggle"
                data-size="sm"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    baseMapToggleClass() {
      let baseMapClasses = "fa ";
      baseMapClasses += this.displaySelector
        ? "fa-bars fa-rotate-90 "
        : "fa-bars";
      return baseMapClasses;
    }
  },
  data() {
    return {
      displaySelector: false,
      police:false
    };
  },
  methods: {
    menuOption(mapType) {
      return [
        "btn",
        "w-100",
        mapType === this.selectedMapType ? "btn-primary" : "bg-white"
      ];
    },
    select(mapType) {
      this.$emit("mapTypeChanged", mapType);
      this.displaySelector = !this.displaySelector;
    },
    policePOI() {
      this.police = !this.police;
      this.$emit("togglePolice", this.police);
    }
  },
  name: "BaseDisplay",
  props: {
    selectedMapType: {
      required: true,
      type: String,
      default: "hybrid"
    }
  },
  watch: {
    selectedMapType(val) {
      this.selectedType = val;
    }
  }
};
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
.dropdown-legend {
  width: 250px;
  height: 380px;
  background-color: #f8f9fa;
}
</style>
