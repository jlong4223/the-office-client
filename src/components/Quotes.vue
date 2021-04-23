<template>
  <router-link to="/">Home</router-link>

  <h1>The Great Michael Scott once said...</h1>
  <h1 id="error" v-if="quotes.error === 'Invalid Request'">
    LOGIN TO SEE QUOTES
  </h1>
  <div id="quote-container" v-if="quotes.error !== 'Invalid Request'">
    <div id="quoteDiv" v-for="quote in quotes" v-bind:key="quote.id">
      <p>{{ quote.quote }}</p>
      <div id="btns">
        <button class="button is-danger" @click="handleDelete(quote.id)">
          <i class="fas fa-trash-alt"></i>
        </button>
        <!-- TODO add an click function -->
        <button class="button is-info" @click="favIt(quote)">
          <i class="fas fa-bookmark"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { onMounted, ref } from "vue";
import { fetchApiQuotes, deleteQuote } from "../services/QuotesService";

export default {
  name: "Quotes",
  setup() {
    /* allows for reactive data - if data here chages, so does the template */
    const quotes = ref([]);

    const favorite = reactive({
      // id: null,
      quote: "",
      author: "",
    });

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

    async function handleDelete(quote) {
      await deleteQuote(quote)
        .then(() => {
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const favIt = (quote) => {
      // console.log(quote.id, quote.quote, quote.author);
      quote
        ? // (favorite.id = quote.id),
          ((favorite.quote = quote.quote), (favorite.author = quote.author))
        : null;
      console.log("favs: ", favorite);
    };

    onMounted(fetchData());

    return { quotes, handleDelete, favIt };
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

#btns {
  /* border: 1px solid red; */
  width: 60%;
  display: flex;
  justify-content: space-around;
}
</style>
