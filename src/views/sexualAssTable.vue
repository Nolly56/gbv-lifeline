<template>
  <div class="table-responsive">
    <table
      id="sexualAssTableId"
      class="table table-hover table-striped table-bordered"
      cellspacing="0"
      style="height:50%;width:500px;"
    >
      <thead>
        <tr>
          <th v-for="(column,index) in columns" :key="index">{{column}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(detail,index) in details" :key="index" class="even">
          <td>{{detail.OBJECTID}}</td>

          <td>{{detail.Offence}}</td>
          <td>{{detail.Minute}}</td>
          <td>{{detail.Hour}}</td>
          <td>{{detail.Day}}</td>
          <td>{{detail.Month}}</td>
          <td>{{detail.Year}}</td>
          <td>{{detail.Weekday}}</td>
          <td>{{detail.X_Coord}}</td>
          <td>{{detail.Y_Coord}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SexualAssIndex",
  components: {},
  data() {
    return {
      columns: [
        "OBJECTID",
        "Offence",
        "Minute",
        "Hour",
        "Day",
        "Month",
        "Year",
        "Weekday",
        "X_Coord",
        "Y_Coord"
      ],
      details: [],
      sexualCrimeData: require("@/assets/jsonLayers/sexualcrime.json")
    };
  },
  computed: {},
  methods: {},
  beforeMount() {
    this.details = this.sexualCrimeData.features.map(item => {
      return item.properties;
    });
  },
  mounted() {
    // eslint-disable-next-line
    $("#sexualAssTableId").DataTable({
      responsive: true,
      lengthMenu: [[4, 8, 12, -1], [4, 8, 12, "All"]],
      autoWidth: true,
      paging: true
    });
  },
  updated() {}
};
</script>
<style scoped>
.responder-index {
  margin: 56px 0 0 0;
}
.modal-content {
  margin-top: 20%;
}
div.dataTables_wrapper div.dataTables_info {
  display: none;
}
.create-button-container {
  padding: 2.5% 0%;
  margin-left: 1.5%;
}
</style>
