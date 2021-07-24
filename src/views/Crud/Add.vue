<template>
  <div>
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
import { GET_CATEGORIES } from "@/queries.js";
import createProduct from "@/create.gql";
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
    };
  },
  methods: {
    addProduct() {
      this.$apollo
        .mutate({
          // Query
          mutation: createProduct,
          // Parameters
          variables: {
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

