<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import CONSTANS from '../../const.js'

export default {
  data() {
    return {
      limit: 0,
      films: [],
      film: [
        {},
        {
          img: CONSTANS.GRAY,
          netflix_id: 0,
          infoBase: {
              like: CONSTANS.LIKE , 
              eye: CONSTANS.EYE
            },
        },
        {img: CONSTANS.GRAY},
      ],
      likes: [],
      eyes: [],
      randomNumber: 0,
    };
  },
  mounted() {
    const historyFromStorage = JSON.parse(localStorage.getItem("history"));
    const limit = JSON.parse(localStorage.getItem("limit"));
    const likes = JSON.parse(localStorage.getItem("likes"));
    const eyes = JSON.parse(localStorage.getItem("eyes"));
    const filmFromStorage = JSON.parse(localStorage.getItem("Film"));
    const lastFilmFromStorage = JSON.parse(localStorage.getItem("LastFilm"));
    if (historyFromStorage) this.SET_FILMS_TO_HISTORY(historyFromStorage);
    if (limit) this.limit = limit;
    if (this.limit <= 80) this.SET_FILMS();
    if (likes) this.likes = likes;
    if (eyes) this.eyes = eyes;
    
    if (filmFromStorage) {
      this.film[1] = filmFromStorage;
      this.film[1].infoBase.eye = this.eyes.some((obj) => obj.netflix_id == this.film[1].netflix_id)
        ? CONSTANS.EYE_FULL
        : CONSTANS.EYE;
      this.film[1].infoBase.like = this.likes.some((obj) => obj.netflix_id == this.film[1].netflix_id)
        ? CONSTANS.LIKE_FULL
        : CONSTANS.LIKE;
      this.SET_FILM_TO_STATE(this.film[1]);
    }

    if (lastFilmFromStorage) {
      this.film[2] = lastFilmFromStorage;
      this.film[2].infoBase.eye = this.eyes.some((obj) => obj.netflix_id == this.film[2].netflix_id)
        ? CONSTANS.EYE_FULL
        : CONSTANS.EYE;
      this.film[2].infoBase.like = this.likes.some((obj) => obj.netflix_id == this.film[2].netflix_id)
        ? CONSTANS.LIKE_FULL
        : CONSTANS.LIKE;
    }

    if (this.film[1].img == CONSTANS.GRAY && this.films.length > 0) {
      this.randomNumber = Math.floor(Math.random() * this.films.length);
      this.film[1] = this.films[this.randomNumber];
      localStorage.setItem("Film", JSON.stringify(this.film[1]));
    }
  },


   methods: {
    ...mapActions(["GET_FILMS_FROM_API"]),
    ...mapMutations(["SET_FILMS_TO_STATE","SET_FILM_TO_STATE","SET_FILM_TO_HISTORY","SET_FILMS_TO_HISTORY","SET_TO_ARRAY"]),
    getMovie() {
      let arraySorted = [];
      if (this.getFilms.length > 0) {
        arraySorted = this.getFilms.filter(
          (objSorted) =>
            !this.likes.some((objLiked) => objLiked.netflix_id == objSorted.netflix_id) &&
            !this.eyes.some((objEyed) => objEyed.netflix_id == objSorted.netflix_id)
        );
        this.SET_FILMS_TO_STATE(arraySorted);
        this.randomNumber = Math.floor(Math.random() * this.getFilms.length);
        if (!this.film[1]) {
          this.film[1] = this.getFilms[this.randomNumber];
        } else {
          this.film[0] = this.getFilms[this.randomNumber];
          this.film[2] = this.film[1];
          this.film[1] = this.film[0];
        }
        this.film[1].infoBase={
            eye  : CONSTANS.EYE,
            like : CONSTANS.LIKE,
          }
        localStorage.setItem("LastFilm",   JSON.stringify(this.film[2]));
        localStorage.setItem("Film",       JSON.stringify(this.film[1]));
        this.SET_FILM_TO_STATE(this.film[1])
        this.SET_FILM_TO_HISTORY({netflix_id:this.film[1].netflix_id,title:this.title,type:this.film[1].title_type,img:this.film[1].img})
        localStorage.setItem('history', JSON.stringify(this.getHistory));
      } else {
        console.log(this.films.length);
        if(this.limit<80) this.SET_FILMS();
      }
    },
    SET_FILMS() {
      let param;
      let obj;
      if (JSON.parse(localStorage.getItem("Param"))) {
        param = JSON.parse(localStorage.getItem("Param"));
        console.log(param);
        obj =
          "end_rating=" +
          param.rating[1] +
          "&start_year=" +
          param.date[0] +
          "&order_by=" +
          param.order_by +
          "&end_year=" +
          param.date[1] +
          "&start_rating=" +
          param.rating[0];
        if (param.country.length != 0) {
          obj += "&country_list=" + param.country.join(",");
        }
        if (param.type) {
          obj += "&type=" + param.type;
        }
        if (param.genre && param.genre != 0) {
          obj += "&genre_list=" + param.genre;
        }
      }else{
        obj = "order_by=rating&start_rating=3"
      }
      if(obj!=localStorage.getItem("obj") || this.getFilms.length == 0){
        localStorage.setItem("obj", obj);
        this.limit++;
        console.log(this.limit);
        localStorage.setItem("limit", this.limit);
        this.GET_FILMS_FROM_API(obj);
      }
    },
    getLastMovie() {
      if (this.film[2].img != CONSTANS.GRAY) {
        this.film[0] = this.film[1];
        this.film[1] = this.film[2];
        this.film[2] = this.film[0];
        this.film[0] = {};
        this.SET_FILM_TO_STATE(this.film[1])
        this.SET_FILM_TO_HISTORY({netflix_id:this.film[1].netflix_id,title:this.film[1].title,type:this.film[1].title_type,img:this.film[1].img})
        localStorage.setItem("LastFilm", JSON.stringify(this.film[2]));
        localStorage.setItem("Film", JSON.stringify(this.film[1]));
        localStorage.setItem('history', JSON.stringify(this.getHistory))
      }
    },
    addToArray(array, property) {
    this.SET_TO_ARRAY({to_array:array, property:property,from_array_name: 'film',title: this.title});
      this.film[1]=this.getFilm
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
    ...mapGetters(["getFilms", "getFilm", "getHistory"]),
    synopsis() {
      return this.deleteSymbols(this.film[1].synopsis, "&#39;", "'");
    },
    title() {
      return this.deleteSymbols(this.film[1].title, "&#39;", "'");
    },
  },
};
</script>

<template>
  <main>
    <div class="container">
      <section class="block-to-hide">
        <img
          :src="film[2].img"
          alt=""
          class="section blocks"
          v-show="film[2].img != CONSTANS.GRAY && film[2].img!=''"
        />
      </section>
      <section>
        <img :src="film[1].img" alt="" class="section-big blocks" />
      </section>
      <section >
        <div class="section blocks bg-gray-400 overflow-hidden ">
          <div class="title">{{ title }}</div>
            <div class="text">{{ synopsis }}</div>
        </div>
      </section>
    </div>
    <div class="container">
      <section class="block-to-hide">
        <button
          class="p-1 w-40 blocks button"
          @click="getLastMovie"
          v-show="film[2].img != CONSTANS.GRAY && film[2].img!=''"
        >
          Попереднє
        </button>
      </section>
      <section class="flex">
        <div class="flex">
          <button class="small-button blocks button" @click="addToArray(likes, 'like')" v-show="film[1].img !=  CONSTANS.GRAY">
            <img
              :src="film[1].infoBase.like"
              alt=""
              class="w-9 h-9"
            />
          </button>
        </div>

        <div class="flex">
          <button class="small-button blocks button" @click="addToArray(eyes, 'eye')" v-show="film[1].img !=  CONSTANS.GRAY">
            <img
              :src="film[1].infoBase.eye"
              alt=""
              class="w-9 h-9"
            />
          </button>
        </div>
      </section>
      <section>
        <router-link :to="{ name: 'details', params: { netflix_id: film[1].netflix_id } }"
          ><button
            class="p-1 w-40 blocks button"
            v-show="film[1].img !=  CONSTANS.GRAY && film[1].img != ''"
          >
            Детальніше
          </button></router-link
        >
      </section>
    </div>
    <div class="flex">
      <button
        class="main-button mr-auto ml-auto"
        @click="getMovie"
        :disabled="getFilms.length == 0"
      >
        ГЕНЕРУВАТИ
      </button>
    </div>
  </main>
</template>

<style scoped>
.text{
  @apply bg-gray-300 mt-5 h-full p-2 text-justify;
}
div {
  @apply w-full;
}
section {
  @apply w-full text-center justify-center items-center;
  padding: 5px;
}
.section {
  width: 20em;
  height: 27.5em;
  margin-top: 5%;
}
.section-big {
  width: 22.5em;
  height: 30em;
}
.container {
  @apply flex mr-auto ml-auto;
}

.blocks {
  @apply rounded-3xl ml-auto mr-auto;
}
section div {
  @apply rounded-3xl;
}
.title {
  @apply bg-yellow-300 font-medium p-5;
  font-size: large;
}
.main-button {
  @apply bg-yellow-300 p-3 font-medium rounded-full text-xl mt-5 hover:bg-yellow-200 hover:transition-all disabled:bg-yellow-100 disabled:text-gray-300;
}
.button {
  @apply bg-gray-300 text-lg overflow-hidden contrast-75 p-2;
}
.button:hover {
  @apply bg-gray-200 contrast-100 transition-all;
}
.small-button {
  @apply max-w-max rounded-full;
}
@media (max-width: 1200px) {
  section{
    @apply p-5;
  }
  .block-to-hide {
    display: none;
  }
  .section {
    width: auto;
    height: 30em;
    margin-top: 0;
  }
  .section-big {
    min-width: 300px;
  }
}
@media (max-width: 767px) {
  .container {
    display: block;
  }
  .section {
    max-width: 360px;
    height: auto;
  }
  .section-big {
    min-width: auto;
  }
  .text {
    
    font-size: 20px;
  }
  .title {
    font-size: 25px;
  }
}
</style>
