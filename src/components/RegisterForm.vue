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
import { ref } from "vue";
export default {
  setup() {
    const BASE_URL = "http://localhost:3000/users";
    // split the below into three sepertae and change the v-model
    const user = ref({
      name: "",
      email: "",
      password: "",
    });
    // const email = ref("");

    // const name = ref("");

    // const password = ref("");

    // const user = {
    //   name: "user",
    //   email: "user@user.com",
    //   password: "user",
    // };

    async function registerUser(user) {
      await fetch(BASE_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }

    async function handleSubmit() {
      try {
        await registerUser(user);
      } catch (err) {
        console.log(err);
      }
    }
    return { registerUser, handleSubmit, user /*email, name, password*/ };
  },
};
</script>
