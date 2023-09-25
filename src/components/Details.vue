<template>
  <main>
    <div class="preloader" v-if="getInfo.infoBase.status=='loading'">
      <div class="loader">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </div>

    <div class="container mr-auto ml-auto" v-else-if="getInfo.infoBase.status=='loaded'">
      <section class="flex w-2/5">
        <img
          v-show="getInfo.detail.large_image || getInfo.detail.default_image"
          :src="
            getInfo.detail.large_image
              ? getInfo.detail.large_image
              : getInfo.detail.default_image
          "
          class="rounded-3xl"
        />
        <div class="container mr-auto ml-auto">
          <div class="flex" v-show="getInfo.infoBase.like && getInfo.infoBase.eye">
            <div>
              <button
                class="small-button blocks button"
                @click="addToArray(likes, 'like')"
              >
                <img :src="getInfo.infoBase.like" alt="" class="w-9 h-9" />
              </button>
            </div>
            <div>
              <button class="small-button blocks button" @click="addToArray(eyes, 'eye')">
                <img :src="getInfo.infoBase.eye" alt="" class="w-9 h-9" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="w-3/5 infobox mr-5">
        <div class="bg-gray-400 overflow-hidden blocks">
          <div class="bg-yellow-300 text-lg font-medium p-5">
            {{ title }} ( {{ getInfo.detail.year }} )
          </div>
          <div class="bg-gray-300 mt-5 h-max text-justify p-2">{{ synopsis }}</div>
          <div class="bg-gray-300 mt-5 h-max text-justify overflow-hidden">
            <table>
              <tr v-show="getInfo.detail.title_type">
                <td class="w-max text-center">Тип</td>
                <td class="w-full text-right">
                  {{ getInfo.detail.title_type}}
                </td>
              </tr>
              <tr v-show="runtime != '0 : 0 : 0'">
                <td class="w-max text-center">Тривалість</td>
                <td class="w-full text-right">{{ runtime }}</td>
              </tr>
              <tr v-show="genre ">
                <td class="w-max text-center">Жанр</td>
                <td class="w-full text-right">{{ genre }}</td>
              </tr>
              <tr v-show="getInfo.detail.origin_country">
                <td class="w-max text-center">Країна</td>
                <td class="w-full text-right">
                  {{ getInfo.detail.origin_country}}
                </td>
              </tr>
              <tr v-show="directors">
                <td class="w-max text-center">Режисери</td>
                <td class="w-full text-right">{{ directors }}</td>
              </tr>
              <tr v-show="creators">
                <td class="w-max text-center">Сценаристи</td>
                <td class="w-full text-right">{{ creators }}</td>
              </tr>
              <tr v-show="actors">
                <td class="w-max text-center">Актори</td>
                <td class="w-full text-right">{{ actors }}</td>
              </tr>
              <tr v-show="getInfo.detail.rating || film.rating">
                <td class="w-max text-center">Рейтинг</td>
                <td class="w-full text-right">
                  {{ getInfo.detail.rating ? getInfo.detail.rating : film.rating }}
                </td>
              </tr>
              
            </table>
          </div>
        </div>
      </section>
    </div>
    <div class="container mr-auto ml-auto" v-else-if="getInfo.infoBase.status=='empty'">
      <p class="text-6xl text-white">Проблема зі з'єднанням, можливо перевищен ліміт запитів</p>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import "../style/loader.css";
