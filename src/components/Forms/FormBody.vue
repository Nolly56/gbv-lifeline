<template>
  <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <input
          type="text"
          class="form-control"
          id="input-name"
          placeholder="Name"
        >
      </div>
      <div class="form-group col-md-6">
        <input
          type="text"
          class="form-control"
          id="input-contact"
          placeholder="Contact"
        >
      </div>
    </div>
    <div class="form-group">
      <select
        id="input-emergency"
        class="form-control"
      >
        <option selected>
          Select Emergency Type
        </option>
        <option>Domestic Violence</option>
        <option>Other</option>
      </select>
    </div>
    <div class="form-group">
      <textarea
        name="callDescription"
        type="text"
        class="form-control textarea"
        rows="6"
        placeholder="Call Description"
      />
    </div>
    <div class="form-group">
      <button
        type="button"
        class="btn btn-secondary"
        data-dismiss="modal"
      >
        Close
      </button>
       &emsp;&emsp;
      <button class="btn btn-primary">
        Next
      </button>
    </div>
  </form>
</template>

<script>
export default {
  computed: {
    baseMapToggleClass () {
      let baseMapClasses = 'fa '
      baseMapClasses += this.displaySelector
        ? 'fa-bars fa-rotate-90 '
        : 'fa-bars'
      return baseMapClasses
    }
  },
  data () {
    return {
      displaySelector: false
    }
  },
  methods: {

  },
  name: 'FormBody',
  props: {

  },
  watch: {

  }
}
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
</style>
