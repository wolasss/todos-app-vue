<template>
  <div>
    <app-header v-on:filter="setFilter"
                v-bind:onSave="saveTask"
                addElementPlaceholder="Task name"
                :filters="filters"></app-header>
    <div class="columns is-centered">
      <loader :isLoading="isLoading"></loader>
      <div class="is-6 is-centered column"
           v-show="!isLoading">
        <h1 class="title level"
            v-if="list && list.name">
  					<editable-text class="level-item list-title" v-bind:initialText="list.name" :onEdit="editListName"></editable-text>
  					<button class="button button-delete-list is-danger" @click="openConfirmationModal"><span class="fa fa-trash"></span></button>
  				</h1>
        <progress-bar :type="'success'"
                      :size="'large'"
                      :value="completedTasks"
                      :max="tasks.length || 1"
                      :show-label="true"></progress-bar>
        <list ref="tasks"
              :filter="currentFilter"
              :query="currentQuery"
              itemComponent="taskItem"
              v-bind:items="tasks"></list>
        <confirmation-modal ref="confirmationModal"
                            label="Do you want to remove this list?"
                            :onConfirm="deleteList"></confirmation-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import TaskItem from 'components/task-item.vue';
import ProgressBar from 'vue-bulma-progress-bar';
import Todolists from 'services/todolists';
import Tasks from 'services/tasks';
import Mediator from 'services/mediator';

Vue.component('taskItem', TaskItem)

export default {
  components: {
    ProgressBar
  },
  data() {
    return {
      tasks: [],
      currentFilter: {},
      list: {},
      currentQuery: '',
      isLoading: false,
      filters: [
        {
          name: 'All',
          fn: () => true
        },
        {
          name: 'Incompleted',
          fn: (t) => !t.is_complete
        },
        {
          name: 'Completed',
          fn: (t) => t.is_complete
        }
      ]
    }
  },
  created() {
    const id = this.$route.params.id

    this.isLoading = true

    Promise.all([
      Todolists.get(id).then((list) => {
        this.list = list
      }).catch((err) => {
        Mediator.$emit('error', 'List could not be fetched from the server.')
      }),
      Tasks.getAll(id).then((tasks) => {
        this.tasks = tasks
      }).catch((err) => {
        Mediator.$emit('error', 'Tasks could not be fetched from the server.')
      })
    ]).then(() => {
      this.isLoading = false
    })

  },
  computed: {
    completedTasks: function() {
      return this.tasks.reduce((count, task) => {
        return count + (task.is_complete || 0)
      }, 0)
    }
  },
  methods: {
    setFilter: function(query, filter) {
      this.currentQuery = query
      this.currentFilter = filter
    },
    saveTask: function(name) {
      const todolistId = this.$route.params.id

      return Tasks.save({
        name,
        is_complete: false,
        todo_list: todolistId
      }).then((task) => {
        this.tasks.push(task)
        return task;
      }).catch((err) => {
        Mediator.$emit('error', 'Task could not be added')
      })
    },
    editListName: function(name) {
      return Todolists.update(this.list.id, name).catch((err) => {
        Mediator.$emit('error', 'List could not be updated')
      })
    },
    openConfirmationModal: function() {
      this.$refs.confirmationModal.$emit('open')
    },
    deleteList: function() {
      return Todolists.remove(this.list.id, name).then(() => {
        this.$router.push({
          path: '/'
        })
        return true;
      }).catch((err) => {
        Mediator.$emit('error', 'List could not be deleted.')
      })
    }
  }
}

</script>
