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
</template>

<script>
import { getUserFavorites } from "../services/UserService";
import { onMounted, ref, reactive } from "vue";
import axios from 'axios'

export default {
  setup() {
    const userInfo = ref({});
    const favAmount = ref([]);
    const userName = ref();
    const createdAt = ref();

    const picInfo = reactive({
      userID: '',
      application: 'office-client',
      image: null
    })

    onMounted(getData());

    async function getData() {
      try {
        const data = await getUserFavorites();
        const userData = await data.json();
        /* saving all ref values based on data from user */
        favAmount.value = userData.favorites.length;
        userName.value = userData.name;
        createdAt.value = new Date(userData.created_at);
        userInfo.value = userData;
        picInfo.userID = userData.id
      } catch (e) {
        console.log(e);
      }
    }

    const updatePicInfoImage = (event) => {
      picInfo.image = event.target.files[0]
    }

// TODO if they change their image, have a put request that goes through and changes their image instead of saving a new one
// may need an function that gets the userid route from backend and if they exist, put instead of create
    async function postUserPicData() {
      const userPicData = new FormData()
      /* adding all elements from picInfo to the form data and posting it */
      userPicData.append("image", picInfo.image)
      userPicData.append("userID", picInfo.userID)
      userPicData.append("application", picInfo.application)
        try{
          axios.post("http://localhost:3001/allapps", userPicData)
        }catch(err){
          console.log(err)
        }
      }

    // TODO have a function that gets the image and updates the picture


    return { 
      favAmount,
      userName, 
      userInfo, 
      createdAt, 
      picInfo, 
      updatePicInfoImage, 
      postUserPicData 
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
