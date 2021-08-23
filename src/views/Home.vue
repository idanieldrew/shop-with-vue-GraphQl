<template>
  <div class="h-full">
    <div class="container py-10">
      <div class="grid grid-cols-6">
        <div class="lg:col-span-2 w-full col-span-6 py-4">
          <div>
            <ApolloQuery :query="GET_CATEGORIES">
              <template slot-scope="{ result: { data, loading }, isLoading }">
                <div v-if="isLoading">در حال لود دسته بندی ها</div>
                <div v-else>
                  <a
                    @click.prevent="selectCategory('all')"
                    href="#"
                    class="block py-4"
                    name="all"
                    >همه</a
                  >
                  <a
                    href="#"
                    v-for="category in data.categories"
                    :key="category.id"
                    @click.prevent="selectCategory(category.id)"
                    class="block py-1"
                  >
                    {{ category.name }}
                  </a>
                  <router-link :to="addProduct" class="py-2"
                    >افزودن محصول</router-link
                  >
                </div>
              </template>
            </ApolloQuery>
          </div>
        </div>
        <div class="lg:col-span-4 w-full col-span-6">
          <div v-if="selectedCategory === 'all'">
            <ApolloQuery :query="query">
              <template slot-scope="{ result: { data, loading }, isLoading }">
                <!-- Some content -->
                <div v-if="isLoading">در حال لود محصولات</div>
                <div v-else class="flex px-5 flex-wrap">
                  <div
                    class="lg:w-1/3 w-full"
                    v-for="product in data.products"
                    :key="product.id"
                  >
                    <router-link
                      :to="`product/${product.id}`"
                      class="block px-2 lg:py-8 text-gray-600 font-bold"
                    >
                      <img
                        :src="`http://127.0.0.1:8000/gallery/${product.image}`"
                        class="py-4"
                        :alt="`${product.name}`"
                        style="witdh:20px height:20px"
                      />
                      {{ product.name }}
                    </router-link>
                  </div>
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
                    to="/"
                    v-for="product in data.category.products"
                    :key="product.id"
                  >
                    <img
                      :src="`http://127.0.0.1:8000/gallery/${product.image}`"
                      :alt="`${product.name}`"
                      style="witdh:20px height:20px"
                    />
                    {{ product.name }} ,
                  </router-link>
                </div>
              </template>
            </ApolloQuery>
          </div>
        </div>
      </div>
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
