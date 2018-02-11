import Vue from 'vue';
import { menuItems, menuCategories } from './sample-data.js';
import MenuCategory from './components/MenuCategory.vue';
import OrderItem from './components/OrderItem.vue';

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
    order: []
  },
  computed: {
    // Calculate order total
    orderTotal() {
      let total = 0;

      this.order.forEach(i => {
        const itemPrice = i.price * i.quantity;
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
    this.order = JSON.parse(localStorage.getItem('vrc-order')) || []

    // Add item to order - listen for emitted event
    Event.$on('addToOrder', item => {
      // Check if there is an existing item
      const existingItem = this.order.findIndex((e) => {
        return e.id === item.id;
      });

      // If there is then increase quantity
      // Otherwise add the item to order with a quantity of 1
      if(existingItem >= 0) {
        this.order[existingItem].quantity = this.order[existingItem].quantity + 1;
      } else {
        item.quantity = 1;
        this.order.push(item);
      }
    });

    // Remove item from order - listen for emitted event
    Event.$on('removeFromOrder', id => {
      const item = this.order.findIndex((e) => {
        return e.id === id;
      });

      this.order.splice(item, 1);
    });
  }
});