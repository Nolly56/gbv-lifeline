<template>
  <div v-if="resetForm" class="modal fade" id="capture-modal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button
          type="button"
          class="close"
          id="close-e-form"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-body">
          <form-wizard
            v-if="resetForm"
            @on-complete="onComplete"
            title="Emergency"
            subtitle="Call Centre"
            shape="circle"
            back-button-text="Back"
            next-button-text="Next"
            finish-button-text="Submit"
            color="#3498db"
          >
            <tab-content title="Details" :icon="user">
              <DetailsFormBody />
            </tab-content>
            <tab-content title="Last step" icon="ti-check">
              <DetailsFormBody />
            </tab-content>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailsFormBody from "@/components/Forms/DetailsFormBody";
//import LocationFormBody from "@/components/Forms/LocationFormBody";

export default {
  name: "UserDetails",
  components: {
    DetailsFormBody
    // LocationFormBody
  },
  data() {
    return {
      user: '',
      submitIcon: "",
      resetForm: true
    };
  },
  methods: {
    onComplete() {
      this.resetForm = !this.resetForm;
      document.getElementById("close-e-form").click();
      this.resetForm = !this.resetForm;
    }
  }

};
</script>
<style scoped>

</style>
