<template>
  <div id="app" class="h-full">
    <Navbar />
    <Hero />
    <div class="continer">
      <div class="flex justify-center py-10 bg-gray-300 lg:flex-row flex-col">
        <div class="lg:py-0 py-2">
          <button
            class="
              bg-purple-600
              px-16
              py-3
              border-2 border-purple-800
              rounded
              text-white
              hover:text-purple-600
              hover:bg-white mx-2
            "
          >
            دیدن کتاب ها
          </button>
        </div>
        <div>
          <button
            class="
              bg-white
              px-16
              py-3
              border-2 border-purple-800
              rounded
              text-purple-600
              hover:text-white
              hover:bg-purple-600
              font-bold
              transform
              lg:hover:-translate-y-5
              duration-1000
            "
          >
            کتاب جدید
          </button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./views/layout/Navbar.vue";
import Hero from "./views/Hero.vue";

export default {
  components: {
    Navbar,
    Hero,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #2c3e50;
}
</style>
