<template>
  <div>
    <h1>ویرایش</h1>
    <form action="" method="post" @submit.prevent="addProduct">
      <div>
        <input type="text" placeholder="نام" v-model="name" />
      </div>
      <div>
        <input type="text" placeholder="رنگ" v-model="color" />
      </div>

      <div>
        <input type="text" placeholder="سایز" v-model="size" />
      </div>

      <div>
        <input type="text" placeholder="جزییات" v-model="details" />
      </div>

      <div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="description"
        ></textarea>
      </div>

      <div>
        <input type="file" name="" id="" />
      </div>

      <div>
        <div>
          <ApolloQuery :query="GET_CATEGORIES">
            <template slot-scope="{ result: { data, loading }, isLoading }">
              <div v-if="isLoading">در حال لود دسته بندی ها</div>
              <div v-else>
                <select v-model="category">
                  <option
                    v-for="category in data.categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </template>
          </ApolloQuery>
        </div>
      </div>

      <button type="submit">ثبت محصول</button>
    </form>
  </div>
</template>

<script>
import { GET_CATEGORIES, GET_SPECIAL_PRODUCT } from "@/queries.js";
import editProduct from "@/Edit.gql";
export default {
  data() {
    return {
      GET_CATEGORIES,
      name: "",
      color: "",
      image: "",
      size: "",
      details: "",
      description: "",
      category: 1,
      GET_SPECIAL_PRODUCT: null,
    };
  },

  apollo: {
    // Advanced query with parameters
    // The 'variables' method is watched by vue
    GET_SPECIAL_PRODUCT: {
      query: GET_SPECIAL_PRODUCT,
      // Reactive parameters
      variables() {
        if (this.$route && this.$route.params) {
          return {
            id: this.$route.params.id,
          };
        }
      },
      // Use vue reactive properties here
      result({ data }) {
        this.name = data.product.name
        this.color = data.product.color
        this.size = data.product.size
        this.details = data.product.details
        this.description = data.product.description
      },
    },
  },
  methods: {
    addProduct() {
      this.$apollo
        .mutate({
          // Query
          mutation: editProduct,
          // Parameters
          variables: {
            id: this.$route.params.id,
            name: this.name,
            color: this.color,
            size: this.size,
            image: this.image,
            details: this.details,
            description: this.description,
            category_id: parseInt(this.category, 10),
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

