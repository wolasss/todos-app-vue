<template>
  <div>
    <app-header v-on:filter="setFilter"
                filters=""
                v-bind:onSave="saveNewList"
                addElementPlaceholder="List name"></app-header>
    <loader :isLoading="isLoading"></loader>
    <div class="columns is-centered"
         v-show="!isLoading">
      <div class="column is-6">
        <list ref="lists"
              :filter="{}"
              :query="currentQuery"
              itemComponent="listItem"
              v-bind:items="todolists"></list>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ListItem from 'components/list-item.vue';
import Todolists from 'services/todolists';
import Tasks from 'services/tasks';
import Mediator from 'services/mediator';

Vue.component('listItem', ListItem)

export default {
  data() {
    return {
      currentQuery: '',
      listItem: ListItem,
      todolists: [],
      isLoading: false
    }
  },
  created() {
    this.isLoading = true

    Todolists.getAll().then((lists) => {
      this.todolists = lists
    }).catch((err) => {
      Mediator.$emit('error', 'Lists could not be fetched from the server')
    }).then(() => {
      this.isLoading = false
    })
  },
  methods: {
    setFilter: function(query, filter) {
      this.currentQuery = query
    },
    saveNewList: function(name) {
      return Todolists.save(name).then((list) => {
        this.todolists.push(list)
        return list;
      }).catch((err) => {
        Mediator.$emit('error', 'List could not be added')
      })
    }
  }
}

</script>
