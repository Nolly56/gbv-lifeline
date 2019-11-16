<template>
  <div></div>
</template>

<script>
export default {
  name: "Nav",
  components: {},
  data() {
    return {
      gKey: process.env.VUE_APP_URL
    };
  },
  methods: {
    navigate() {
      // create a new client
      console.log(this.gKey);
      const googleMapsClient = require("@google/maps").create({
        key: this.gKey
      });
    }
  },
  mounted() {
    this.navigate();
  }
};
</script>

<style>
</style>
