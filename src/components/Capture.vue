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
    <UserDetails @navigateForm="navigateForms" />
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
      currentTab: 0
    }
  },
  methods: {
    navigateForms (data) {
      let index = data.index
      let vaildform = data.vaild
      let activeTab = document.getElementsByClassName('tab')

      if (!vaildform && index === 1) {
        return
      }
      this.transferFormData(data)

      activeTab[this.currentTab].style.display = 'none'

      this.currentTab = this.currentTab + index
      if (this.currentTab === activeTab.length - 1) {
        this.populateForm(
          this.clientForm,
          this.locationForm,
          this.responderFrom
        )
      }
      this.showTab(this.currentTab)
    },
    transferFormData (data) {
      switch (data.form) {
        case 'client':
          if (data.vaild) {
            this.clientForm = data.details
          }
          break
        case 'location':
          if (data.vaild) {
            this.locationForm = data.details
          }
          break
      }
    }
  },
  name: 'Capture',
  props: {},
  watch: {}
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
