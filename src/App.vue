<template>
  <div id="app">
    <nav
      class="navbar fixed-top"
      style="background-color: #005495;"
    >
      <img
        src="./assets/LifeLine.png"
        alt="Life Line Logo"
        style="width:45px;margin-left:30px;"
      >

      <div class="row actions-nav mr-1">
        <div class="col-10 text-right">
          <button
            disabled
            class="btn btn-primary"
            style="background-color: #005495;border-color: #005495;"
          >
            <i class="fas fa-headset fa-1x " />
          </button>
        </div>
      </div>
    </nav>
    <div>
      <landing class="home" />
    </div>
    <footer class="footer fixed-bottom navbar-dark dark-footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col text-left hidden-xs">
            <a class="text-white">Version: {{appVersion}}</a>
            &nbsp;|&nbsp;
            <a class="text-white">Life Line {{ year }}</a>
          </div>
          <div class="col-5 text-right hidden-xs">
            <a class="text-white">Contact : 911</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Landing from '@/views/Landing'
export default {
  name: 'App',
  components: {
    Landing
  },
  data () {
    return {
      year: new Date().getFullYear(),
      appVersion: process.env.VUE_APP_VERSION
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style>
.home {
  overflow: hidden;
}
.textarea {
  resize: none;
}
.dark-footer {
  background-color: black;
}
</style>
