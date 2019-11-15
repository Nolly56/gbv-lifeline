<template>
  <div>
    <div class="baseDisplay">
      <button
        id="dispatch-btn"
        class="btn button btn-primary float-right mt-3 mr-3"
        data-toggle="modal"
        data-target="#capture-modal"
        title="Create A Call"
      >
        <i class="fas fa-plus fa-1x" />
      </button>
    </div>
    <UserDetails />
  </div>
</template>

<script>
import UserDetails from '@/components/Forms/UserDetails'
export default {
  components: {
    UserDetails
  },
  data () {
    return {

    }
  },
  methods: {

  },
  name: 'Capture',
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
