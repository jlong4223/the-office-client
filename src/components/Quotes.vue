<template>
  <router-link to="/">Home</router-link>
  <h1>The Great Michael Scott once said...</h1>
  <div id="quote-container">
    <div id="quoteDiv" v-for="quote in quotes" v-bind:key="quote.id">
      <p>{{ quote.quote }}</p>
      <button class="button is-danger" @click="deleteQuote(quote.id)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { fetchApiQuotes } from "../services/QuotesService";
import { getToken } from "../services/TokenService";
// import { deleteQuote } from "../services/QuotesService";

export default {
  name: "Quotes",
  setup() {
    const BASE_URL = "http://localhost:3000/offices";

    /* allows for reactive data - if data here chages, so does the template */
    const quotes = ref([]);

    // waiting for token to be sent to the backend
    async function fetchData() {
      try {
        const response = await fetchApiQuotes();
        /*--- Using .value to give the quotes array the fetch data ---*/
        quotes.value = await response.json();
      } catch (err) {
        console.log(err);
      }
    }

    /* ------ TODO move to services & add auth headers------- */
    async function deleteQuote(id) {
      await fetch(BASE_URL + `/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      });
      fetchData();
    }

    // async function deleteTask() {
    //   try {
    //     await deleteQuote();
    //     fetchData();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    onMounted(fetchData());

    return { quotes, deleteQuote };
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
</style>
