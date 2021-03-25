<template>
  <h1>Quotes Below</h1>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "Quotes",
  setup() {
    const quotes = ref([]);

    async function fetchData() {
      const response = await fetch(`http://localhost:3000/offices`);
      quotes.value = await response.json();
    }

    onMounted(fetchData());

    return { quotes };
  },
};
</script>
