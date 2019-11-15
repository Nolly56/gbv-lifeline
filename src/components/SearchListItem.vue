<template>
  <div class="row col-12 searchResults">
    <div>{{ item.description }}</div>
  </div>
</template>

<script>
export default {
  name: 'SearchListItem',
  data () {
    return {}
  },
  props: {
    item: { required: true }
  }
}
</script>

<style scoped>
.searchResults {
  margin-top: 5px;
  pointer-events: all;
  z-index: 1001;
  width: 100%;
  margin: 0px;
  cursor: pointer;
  padding: 8px 9px;
}
</style>
