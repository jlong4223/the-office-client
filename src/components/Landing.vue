<template>
  <h1>Signup and Login to view Michael Scott Quotes</h1>
  <!-- TODO only show user if there is one -->
  <h2>Hi {{ user }}</h2>
  <img
    src="https://images-na.ssl-images-amazon.com/images/I/41CVehkzm6L._AC_SY450_.jpg"
    alt="mScott"
  />
</template>

<script>
import { getUserFromToken } from "../services/TokenService";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const user = ref([]);

    async function setUser() {
      const response = await getUserFromToken();
      user.value = response;
    }

    onMounted(setUser());

    return { user };
  },
};
</script>
