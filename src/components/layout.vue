<template>
<div>
  <section class="hero is-info">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          <router-link to="/">Todos creator</router-link>
        </h1>
        <h2 class="subtitle">
          An example app written in vue.js
        </h2>
      </div>
    </div>
  </section>
  <section class="level notification is-danger"
           v-show="error">
    <button class="delete"
            @click="closeError"></button>
    <div class="subtitle">{{error}}</div>
  </section>
  <div class="section">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</div>

</template>

<script>
import Mediator from 'services/mediator';

export default {
  data() {
    Mediator.$on('error', (err) => {
      this.error = err
    })
    return {
      error: ''
    }
  },
  methods: {
    closeError: function() {
      this.error = ''
    }
  }

}

</script>
