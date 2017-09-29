<template>
	<div class="modal"
	     :class="{'is-active': isActive}">
	  <div class="modal-background"></div>
	  <div class="modal-content">
	    <div class="box has-text-centered">
	      <div class="level">
	        {{label}}
	      </div>
	      <button class="button is-danger button-confirm"
	              :class="{'is-loading': isLoading}"
	              @click="confirm">
	        Confirm
	      </button>
	      <button class="button is-white"
	              @click="close">
	        Cancel
	      </button>
	    </div>
	  </div>
	  <button class="modal-close is-large"
	          aria-label="close"></button>
	</div>
</template>

<script>
export default {
  data() {
    this.$on('open', this.open);

    return {
      isActive: false,
      isLoading: false
    }
  },
  props: [
    'label',
    'onConfirm'
  ],
  methods: {
    close: function() {
      this.isActive = false
    },
    open: function() {
      this.isActive = true
    },
    confirm: function() {
      this.isLoading = true
      this.onConfirm().then(() => {
        this.isLoading = false
        this.isActive = false
      })
    }
  }
}
</script>