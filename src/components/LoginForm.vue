<template>
  <div id="form-holder">
    <form>
      <legend>Login</legend>
      <fieldset>
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
        <button class="button is-primary is-fullwidth">Submit</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  // TODO define a handleSubmit function after getting Rails Route
  setup() {
    const user = reactive({
      email: "",
      password: "",
    });

    return { user };
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
