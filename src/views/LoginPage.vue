<template>
  <h1>Login Page</h1>
  <LoginForm />
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import LoginForm from "../components/LoginForm";

export default defineComponent({
  components: { LoginForm },
  setup(props, context) {
    context.attrs;
    context.route;
    return { context };
  },
});
</script>

<style scoped></style>
