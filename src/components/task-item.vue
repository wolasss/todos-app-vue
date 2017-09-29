<template>
<div class="task-item tile notification is-light level" :name="data.name">
  <div class="level-left">
    <input class="level-item task-checkbox"
           type="checkbox"
           v-model="data.is_complete"
           v-on:change="toggleTaskCompleteness">
    <editable-text class="task-title" :initialText="data.name"
                   :onEdit="editTodo"></editable-text>
  </div>
  <div class="level-right">
    <button class="button-delete level-item button is-danger is-inverted is-small is-hovered"
            @click="openConfirmationModal"
            v-bind:class="{ 'is-loading': isDeleting }"><span class="fa fa-times"></span></button>
  </div>
  <confirmation-modal ref="confirmationModal"
                      label="Do you want to remove this task?"
                      :onConfirm="deleteTask"></confirmation-modal>
</div>

</template>

<script>
import Tasks from 'services/tasks';
import Mediator from 'services/mediator';

export default {
  data() {
    return {
      isDeleting: false
    }
  },
  props: [
    'data',
    'index'
  ],
  methods: {
    openConfirmationModal: function() {
      this.$refs.confirmationModal.$emit('open')
    },
    deleteTask: function() {
      this.isDeleting = true
      return Tasks.remove(this.data.id).then(() => {
        this.$emit('delete', this.index)
        return true
      }).catch((err) => {
        Mediator.$emit('error', 'Task could not be deleted.')
      }).then(() => {
        this.isDeleting = false
        return true
      })
    },
    toggleTaskCompleteness: function() {
      return Tasks.toggle({
        id: this.data.id,
        name: this.data.name,
        is_complete: this.data.is_complete,
        todo_list: this.data.todo_list
      })
    },
    editTodo: function(name) {
      return Tasks.update({
        id: this.data.id,
        name,
        todo_list: this.data.todo_list
      }).then(()=>{
        this.data.name = name;
        return true;
      }).catch((err) => {
        Mediator.$emit('error', 'Task could not be edited.')
      })
    }
  }
}

</script>

<style>
.task-item {
  margin: 10px 0;
}

.button-delete {
  font-weight: bold;
}
</style>
