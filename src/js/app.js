import Vue from 'vue';
import { menuItems, menuCategories } from './sample-data.js';
import MenuCategory from './components/MenuCategory.vue';

new Vue({
  el: '#app',
  components: {
    MenuCategory
  },
  data: {
    categories: [],
    items: []
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
  mounted() {
    // Load sample data
    this.categories = menuCategories;
    this.items = menuItems;
  }
});