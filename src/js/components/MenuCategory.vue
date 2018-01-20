<template>
  <div class="column is-4">
    <div class="box">
      <h4 class="is-size-4 has-text-primary">{{ this.title }}</h4>
      <ul>
        <menu-item v-for="item in items" v-bind:title="item.title" v-bind:key="item.id"></menu-item>
      </ul>
    </div>
  </div>
</template>

<script>
  import MenuItem from './MenuItem.vue';

  export default {
    components: {
      MenuItem
    },
    props: {
      title: {
        type: String,
        required: true
      },
      items: {
        type: Array
      }
    }
  }
</script>