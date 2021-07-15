<template>
  <div>
    <h1>Welcome to your profile page :)</h1>
  </div>
  <div id="pageContent">
    <div id="img-col">
      <img
        src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
        alt="user"
        width="150"
      />
      <form @submit.prevent="postUserPicData" enctype="multipart/form-data">
        <input type="file" v-on:change="updatePicInfoImage" />
        <button class="button is-info" title="Disabled button">
          Upload Profile Image
        </button>
      </form>
      <h3>Profile Image Upload coming soon</h3>
    </div>
    <div>
      <h3>{{ userName }}, here is your profile information:</h3>
      <!-- TODO add more user profile info and loading screen and/or materialUI skeleton -->
      <h4>You joined us on {{ createdAt }}</h4>
      <h5>You have favorited {{ favAmount }} quotes</h5>
    </div>
  </div>
  <!-- TODO show images here -->
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { getUserFavorites } from "../services/UserService";
import { getUserId } from "../services/TokenService";
import axios from "axios";
import Console from "Console";
import map from "lodash/map";

export default {
  setup() {
    onMounted(getData(), getUserPicData());

    /* ----- All "State" Data ----- */
    const userInfo = ref({});
    const favAmount = ref([]);
    const userName = ref();
    const createdAt = ref();
    const allPicData = ref();
    const pictureUrls = ref();
    const picInfo = reactive({
      userID: "",
      application: "office-client",
      image: null,
      isProfilePic: false,
    });

    async function getData() {
      try {
        const data = await getUserFavorites();
        const userData = await data.json();
        /* saving all ref values based on data from user */
        favAmount.value = userData.favorites.length;
        userName.value = userData.name;
        createdAt.value = new Date(userData.created_at);
        userInfo.value = userData;
        picInfo.userID = userData.id;
      } catch (e) {
        console.log(e);
      }
    }

    const updatePicInfoImage = (e) => {
      picInfo.image = e.target.files[0];
    };

    async function postUserPicData() {
      const userPicData = new FormData();
      /* adding all elements from picInfo to the form data and posting it */
      userPicData.append("image", picInfo.image);
      userPicData.append("userID", picInfo.userID);
      userPicData.append("application", picInfo.application);
      userPicData.append("isProfilePic", picInfo.isProfilePic);

      try {
        await axios
          .post("http://localhost:3001/allapps", userPicData)
          .then((res) =>
            res.status === 200
              ? Console.success("* * * image uploaded: ", res.status)
              : Console.error("! ! ! image upload failure: ", res)
          );
      } catch (err) {
        console.log(err);
      }
    }

    async function getUserPicData() {
      // this is grabbing users data and saving pic urls and the objects to diff refs
      const data = await axios
        .get(`http://localhost:3001/allapps/office-client/${getUserId()}`)
        .then((pic) => pic.data);

      const getPicUrls = map(data, (each) =>
        map(each.picture, (item) => item.image)
      );

      allPicData.value = data[0].picture;
      pictureUrls.value = getPicUrls;
    }

    // TODO have a function that has a patch req to update pic with being a profile pic to true

    return {
      favAmount,
      userName,
      userInfo,
      createdAt,
      picInfo,
      updatePicInfoImage,
      postUserPicData,
      pictureUrls,
      allPicData,
    };
  },
};
</script>

<style scoped>
#pageContent {
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
}

#img-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
