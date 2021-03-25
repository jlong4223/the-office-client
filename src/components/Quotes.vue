<template>
  <h1>The Great Michael Scott once said...</h1>
  <div id="quote-container">
    <div id="quoteDiv" v-for="quote in quotes" v-bind:key="quote.id">
      <p>{{ quote.quote }}</p>
      <button @click="deleteQuote(quote.id)">delete</button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "Quotes",
  setup() {
    const BASE_URL = "http://localhost:3000/offices";

    /* allows for reactive data - if data here chages, so does the template */
    const quotes = ref([]);

    async function fetchData() {
      const response = await fetch(BASE_URL);
      /*--- Using .value to give the quotes array the fetch data ---*/
      quotes.value = await response.json();
    }

    async function deleteQuote(id) {
      await fetch(BASE_URL + `/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      fetchData();
    }

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
  justify-content: center;
  align-items: center;
  height: 190px;
}
</style>
