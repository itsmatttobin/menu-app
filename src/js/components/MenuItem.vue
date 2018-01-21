<template>
  <li class="item">
    <div class="level">
      <div class="level-left">
        <button class="button is-small is-success" v-on:click="addToOrder(itemDetails)">&plus;</button> {{ title }}
      </div>
      <div class="level-right has-text-info has-text-weight-semibold">{{ formattedPrice }}</div>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      id: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    },
    computed: {
      formattedPrice() {
        return '£' + this.price.toFixed(2);
      },
      itemDetails() {
        return {id: this.id, title: this.title, price: this.price};
      }
    },
    methods: {
      addToOrder(item) {
        Event.$emit('addToOrder', item);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .item {
    margin-bottom: 5px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .button {
    margin-right: 10px;
  }
</style>