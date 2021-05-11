<template>
  <router-link to="/">Home</router-link>

  <h1>The Great Michael Scott once said...</h1>
  <h1 id="error" v-if="quotes.error === 'Invalid Request'">
    LOGIN TO SEE QUOTES
  </h1>
  <div id="loaderSection" v-if="loading.status === true">
    <div class="loader"></div>
  </div>
  <div id="quote-container" v-if="quotes.error !== 'Invalid Request'">
    <div id="quoteDiv" v-for="quote in quotes" v-bind:key="quote.id">
      <p>{{ quote.quote }}</p>
      <div id="btns">
        <button class="button is-danger" @click="handleDelete(quote.id)">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button class="button is-info" @click.prevent="favIt(quote)">
          <i class="fas fa-bookmark"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { fetchApiQuotes, deleteQuote } from "../services/QuotesService";
import { favTheQuote } from "../services/FavoritesService";
import { getUserId } from "../services/TokenService";

export default {
  name: "Quotes",
  setup() {
    /* allows for reactive data - if data here chages, so does the template */
    const quotes = ref([]);
    const loading = ref({ status: true });

    const favorite = reactive({
      quote: "",
      author: "",
      user_id: getUserId(),
    });

    // waiting for token to be sent to the backend
    async function fetchData() {
      try {
        const response = await fetchApiQuotes();
        /*--- Using .value to give the quotes array the fetch data ---*/
        quotes.value = await response.json();
        loading.value.status = false;
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

    const favIt = async (quote) => {
      quote
        ? ((favorite.quote = quote.quote), (favorite.author = quote.author))
        : null;
      console.log("new fav added: ", favorite);
      try {
        await favTheQuote(favorite).then((res) => {
          if (res.status === 422 || res.status === 500) {
            console.log("err: ", res.status);
            alert("You've already added this to your favorites :)");
          } else {
            console.log("no err, status: ", res.status);
            alert("This has been added to your favorites :)");
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(fetchData());

    return { quotes, handleDelete, favIt, loading };
  },
};
</script>

<style>
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
  background-color: #fff;
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

.loader {
  text-align: center;
  border: 19px solid #f3f3f3;
  border-top: 19px solid #3498db;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#loaderSection {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
