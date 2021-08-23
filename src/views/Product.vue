<template>
  <div>
    <div class="container py-5">
      <ApolloQuery :query="query" :variables="{ id: $route.params.id }">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">در حال لود محصول</div>
          <div v-else class="grid grid-cols-4">
            <div class="col-span-1 mr-5">
              <img
                :src="`http://127.0.0.1:8000/gallery/${data.product.image}`"
                :alt="`${data.product.name}`"
                style="witdh:20px height:20px"
              />
            </div>
            <div class="col-span-3">
              <router-link to="/" href="#" class="block pb-4">
                {{ data.product.name }}
              </router-link>
              <p class="block text-gray-400">
                {{ data.product.details }}
              </p>
              <p>
                {{ data.product.description }}
              </p>
            </div>
          </div>
          <div class="flex justify-center justify-items-center">
            <div class="p-3">
              <router-link
                class="
                  px-4
                  py-2
                  bg-yellow-400
                  rounded
                  text-black
                  font-serif
                  hover:bg-yellow-500
                "
                :to="`/editProduct/${data.product.id}`"
                >ویرایش</router-link
              >
            </div>
            <div class="p-3">
              <a
                href="#"
                @click.prevent="deleteProduct"
                class="
                  px-4
                  py-2
                  bg-red-500
                  rounded
                  text-black
                  font-serif
                  hover:bg-red-600
                "
                >حذف</a
              >
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import { GET_SPECIAL_PRODUCT } from "../queries.js";
import deleteProduct from "../Delete.gql";
export default {
  name: "Product",
  components: {},

  data() {
    return {
      query: GET_SPECIAL_PRODUCT,
    };
  },
  methods: {
    deleteProduct() {
      this.$apollo
        .mutate({
          // Query
          mutation: deleteProduct,
          // Parameters
          variables: {
            id: this.$route.params.id,
          },
        })
        .then((data) => {
          console.log(data);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error, "error");
        });
    },
  },
};
</script>
