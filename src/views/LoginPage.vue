<template>
  <h1>Login Page</h1>
  <LoginForm />
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import LoginForm from "../components/LoginForm";

export default defineComponent({
  components: { LoginForm },
  setup() {},
});
</script>

<style scoped></style>
