<template>
  <div class="modal fade" id="capture-modal" role="dialog">
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
            @on-complete="onComplete"
            title="Emergency"
            subtitle="Call Centre"
            shape="circle"
            :start-index="startId"
            back-button-text="Back"
            next-button-text="Next"
            finish-button-text="Submit"
            color="#3498db"
            ref="reset"
            stepSize="sm"
          >
            <tab-content title="Details" icon="ti-user">
              <DetailsFormBody />
            </tab-content>
            <tab-content title="Submit" icon="ti-check">
              <LocationFormBody />
            </tab-content>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailsFormBody from "@/components/Forms/DetailsFormBody";
import LocationFormBody from "@/components/Forms/LocationFormBody";

export default {
  name: "UserDetails",
  components: {
    DetailsFormBody,
    LocationFormBody
  },
  data() {
    return {
      resetForm: true,
      startId: 0
    };
  },
  methods: {
    onComplete() {
      this.$refs.reset.reset();
      document.getElementById("close-e-form").click();
    }
  }
};
</script>
<style scoped>
.modal{
  overflow-y: hidden;
}
</style>
