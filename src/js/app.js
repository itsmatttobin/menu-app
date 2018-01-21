import Vue from 'vue';
import { menuItems, menuCategories } from './sample-data.js';
import MenuCategory from './components/MenuCategory.vue';
import OrderItem from './components/OrderItem.vue';
// import store from './store.js';

window.Event = new Vue();

new Vue({
  el: '#app',
  components: {
    MenuCategory,
    OrderItem
  },
  data: {
    categories: [],
    items: [],
    order: {}
  },
  computed: {
    // Calculate order total
    orderTotal() {
      let total = 0;

      Object.keys(this.order).forEach(key => {
        const itemPrice = this.order[key].price * this.order[key].quantity;
        total += itemPrice;
      });

      return '£' + total.toFixed(2);
    }
  },
  methods: {
    // Get all items within a category
    getCatItems(cat) {
      // Filter all items, returning those matching the category title
      const catItems = this.items.filter(item => {
        if(item.category == cat)
          return true;
      });

      return catItems;
    }
  },
  watch: {
    // Watch for any changes in order and save to local storage
    order: {
      handler(order) {
        window.localStorage.setItem('vrc-order', JSON.stringify(order));
      },
      deep: true
    }
  },
  created() {
    // Load sample data
    this.categories = menuCategories;
    this.items = menuItems;

    // Get order from local storage
    this.order = JSON.parse(localStorage.getItem('vrc-order')) || {}

    // Add item to order - listen for emitted event
    Event.$on('addToOrder', item => {
      const order = {...this.order};

      order[item.id] = item;
      order[item.id].quantity = order[item.id].quantity + 1 || 1;

      this.order = order;
    });

    // Remove item from order - listen for emitted event
    Event.$on('removeFromOrder', id => {
      const order = {...this.order};

      order[id].quantity = 0;
      delete order[id];

      this.order = order;
    });
  }
});