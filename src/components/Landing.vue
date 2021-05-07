<template>
  <h1 v-if="user.name === null">
    Signup and Login to view Michael Scott or Ron Swanson Quotes
  </h1>
  <div id="page">
    <div class="img-quote">
      <router-link to="/quotes"
        ><img
          id="scott"
          src="https://images-na.ssl-images-amazon.com/images/I/41CVehkzm6L._AC_SY450_.jpg"
          alt="mScott"
      /></router-link>
      <p>&ldquo;That's what she said&rdquo;</p>
    </div>
    <div class="img-quote">
      <p>
        &ldquo;Fishing relaxes me. It’s like yoga, except I still get to kill
        something.&rdquo;
      </p>
      <router-link to="swanson_quotes">
        <img
          id="swanson"
          src="https://i.etsystatic.com/16692478/r/il/2b4631/1416991338/il_570xN.1416991338_1ndf.jpg"
          alt="mScott"
      /></router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      name: String,
    },
  },
  setup(context, props) {
    // const username = context.attrs.user.name;
    return { context, props };
  },
};
</script>

<style scoped>
#page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.img-quote {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 75%;
  height: 370px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid black;
}
.img-quote p {
  font-size: 20px;
}
#scott {
  height: 300px;
}
</style>
