<template>
  <router-link to="/">Home</router-link>
  <h1>The great Ron Swanson once said...</h1>
  <h1 id="error" v-if="quotes.error === 'Invalid Request'">
    LOGIN TO SEE QUOTES
  </h1>
  <div id="quote-container" v-if="quotes.error !== 'Invalid Request'">
    <div id="quoteDiv" v-for="quote in quotes" v-bind:key="quote.id">
      <p>{{ quote.quote }}</p>
      <!-- <button class="button is-danger" @click="deleteQuote(quote.id)">
        <i class="fas fa-trash-alt"></i>
      </button> -->
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { fetchSwansonQuotes } from "../services/SwansonQService";

export default {
  name: "SwansonQuotes",
  setup() {
    const quotes = ref([]);

    async function fetchData() {
      try {
        const response = await fetchSwansonQuotes();
        quotes.value = await response.json();
      } catch (err) {
        console.log(err);
      }
    }

    onMounted(fetchData());

    return { quotes };
  },
};
</script>

<style scoped>
#quote-container {
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
}
#quoteDiv {
  border: 1px solid black;
  border-radius: 10px;
  background-color: whitesmoke;
  margin: 10px;
  width: 350px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 190px;
}

#error {
  font-size: 80px;
}
</style>
