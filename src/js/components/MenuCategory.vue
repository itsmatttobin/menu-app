<template>
  <div class="column is-6">
    <div class="box">
      <h4 class="is-size-5 has-text-info">{{ this.title }}</h4>
      <hr>
      <ul>
        <menu-item v-for="item in items" v-bind:id="item.id" v-bind:title="item.title" v-bind:price="item.price" v-bind:key="item.id"></menu-item>
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