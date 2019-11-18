<template>
  <div id="app">
    <nav class="navbar fixed-top" style="background-color: #005495;">
      <img
        src="@/assets/images/LifeLine.png"
        alt="Life Line Logo"
        style="width:45px;margin-left:30px;"
      />

      <div class="row actions-nav mr-1">
        <div class="col-3 text-right">
          <button
            disabled
            class="btn btn-primary"
            style="background-color: #005495;border-color: #005495;"
          >
            <i class="fas fa-headset fa-1x" />
          </button>
        </div>
        <div class="col-7 text-right">
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >DATA TABELS</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" data-toggle="modal" data-target="#saModal">Sexual Assault</a>
              <a class="dropdown-item" data-toggle="modal" data-target="#aModal">Abductions</a>
              <a class="dropdown-item" data-toggle="modal" data-target="#rModal">Rape</a>
            </div>
          </div>
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
            <a class="text-white">Version: {{ appVersion }}</a>
            &nbsp;|&nbsp;
            <a class="text-white">Life Line {{ year }}</a>
          </div>
          <div class="col-5 text-right hidden-xs">
            <a class="text-white">Contact : 911</a>
          </div>
        </div>
      </div>
    </footer>

<div class="modal fade" id="saModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="saModalLabel">Sexual Assault</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <sexualAssTable/>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="aModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="saModalLabel">Abductions</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       Abductions
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="rModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="saModalLabel">Rape</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Rape
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import Landing from "@/views/Landing";
import sexualAssTable from "@/views/sexualAssTable";
import abductionsTable from "@/views/abductionsTable";
import rapeTable from "@/views/rapeTable";
export default {
  name: "App",
  components: {
    Landing,
    sexualAssTable,
    abductionsTable,
    rapeTable
  },
  data() {
    return {
      year: new Date().getFullYear(),
      appVersion: process.env.VUE_APP_VERSION
    };
  }
};
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
