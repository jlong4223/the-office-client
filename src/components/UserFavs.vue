<template>
  <router-link to="/">Home</router-link>
  <div>
    <h1>{{ fav.name }}, here are your favorites:</h1>
  </div>
  <div v-if="fav.favorites && !fav.favorites.length">
    <h1>You havent added any favorites yet :(</h1>
  </div>
  <h1><strong>Favorite Michael Scott Quotes:</strong></h1>
  <div id="quote-container">
    <div v-for="fa in fav.favorites" v-bind:key="fa.author">
      <!-- only showing quotes here based on MScott -->
      <div id="quoteDiv" v-if="fa.author === 'Michael Scott'">
        <h1>{{ fa.quote }}</h1>
        <h2>{{ fa.author }}</h2>
      </div>
    </div>
  </div>
  <h1><strong>Favorite Ron Swanson Quotes:</strong></h1>
  <div id="quote-container">
    <div v-for="fa in fav.favorites" v-bind:key="fa.author">
      <!-- only showing quotes here based on RSwanson -->
      <div id="quoteDiv" v-if="fa.author === 'Ron Swanson'">
        <h1>{{ fa.quote }}</h1>
        <h2>{{ fa.author }}</h2>
      </div>
    </div>
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

<style scoped>
/* styles are coming from Quotes.vue - they are not scoped to that component */
</style>
