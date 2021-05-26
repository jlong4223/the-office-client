<template>
  <div>
    <h1>Welcome to your profile page :)</h1>
  </div>
  <div id="pageContent">
    <div>Profile Image Upload coming soon</div>
    <div>
      <h3>{{ userName }}, here is your profile information:</h3>
      <!-- TODO add more user profile info and loading screen and/or materialUI skeleton -->
      <h4>You joined us on...</h4>
      <h5>You have favorited {{ favAmount.length }} quotes</h5>
    </div>
  </div>
</template>

<script>
import { getUserFavorites } from "../services/UserService";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const favAmount = ref([]);
    const userName = ref();

    async function getData() {
      try {
        const data = await getUserFavorites();
        const userData = await data.json();
        console.log(userData);
        favAmount.value = userData.favorites;
        userName.value = userData.name;
        // loading.value.status = false;
      } catch (e) {
        console.log(e);
      }
    }

    onMounted(getData());
    return { favAmount, userName };
  },
};
</script>

<style scoped>
#pageContent {
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
}
</style>
