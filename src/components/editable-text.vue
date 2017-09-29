<template>
	<span>
		<span class="level-item editable" v-if="!isEditMode" v-on:dblclick="activateEditMode">{{getTitle(text)}}</span>
		<div class="level-item"
	     v-if="isEditMode">
	  		<input type="text"
	         v-model="text"
	         class="input editable-text-input"
	         @keyup.enter="editElement">
	  		<button class="button is-dark editable-text-button"
	          :class="{ 'is-loading': isSaving }"
	          @click="editElement">save</button>
		</div>
	</span>
</template>

<script>
export default {
  data() {
    const text = this.initialText

    return {
      text,
      isSaving: false,
      isEditMode: false
    }
  },
  props: [
    'initialText',
    'onEdit'
  ],
  methods: {
    activateEditMode: function() {
      this.isEditMode = true
    },
    editElement: function() {
      this.isSaving = true
      this.onEdit(this.text).then(() => {
        this.isSaving = false
        this.isEditMode = false
      })
    }
  }
}

</script>
