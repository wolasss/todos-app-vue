<template>
<router-link :to="{ name: 'list', params: { id: data.id }}"
             class="list-item tile is-12 notification is-light level" :name="data.name">
  <div class="level-left">
    <h2 class="name subtitle level-item">{{getTitle(data.name)}}</h2>
  </div>
  <div class="level-right">
    <h1 class="subtitle level-item">{{data.todos_count}} items</h1>
  </div>
</router-link>

</template>

<script>
export default {
  props: [
    'data',
    'index'
  ]
}

</script>

<style>
.list-item {
  margin: 10px 0;
}

.list-item .name {
  font-weight: bold;
}
</style>
