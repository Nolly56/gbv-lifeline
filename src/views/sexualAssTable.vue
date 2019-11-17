<template>
    <div v-if="!dataReady" class="loading-gif">
        <LoadingScreen></LoadingScreen>
    </div>
    <div v-else class="responder-index container-fluid">
      <div class="pageTitle">
        <span> Responder Management</span>
        </div>
        <div class="create-button-container">
            <button href="#modal" class="btn btn-primary" id="btnCreate" data-toggle="modal" data-target="#mdlCreate">create</button>
        </div>
        <div>

            <table id="responderTableId" class="table table-hover table-striped table-bordered " cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th v-for="(column,index) in columns" :key="index">
                            {{column}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(responder,index) in responders" :key="index" class="even">
                        <td>
                            {{responder.name}}
                        </td>
                        <td>
                            {{responder.surname}}
                        </td>
                        <td>
                            {{responder.email}}
                        </td>
                        <td>
                            {{responder.msisdn}}
                        </td>
                        <td>
                            <a v-on:click="getResponderDetails(responder,index)" href="#modal" class="editselector" :id="'btnEdit'+index" data-toggle="modal" :data-target="'#mdlEdit'+index" role="button">edit</a> |

                            <a href="#modal" :id="'btnDisable'+index" data-toggle="modal" :data-target="'#mdlDisable'+index" role="button">disable</a>

                            <!-- Modal Edit -->
                            <div class="modal" :id="'mdlEdit'+index" data-backdrop="static">
                                <div class="modal-dialog">
                                    <div class="modal-content">

                                        <!-- Modal Header -->
                                        <div class="modal-header">
                                            <h4 class="modal-title">Edit</h4>
                                            <button :id="'btnCloseEdit'+responder.id" type="button" class="close" data-dismiss="modal">&times;</button>
                                        </div>

                                        <!-- Modal body -->
                                        <div class="modal-body">
                                            <Edit :apiBaseUrl="responderUrl" :id="responder.id" :index="index" v-on:postback="editPostback" :edit="editResponder">
                                            </Edit>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Modal Disable -->
                            <div class="modal" :id="'mdlDisable'+index" data-backdrop="static">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <!-- Modal Header -->
                                        <div class="modal-header">
                                            <h4 class="modal-title">Disable</h4>
                                            <button :id="'btnCloseModal'+responder.id" type="button" class="close" data-dismiss="modal">&times;</button>
                                        </div>

                                        <!-- Modal body -->
                                        <div class="modal-body">
                                            <Disable :apiBaseUrl="responderUrl" :id="responder.id" :index="index" v-on:postback="disablePostback">
                                            </Disable>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="snackbar">
            <div class="alert alert-primary" role="alert">
                {{message}}
            </div>
        </div>

        <!-- Modal Create -->
        <div class="modal" id="mdlCreate" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Create</h4>
                        <button type="button" class="close " v-on:click="clearInput()" data-dismiss="modal" id="btnCloseCreate">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <Create :apiBaseUrl="responderUrl" v-on:postback="createPostback" :textInput.sync="textInput" ref="clearErrors"></Create>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Create from "@/components/Responder/Create.vue";
import Edit from "@/components/Responder/Edit.vue";
import Disable from "@/components/Responder/Disable.vue";
import LoadingScreen from "@/components/Dispatch/LoadingScreen";

const apiUrl = process.env.VUE_APP_BASE_API;

export default {
  name: "UserManagementIndex",
  components: {
    Create,
    Edit,
    Disable,
    LoadingScreen
  },
  data() {
    return {
      columns: ["Name", "Surname", "Email", "Msisdn", "Actions"],
      responders: [],
      respondersLoaded: false,
      textInput: {
        id: "",
        name: "",
        surname: "",
        email: "",
        msisdn: ""
      },
      message: "",
      editResponder: {
        id: "",
        name: "",
        surname: "",
        email: "",
        msisdn: ""
      },
      responderUrl: `${apiUrl}/api/responder`
    };
  },
  computed: {
    dataReady() {
      return this.respondersLoaded;
    }
  },
  methods: {
    createPostback(data) {
      this.showMessage(
        data.code == 200 ? "Responder created successfully" : data.message
      );
      if (data.code != 200) {
        return;
      }
      this.fetchResponders();
      document.getElementById("btnCloseCreate").click();
    },
    editPostback(data) {
      this.showMessage(
        data.data.code == 200
          ? "Responder updated successfully"
          : data.data.message
      );
      if (data.data.code != 200) {
        return;
      }
      document.getElementById("btnCloseEdit" + data.id).click();
      this.fetchResponders();
    },
    disablePostback(data) {
      this.showMessage(
        data.data.code == 200
          ? "Responder removed successfully"
          : data.data.message
      );
      if (data.data.code != 200) {
        return;
      }
      document.getElementById("btnCloseModal" + data.id).click();
      this.fetchResponders();
    },
    fetchResponders() {
      let url = `${this.responderUrl}/Get`;
      this.$http.get(url).then(
        data => {
          let results = [];

          for (let i = 0; i < data.body.result.length; i++) {
            const result = {
              id: data.body.result[i].id,
              name: data.body.result[i].name,
              surname: data.body.result[i].surname,
              email: data.body.result[i].email,
              msisdn: data.body.result[i].msisdn
            };
            results.push(result);
          }
          this.responders = results;
          this.respondersLoaded = true;
        },
        data => {}
      );
    },
    showMessage(message) {
      this.message = message;
      const x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(() => {
        x.className = x.className.replace("show", "");
        this.message = "";
      }, 3000);
    },
    getResponderDetails(responder, index) {
      let url = `${this.responderUrl}details/Get?Id=${responder.id}`;
      this.$http.get(url).then(data => {
        if (data.body.code != 200) {
          //Todo: Do not open modal if system cannot find Responder id
          document.getElementById("#btnEdit" + index).on("click", e => {
            e.stopPropagation();
          });
          alert("Could not find Responder details");
          return;
        }
        this.editResponder.id = responder.id;
        this.editResponder.name = data.body.result.name;
        this.editResponder.surname = data.body.result.surname;
        this.editResponder.email = data.body.result.email;
        this.editResponder.msisdn = data.body.result.msisdn;
      });
    },
    clearInput() {
      this.textInput.name = "";
      this.textInput.surname = "";
      this.textInput.email = "";
      this.textInput.msisdn = "";
      this.$refs.clearErrors.clearInput();
      this.fetchResponders();
    }
  },
  mounted() {
    this.fetchResponders();
  },
  updated() {
    // eslint-disable-next-line
    $("#responderTableId").DataTable();
  }
};
</script>
<style scoped>
.responder-index {
  margin: 56px 0 0 0;
}
.loading-gif {
  text-align: center;
  margin-top: 20%;
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
