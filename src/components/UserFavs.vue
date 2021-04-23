<template>
  <div>Favorites Page</div>
  <div v-for="fa in fav.favorites" v-bind:key="fa.author">
    <h1>{{ fa.quote }}</h1>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getUserFavorites } from "../services/UserService";
export default {
  setup() {
    const fav = ref([]);

    // getting all user info based on user id
    async function getData() {
      const data = await getUserFavorites();
      fav.value = await data.json();
    }

    onMounted(getData());

    return { fav };
  },
};
</script>

// TODO add styles
