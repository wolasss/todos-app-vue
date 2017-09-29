<template>
	<nav class="level">
	  <div class="level-left">
	    <div class="level-item">
	      <div class="field has-addons">
	        <p class="control">
	          <input v-model="name"
	                 class="input-add-element input"
	                 type="text"
	                 v-bind:placeholder="addElementPlaceholder"
	                 @keyup.enter="addElement">
	        </p>
	        <p class="control">
	          <button @click="addElement"
	                  v-bind:class="{ 'is-loading': isLoading }"
	                  class="button-add-element button is-primary">
	            Add
	          </button>
	        </p>
	      </div>
	    </div>
	  </div>
	  <div class="level-right">
	    <div class="level-item"
	         v-if="filters.length"
	         v-for="filter in filters">
	      <button class="button is-white"
	              @click="changeFilter(filter)"
	              :class="{'is-active': currentFilter.name === filter.name}">{{filter.name}}</button>
	    </div>
	    <div class="level-item">
	      <input v-model="currentQuery"
	             @keyup="emitFilter"
	             class="input"
	             type="text"
	             placeholder="Search">
	    </div>
	  </div>
	</nav>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      isLoading: false,
      currentQuery: '',
      currentFilter: {}
    }
  },
  created() {
    this.currentFilter = this.filters[0]
  },
  props: [
    'onSave',
    'addElementPlaceholder',
    'filters'
  ],
  methods: {
    addElement: function() {
      const name = this.name

      if (name) {
        this.isLoading = true
        this.onSave(name).then(() => {
          this.name = ''
        }).catch((err) => {
          Mediator.$emit('error', 'List could not be added.')
        }).then(() => {
          this.isLoading = false
        })
      }
    },
    changeFilter: function(f) {
      this.currentFilter = f
      this.emitFilter()
    },
    emitFilter: function() {
      this.$emit('filter', this.currentQuery, this.currentFilter)
    }
  }
}

</script>
