<template>
  <div>
    <div>
      <ApolloQuery :query="query" :variables="{ id: $route.params.id }">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">در حال لود دسته بندی ها</div>
          <div v-else>
            <router-link to="/" href="#">
              {{ data.product.name }}
              <img
                :src="`http://127.0.0.1:8000/gallery/${data.product.image}`"
                :alt="`${data.product.name}`"
                style="witdh:20px height:20px"
              />
            </router-link>
          </div>
          <div>
            <router-link :to="`/editProduct/${data.product.id}`"
              >ویرایش</router-link
            >
            <a href="#" @click.prevent="deleteProduct"
              >حذف</a
            >
          </div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import { GET_SPECIAL_PRODUCT } from "../queries.js";
import deleteProduct from '../Delete.gql'
export default {
  name: "Product",
  components: {},

  data() {
    return {
      query: GET_SPECIAL_PRODUCT,
    };
  },
  methods: {
    deleteProduct(){
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
    }
  },
};
</script>
