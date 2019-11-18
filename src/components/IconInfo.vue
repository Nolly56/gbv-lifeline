<template>
  <div class="legend fixed-bottom pl-5 pb-5 col-11 col-sm-3 row ">
    <div class="col-12 col-sm-2 mw-90">
      <img
        :src="logo"
        alt="24 Hour Logo"
        class="logo"
      >
    </div>
  </div>
</template>

<script>
const logo= require("@/gbv-lifeline/src/assets/images/24-line.png");
export default {
  name: 'LegendInfo',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.legend {

    pointer-events: all;
}
.logo {
   width:90px;
   padding-right:20px;
   opacity: 0.7;
}
</style>
