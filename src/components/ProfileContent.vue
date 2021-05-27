<template>
  <div>
    <h1>Welcome to your profile page :)</h1>
  </div>
  <div id="pageContent">
    <div id="img-col">
      <img
        src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
        alt="user"
        width="150"
      />
      <button class="button is-info" title="Disabled button" disabled>
        Upload Profile Image
      </button>
      <h3>Profile Image Upload coming soon</h3>
    </div>
    <div>
      <h3>{{ userName }}, here is your profile information:</h3>
      <!-- TODO add more user profile info and loading screen and/or materialUI skeleton -->
      <h4>You joined us on {{ createdAt }}</h4>
      <h5>You have favorited {{ favAmount }} quotes</h5>
    </div>
  </div>
</template>

<script>
import { getUserFavorites } from "../services/UserService";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const userInfo = ref({});
    const favAmount = ref([]);
    const userName = ref();
    const createdAt = ref();

    async function getData() {
      try {
        const data = await getUserFavorites();
        const userData = await data.json();
        console.log(userData);
        favAmount.value = userData.favorites.length;
        userName.value = userData.name;
        createdAt.value = new Date(userData.created_at);
        userInfo.value = userData;

        // loading.value.status = false;
      } catch (e) {
        console.log(e);
      }
    }

    onMounted(getData());
    return { favAmount, userName, userInfo, createdAt };
  },
};
</script>

<style scoped>
#pageContent {
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
}

#img-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
