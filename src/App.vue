<template>
  <div id="navbar" v-if="user.name === null">
    <router-link to="/">Home </router-link>
    <router-link
      :to="{ name: 'LoginPage', params: { setUser: setUser } }"
      setUser="setUser"
      >| Login |</router-link
    >
    <router-link to="/register">
      Register
    </router-link>
  </div>

  <div id="navbar" v-if="user.name !== null">
    <router-link to="/">Home </router-link>
    <router-link to="/quotes">| Quotes </router-link>
    <router-link to="" @click="handleLogout">| Logout | </router-link>
    <router-link to="">Hi, {{ user.name }}</router-link>
  </div>

  <router-view />
</template>

<script>
import { logout } from "./services/UserService";
import { getUserFromToken } from "./services/TokenService";
import { onMounted, reactive } from "vue";
import router from "@/router";

export default {
  name: "App",
  components: {},
  setup() {
    const user = reactive({
      name: "",
    });

    // TODO pass setUser to the loginForm
    async function setUser() {
      const response = await getUserFromToken();
      user.name = response;
    }

    function handleLogout() {
      logout();
      setUser().then(() => goHome());
    }

    // TODO why does it go home and then back to page that I was on?
    function goHome() {
      console.log("going home...");
      router.replace({ name: "HomePage" });
    }

    onMounted(setUser());

    return { handleLogout, user, setUser };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* display: flex;
  flex-direction: column; */
}
</style>
