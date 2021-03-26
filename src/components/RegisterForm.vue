<template>
  <form @submit.prevent="handleSubmit">
    <legend>Register</legend>
    <fieldset>
      <input type="text" placeholder="name" v-model="user.name" required />
      <input type="email" placeholder="email" v-model="user.email" required />
      <input
        type="password"
        placeholder="password"
        v-model="user.password"
        required
      />
      <button>Submit</button>
    </fieldset>
  </form>
</template>

<script>
import { reactive } from "vue";
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
    async function registerUser(user) {
      await fetch(BASE_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });
    }

    async function handleSubmit() {
      try {
        await registerUser(user);
        // TODO figure out how to push user home
        alert("thanks for registering")(
          (user.name = ""),
          (user.email = ""),
          (user.password = "")
        );
      } catch (err) {
        console.log(err);
      }
    }
    return { registerUser, handleSubmit, user };
  },
};
</script>