export default {
  data() {
    return {
      limit: 0,
      film: {},
      likes: [],
      eyes: [],
    };
  },
  async mounted() {
    this.film.netflix_id = this.$route.params.netflix_id;

    const infoFromStorage = JSON.parse(localStorage.getItem("info"));
    const limit = JSON.parse(localStorage.getItem("limit"));
    const likes = JSON.parse(localStorage.getItem("likes"));
    const eyes = JSON.parse(localStorage.getItem("eyes"));

    if (infoFromStorage) this.SET_DETAILS_TO_STATE(infoFromStorage);
    if (limit) this.limit = limit;
    if (this.film.netflix_id != this.getInfo.detail.netflix_id) {
      this.SET_DETAILS_TO_STATE("");
      if (limit <= 80) {
        this.SET_DETAILS_TO_STATE("load");
        await this.SET_INFO();
        console.log(this.film.netflix_id + " - film");
      }
    }

    if (likes) {
      this.likes = likes;
      console.log('like');
      if (this.likes.some((obj) => obj.netflix_id == this.film.netflix_id)) {
        this.SET_INFOBASE_FOR_DETAILS_TO_STATE({ info: this.getConst.LIKE_FULL, property: "like" });
      }
    }

    if (eyes) {
      this.eyes = eyes;
      console.log("eye");
      if (this.eyes.some((obj) => obj.netflix_id == this.film.netflix_id)) {
        this.SET_INFOBASE_FOR_DETAILS_TO_STATE({ info: this.getConst.EYE_FULL, property: "eye" });
      }
    }
  },


  methods: {
    ...mapActions(["GET_DETAILS_FROM_API"]),
    ...mapMutations(["SET_DETAILS_TO_STATE","SET_INFOBASE_FOR_DETAILS_TO_STATE","SET_TO_ARRAY"]),
    async SET_INFO() {
      this.limit+=3;
      console.log(this.limit);
      localStorage.setItem("limit", this.limit);
      await this.GET_DETAILS_FROM_API(this.film.netflix_id);
      console.log(this.getInfo);
    },
    GET_PEOPLE(people) {
      let a = "";
      return this.deleteSymbols(
        this.getInfo.people
          .map((elem) => {
            if (elem.person_type == people && a != elem.full_name) {
              a = elem.full_name;
              return elem.full_name;
            }
          })
          .filter((elem) => elem != undefined)
          .join(", "),"&#39;","'");
    },
    addToArray(array, property) {
      this.SET_TO_ARRAY({to_array:array, property:property,from_array_name: 'info',title: this.title});
    },
    deleteSymbols(obj, oldSymbol, updateSymbol) {
      if (obj) {
        while (obj.search(oldSymbol) != -1) {
          console.log(obj);
          obj = obj.replace(oldSymbol, updateSymbol);
        }
      }
      return obj;
    },
  },
  computed: {
    ...mapGetters(["getInfo",'getConst']),
    synopsis() {
      return this.deleteSymbols(this.getInfo.detail.synopsis, "&#39;", "'");
    },
    title() {
      return this.deleteSymbols(this.getInfo.detail.title, "&#39;", "'");
    },
    runtime() {
      let hour;
      let minute;
      let second;
      let time = this.getInfo.detail.runtime;
      if (this.getInfo.detail.runtime == "") {
        time = this.getInfo.detail.alt_runtime;
      }
      hour = Math.floor(time / 3600);
      minute = Math.floor((time % 3600) / 60);
      second = time - (minute * 60 + hour * 3600);
      console.log(hour + " : " + minute + " : " + second);
      return hour + " : " + minute + " : " + second;
    },
    genre() {
      return this.getInfo.genreList.map((elem) => elem.genre).join(", ");
    },
    actors() {
      return this.GET_PEOPLE("Actor");
    },
    directors() {
      return this.GET_PEOPLE("Director");
    },
    creators() {
      return this.GET_PEOPLE("Creator");
    },
  },
};
</script>

<style scoped>

div {
  @apply w-full;
}
section {
  @apply w-full text-center flex-col justify-center items-center p-1;
}
main {
  min-width: fit-content ;
  min-height: 400px;
  position: relative;
}
img {
  @apply self-center;
}
.container {
  @apply flex justify-center w-full;
}
.blocks {
  @apply rounded-3xl;
}
section div {
  @apply rounded-3xl;
}
.button {
  @apply bg-gray-300 rounded-3xl text-lg overflow-hidden contrast-75;
}
.button:hover {
  @apply bg-gray-200 contrast-100 transition-all;
}
.small-button {
  @apply max-w-max p-2 m-4;
}
td {
  border: 1px solid rgb(156, 163, 175);
  @apply p-2 border-collapse;
}
@media(max-width:767px){
  .container{
    display: block;
  }
  .infobox{
    max-width: 360px;
    margin-right: auto;
    margin-left: auto;
  }
}
@media (max-width:400px){
  div>p{
    @apply text-4xl
  }
}
</style>
