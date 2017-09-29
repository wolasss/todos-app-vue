<template>
<div>
  <ul v-if="filteredItems.length">
    <li v-bind:is="itemComponent"
        v-for="(item, index) in filteredItems"
        v-bind:data="item"
        v-bind:index="index"
        v-bind:key="item.id"
        v-on:delete="deleteItem"></li>
  </ul>
  <div class="level is-centered"
       v-if="!items.length">
    <div class="level-item subtitle">The list is empty</div>
  </div>
</div>

</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
    }
  },
  methods: {
    deleteItem: function(index) {
      this.$delete(this.items, index)
    }
  },
  computed: {
    filteredItems: function() {
      let items = this.items;

      if (this.filter && this.filter.fn && items) {
        items = items.filter(this.filter.fn)
      }

      if (!this.query) {
        return items;
      }

      return items && items.filter(item => {
        return item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
      });
    }
  },
  props: {
    query: {
      type: String
    },
    filter: {
      type: Object
    },
    itemComponent: {
      type: String
    },
    items: {
      type: Array,
      default: []
    }
  }
}

</script>
