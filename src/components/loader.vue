<template>
<div class="has-text-centered"
     v-show="isLoading">
  <div class="button is-white is-loading is-large"></div>
</div>

</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: [
    'isLoading'
  ]
}

</script>
