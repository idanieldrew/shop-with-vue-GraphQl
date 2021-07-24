<template>
  <div>
    <div>
      <ApolloQuery :query="GET_CATEGORIES">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">در حال لود دسته بندی ها</div>
          <div v-else>
            <router-link to="/" name="all" @click.prevent="selectCategory('all')"
              >همه</router-link
            >
            <a
            href="#"
              v-for="category in data.categories"
              :key="category.id"
              @click.prevent="selectCategory(category.id)"
            >
              {{ category.name }} -
            </a>
            <router-link :to="`addProduct`">افزودن محصول</router-link>
          </div>
        </template>
      </ApolloQuery>
    </div>

    <div v-if="selectedCategory === 'all'">
      <ApolloQuery :query="query">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <!-- Some content -->
          <div v-if="isLoading">در حال لود محصولات</div>
          <div v-else>
            <router-link
              v-for="products in data.products"
              :key="products.id"
              style="display: block"
              :to="`product/${products.id}`"
            >
              {{ products.name }} -
             <img :src="`http://127.0.0.1:8000/gallery/${products.image}`" :alt="`${ products.name }`" style="witdh:20px height:20px">
            </router-link>
          </div>
        </template>
      </ApolloQuery>
    </div>
    <div v-else>
      <ApolloQuery :query="query" :variables="{ id: selectedCategory }">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">در حال لود محصول</div>
          <div v-else>
            <router-link
              to=""
              v-for="product in data.category.products"
              :key="product.id"
            >
              {{ product.name }} ,
            </router-link>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import {
  GET_CATEGORIES,
  GET_SPECIAL_PRODUCTS,
  GET_ALL_PRODUCT,
} from "../queries.js";
export default {
  name: "Home",
  components: {},

  data() {
    return {
      GET_SPECIAL_PRODUCTS,
      GET_CATEGORIES,
      categories: [],
      products: [],
      selectedCategory: "all",
      query: GET_ALL_PRODUCT,
    };
  },
  methods: {
    selectCategory(category) {
      if (category == "all") {
        this.query = GET_ALL_PRODUCT;
        this.selectedCategory = "all";
      } else {
        this.query = GET_SPECIAL_PRODUCTS;
        this.selectedCategory = category;
      }
    },
  },
};
</script>
