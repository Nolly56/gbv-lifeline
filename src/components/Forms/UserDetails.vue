<template>
  <div
    class="modal fade"
    id="capture-modal"
    role="dialog"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="exampleModalLabel"
          >
            Emergency Call
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <FormBody />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormBody from '@/components/Forms/FormBody'
export default {
  name: 'UserDetails',
  components: {
    FormBody
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.modal-backdrop{
  z-index: 1500;
}
.modal-dialog{
  z-index: 15001;
}
</style>
