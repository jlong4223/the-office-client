<template>
  <div id="form-holder">
    <form @submit.prevent="handleSubmit(user)">
      <legend>Register</legend>
      <fieldset>
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-large"
              type="text"
              placeholder="Name"
              v-model="user.name"
              required
            />
            <span class="icon is-large is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-large is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-large"
              type="email"
              placeholder="Email"
              v-model="user.email"
              required
            />
            <span class="icon is-large is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-large is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-large"
              type="password"
              placeholder="Password"
              v-model="user.password"
              required
            />
            <span class="icon is-large is-left">
              <i class="fas fa-key"></i>
            </span>
            <span class="icon is-large is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
        <button
          class="button is-primary is-fullwidth"
          :disabled="user.email && user.password === ''"
        >
          Submit
        </button>
      </fieldset>
    </form>
    <button @click.prevent="goHome" class="button is-secondary">
      Cancel
    </button>
  </div>
</template>

<script>
import { reactive } from "vue";
import router from "@/router";

export default {
  setup() {
    const BASE_URL = "http://localhost:3000/users";

    /* adds reactive for ability to change values in the template */
    const user = reactive({
      name: "",
      email: "",
      password: "",
    });

    // TODO move below function to services
    function registerUser(user) {
      return fetch(BASE_URL, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ user }),
      });
    }

    const handleSubmit = async (user) => {
      console.log("user: ", user);
      try {
        await registerUser(user)
          .then((res) => {
            if (res.status === 422) {
              console.log("err: ", res.status);
              alert("Sorry, email is already in use...");
            } else {
              console.log("no err, status: ", res);
              alert("thanks for registering");
            }
          })
          .then(() => goHome());
      } catch (err) {
        console.log(err);
      }
    };

    const goHome = () => {
      console.log("going home...");
      router.push({ name: "HomePage" });
    };
    return { registerUser, handleSubmit, user, goHome };
  },
};
</script>

<style scoped>
#form-holder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  width: 50%;
  margin-top: 20px;
  padding: 10px;
}

legend {
  font-size: 35px;
}
</style>
