<template>
  <div class="box level">
    <div class="level-left">
      <button class="button is-small is-danger" v-on:click="removeFromOrder(item.id)">&minus;</button> {{ item.title }} (x{{ item.quantity }})
    </div>
    <div class="level-right">{{ calculatedPrice }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object
      }
    },
    computed: {
      calculatedPrice() {
        const price = this.item.price * this.item.quantity;
        return '£' + price.toFixed(2);
      }
    },
    methods: {
      removeFromOrder(id) {
        Event.$emit('removeFromOrder', id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button {
    margin-right: 10px;
  }
</style>