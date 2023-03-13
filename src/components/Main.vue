<script>
import { mapGetters } from 'vuex'
export default({
  data(){
    return{
      objectNumber:1,
      dataFilm:[{
        imdb_id:"",
        netflix_id:0,
        poster:"",
        rating:"",
        runtime:"",
        synopsis:"",
        title:"",
        year:"",
        img:"",
      }]
    }
  },
  mounted(){

  },
  methods:{
    increment(){
      this.$store.commit('increment')
    },
    decrement(){
      this.$store.commit('decrement')
    },
    getDataFromServer(){
      this.$store.commit('getDataFromServer')
    }
  },
  computed:{
    ...mapGetters(['count','dataFilmTitle','dataFilm']),
  }
})
</script>


<template>
  <!-- <button class="button p-5" @click="getDataFromServer" @auxclick="decrement">{{count}}</button>
  <h1>{{dataFilmTitle}}</h1>
  <img :src="dataFilm.img" alt=""> -->

  <main class="flex-col">
    <div class="container top mr-auto ml-auto">
      <section>
        <img src="/src/assets/poster.png" alt="" class="section blocks">
      </section>
      <section>
        <img src="/src/assets/poster.png" alt="" style="min-width: 300px; width: 300px; height: 450px;" class="blocks">
      </section>
      <section>
        <div class="section blocks bg-gray-400 overflow-hidden">
          <div class="bg-yellow-300 text-lg font-medium p-5">НАЗВА</div>
          <div class="bg-gray-300 mt-5 h-full">Опис</div>
        </div>
        
      </section>
    </div>
    <div class="container bottom mr-auto ml-auto">
      <section> 
        <button class="p-1 w-40 blocks button">Попереднє</button></section>
      <div class="flex">
        <div>
          <button class="small-button blocks button"><img src="/src/assets/like.png" alt="" class="w-9 h-9"></button>
        </div>
        <div>
          <button class="small-button blocks button"><img src="/src/assets/eye.png" alt="" class="w-9 h-9"></button>
        </div>
      </div>
      <section>
        <button class="p-1 w-40 blocks button">Детальніше</button>
      </section>
    </div>
    <div class="container mr-auto ml-auto">
      <button class="main-button">ГЕНЕРУВАТИ</button>
    </div>
  </main>
</template>

<style scoped>
div{
  @apply w-full relative;
}
section {
  @apply w-full relative text-center flex-col justify-center items-center;
}
img {
  @apply self-center
}
.section{
  width:250px; 
  height: 375px;
}
.container{
  @apply flex justify-center w-full
}
.top{
  height: 480px;
}
.bottom{
  height: 60px;
}
.blocks{
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl;
}
section div {
  @apply rounded-3xl;
}
.main-button {
  @apply bg-yellow-300 p-3 font-medium rounded-full text-xl mt-5;
}
.main-button:hover{
  @apply bg-yellow-200 transition-all
}
.button {
  @apply bg-gray-300 rounded-3xl text-lg overflow-hidden contrast-75;
}
.button:hover{
  @apply bg-gray-200 contrast-100 transition-all 
}
.small-button{
  @apply max-w-max p-2;
}
</style>
