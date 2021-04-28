<template>
  <h1>Login Page</h1>
  <LoginForm :setUser="setUser" />
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import LoginForm from "../components/LoginForm";

export default defineComponent({
  components: { LoginForm },
  props: {
    setUser: String,
  },
  setup(props, context) {
    context.attrs;
    context.route;
    return { context, props };
  },
});
</script>

<style scoped></style>
