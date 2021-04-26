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
      <div id="quoteDiv" v-if="fa.author.includes('Michael Scott')">
        <h1>{{ fa.quote }}</h1>
        <h2>{{ fa.author }}</h2>
        <button class="button is-danger" @click="handleDelete(fa.id)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
  <h1><strong>Favorite Ron Swanson Quotes:</strong></h1>
  <div id="quote-container">
    <div v-for="fa in fav.favorites" v-bind:key="fa.author">
      <!-- only showing quotes here based on RSwanson -->
      <div id="quoteDiv" v-if="fa.author === 'Ron Swanson'">
        <!-- TODO show message if no quotes for this author -->
        <!-- <h1 v-if="!fav.favorites.author.includes('Ron Swanson')">No Quotes Yet</h1> -->
        <h1>{{ fa.quote }}</h1>
        <h2>{{ fa.author }}</h2>
        <button class="button is-danger" @click="handleDelete(fa.id)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getUserFavorites } from "../services/UserService";
import { deleteQuote } from "../services/FavoritesService";

export default {
  setup() {
    const fav = ref([]);

    // getting all user info based on user id
    async function getData() {
      const data = await getUserFavorites();
      fav.value = await data.json();
    }

    async function handleDelete(fa) {
      await deleteQuote(fa)
        .then(() => {
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMounted(getData());

    return { fav, handleDelete };
  },
};
</script>

<style scoped>
/* styles are coming from Quotes.vue - they are not scoped to that component */
</style>
