<template>
  <h1>Signup and Login to view Michael Scott or Ron Swanson Quotes</h1>
  <div>
    <router-link to="/quotes"
      ><img
        id="scott"
        src="https://images-na.ssl-images-amazon.com/images/I/41CVehkzm6L._AC_SY450_.jpg"
        alt="mScott"
    /></router-link>
    <router-link to="swanson_quotes">
      <img
        id="swanson"
        src="https://i.etsystatic.com/16692478/r/il/2b4631/1416991338/il_570xN.1416991338_1ndf.jpg"
        alt="mScott"
    /></router-link>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped>
/* div {
  display: flex; 
  height: 80vh;
  justify-content: space-between;
  align-items: center;
} */

/* img:hover {
  transform: scale(1.2, 1.2);
} */

/* #swanson {
  width: 630px;
}
#scott {
  margin-left: 150px;
} */
</style>
