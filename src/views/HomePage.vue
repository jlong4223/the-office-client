<template>
  <div>
    <div id="navbar" v-if="user.name === null">
      <router-link to="/" @click.prevent="getUserFromToken"
        >Home &nbsp;</router-link
      >
      <!-- Passing props through the query and declaring them in route file -->
      <router-link
        :to="{
          name: 'LoginPage',
          params: { setUser: setUser },
        }"
        >| Login |</router-link
      >
      <router-link to="/register">
        &nbsp; Register &nbsp;
      </router-link>
      <!-- <p @click="toggleNewPage">| Test Login</p> -->
    </div>

    <div id="navbar" v-if="user.name !== null">
      <router-link to="/" @click.prevent="getUserFromToken"
        >Home &nbsp;</router-link
      >
      <router-link to="" @click.prevent="handleLogout">| Logout | </router-link>
      <router-link to="/favorites">&nbsp; Favorites |</router-link>
      <p>&nbsp; Hi, {{ user.name.toUpperCase() }}</p>
    </div>
  </div>
  <!-- THE BELOW WAS A TEST TOGGLE FORM TO PASS PROPS BEFORE -->
  <!-- <div v-if="page.newPage === true"> -->
  <!-- <LoginPage :setUser="setUser" :toggleNewPage="toggleNewPage" /> -->
  <!-- <LoginForm :setUser="setUser" :toggleNewPage="toggleNewPage" />
  </div> -->
  <div v-if="page.newPage === false">
    <Landing :user="user" />
  </div>
</template>

<script>
/* ------ vue hooks -------*/
import { defineComponent } from "@vue/composition-api";
import { onMounted, reactive } from "vue";
import router from "@/router";
/* -------- services ------ */
import { logout } from "../services/UserService";
import { getUserFromToken } from "../services/TokenService";
/* ----- Components/Pages ----*/
// import LoginPage from "../views/LoginPage";
// import LoginForm from "../components/LoginForm";
import Landing from "../components/Landing";

export default defineComponent({
  components: { Landing },
  setup() {
    /*-------- navbar user functions -------*/
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

    onMounted(setUser());

    // BUG why does it go home and then back to page that I was on?
    function goHome() {
      console.log("going home...");
      router.replace({ name: "HomePage" });
    }

    /* ------ Login toggle ------- */
    const page = reactive({
      newPage: false,
    });

    const toggleNewPage = function() {
      page.newPage = !page.newPage;
    };

    /* ------ returned functions for access outside of setup -----*/
    return {
      handleLogout,
      user,
      setUser,
      toggleNewPage,
      page,
      getUserFromToken,
    };
  },
});
</script>

<style scoped>
#navbar {
  display: flex;
  justify-content: center;
}
</style>
