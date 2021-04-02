<template>
  <!-- <div id="app"></div> -->
  <div>
    <div id="navbar" v-if="user.name === null">
      <router-link to="/" @click="getUserFromToken">Home &nbsp;</router-link>
      <router-link
        :to="{ name: 'LoginPage', params: { setUser: setUser } }"
        setUser="setUser"
        >| Login |</router-link
      >
      <router-link to="/register">
        &nbsp; Register &nbsp;
      </router-link>
      <p @click="toggleNewPage">| Test</p>
    </div>

    <div id="navbar" v-if="user.name !== null">
      <router-link to="/">Home &nbsp;</router-link>
      <router-link to="/quotes">| Quotes &nbsp;</router-link>
      <router-link to="" @click="handleLogout">| Logout | </router-link>
      <router-link to="">&nbsp; Hi, {{ user.name }}</router-link>
    </div>
  </div>
  <div v-if="page.newPage === true">
    <LoginForm :setUser="setUser" :toggleNewPage="toggleNewPage" />
  </div>

  <router-view />
</template>

<script>
import { logout } from "./services/UserService";
import { getUserFromToken } from "./services/TokenService";
import { onMounted, reactive } from "vue";
import router from "@/router";
import LoginForm from "./components/LoginForm";

export default {
  name: "App",
  components: { LoginForm },
  setup() {
    const user = reactive({
      name: "",
    });

    async function setUser() {
      const response = await getUserFromToken();
      user.name = response;
    }

    function handleLogout() {
      logout();
      setUser();
      goHome();
    }

    // TODO why does it go home and then back to page that I was on?
    function goHome() {
      console.log("going home...");
      router.replace({ name: "HomePage" });
    }

    onMounted(setUser());

    // ======================
    const page = reactive({
      newPage: false,
    });

    const toggleNewPage = function() {
      page.newPage = !page.newPage;
    };

    return { handleLogout, user, setUser, toggleNewPage, page };
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

#navbar {
  display: flex;
  justify-content: center;
}
</style>
