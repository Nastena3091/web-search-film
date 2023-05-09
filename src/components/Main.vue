<script>
import { mapActions, mapGetters } from 'vuex'
import store from '../store'
export default({
  data(){
    return{
      limit:0,
      films:[],
      film:[{like:'/src/assets/like.png'},{img:'/src/assets/gray.jpg' , netflix_id:0, like:'/src/assets/like.png', eye:'/src/assets/eye.png'},{img:'/src/assets/gray.jpg'}],
      likes:[],
      eyes:[],
      randomNumber: 0,
      options:{
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'c50076e3c3msh3189de4fc39be4fp121294jsn9bcaafdc0139',
          'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
      }
    }
  },
  mounted(){
    if(JSON.parse(localStorage.getItem('limit'))){
      this.limit=JSON.parse(localStorage.getItem('limit'))
    }
    if(this.limit<=80){
      this.SET_FILMS()
    }
    if(JSON.parse(localStorage.getItem('likes'))){
      this.likes=JSON.parse(localStorage.getItem('likes'))
    }
    if(JSON.parse(localStorage.getItem('eyes'))){
      this.eyes=JSON.parse(localStorage.getItem('eyes'))
    }
    if (JSON.parse(localStorage.getItem('Film'))){
      this.film[1]=JSON.parse(localStorage.getItem('Film'))
      if(this.eyes.some(obj=>obj.netflix_id==this.film[1].netflix_id)){
        this.film[1].eye="/src/assets/eye-full.png"
      } else {
        this.film[1].eye="/src/assets/eye.png"
      }
      if(this.likes.some(obj=>obj.netflix_id==this.film[1].netflix_id)){
        console.log("/src/assets/like-full.png");
        this.film[1].like="/src/assets/like-full.png"
      } else {
        this.film[1].like="/src/assets/like.png"
      }
    }
    if(JSON.parse(localStorage.getItem('LastFilm'))){
      this.film[2]=JSON.parse(localStorage.getItem('LastFilm'))
      if(this.eyes.some(obj=>obj.netflix_id==this.film[2].netflix_id)){
        this.film[2].eye="/src/assets/eye-full.png"
      } else {
        this.film[2].eye="/src/assets/eye.png"
      }
      if(this.likes.some(obj=>obj.netflix_id==this.film[1].netflix_id)){
        console.log("/src/assets/like-full.png");
        this.film[2].like="/src/assets/like-full.png"
      } else {
        this.film[2].like="/src/assets/like.png"
      }
    }
    if(this.film[1].img=='/src/assets/gray.jpg'){
      if(this.films.length>0){
        this.randomNumber=Math.floor(Math.random()*this.films.length)
        this.film[1]=this.films[this.randomNumber]
        localStorage.setItem('Film', JSON.stringify(this.film[1]))
      }
    }else if(this.film[1].img!='/src/assets/gray.jpg'){}
    
  },
  methods:{
    ...mapActions(['GET_FILMS_FROM_API']),
     getMovie(){
      let arraySorted=[]
      if(this.getFilms.length>0){
        arraySorted=this.getFilms.filter(objSorted=>!this.likes.some(objLiked=>objLiked.netflix_id==objSorted.netflix_id)&&!this.eyes.some(objEyed=>objEyed.netflix_id==objSorted.netflix_id))
        store.commit('SET_FILMS_TO_STATE',arraySorted)
        this.randomNumber=Math.floor(Math.random()*this.getFilms.length)
        if(!this.film[1]){
          this.film[1]=this.getFilms[this.randomNumber]
          this.film[1].eye='/src/assets/eye.png'
          this.film[1].like="/src/assets/like.png"
          localStorage.setItem('Film', JSON.stringify(this.film[1]))
        }else{
          this.film[0]=this.getFilms[this.randomNumber];
          this.film[0].like="/src/assets/like.png"
          this.film[0].eye='/src/assets/eye.png'
          localStorage.setItem('Film', JSON.stringify(this.film[0]))
          this.film[2]=this.film[1]
          if (this.film[2]){
            localStorage.setItem('LastFilm', JSON.stringify(this.film[2]))
          }
          this.film[1]=this.film[0]
        }
      } else{
        console.log(this.films.length)
        this.SET_FILMS()
      }
    },
    SET_FILMS() {
      let param
      let obj
      if(JSON.parse(localStorage.getItem('Param'))){
        console.log(param);
        param=JSON.parse(localStorage.getItem('Param'))
        obj='end_rating='+param.rating[1]+'&start_year='+param.date[0]+'&order_by='+param.order_by+'&end_year='+param.date[1]+'&start_rating='+param.rating[0]
        if(param.country.length!=0){
          obj+='&country_list='+param.country.join(',')
        }
        if(param.type){
          obj+='&type='+param.type
        }
        if(param.genre&&param.genre!=0){
          obj+='&genre_list='+param.genre
        }
      }
      this.limit++
      console.log(this.limit)
      console.log(obj);
      localStorage.setItem('limit', this.limit)
      this.GET_FILMS_FROM_API(obj)
    },
    getLastMovie(){
      if(this.film[2].img!='/src/assets/gray.jpg'){
        this.film[0]=this.film[1]
        this.film[1]=this.film[2]
        this.film[2]=this.film[0]
        this.film[0]={}
        localStorage.setItem('LastFilm', JSON.stringify(this.film[2]))
        localStorage.setItem('Film', JSON.stringify(this.film[1]))
      }
    },
    addToArray(array,property){
      if(!array.some(film=>film.netflix_id == this.film[1].netflix_id)){
        array.push({"img":this.film[1].img, "title":this.title, "netflix_id":this.film[1].netflix_id})
        this.film[1][property]="/src/assets/"+property+"-full.png"
      } else if(array.findIndex(film => film.netflix_id == this.film[1].netflix_id)!=-1){
        array.splice(array.findIndex(film => film.netflix_id == this.film[1].netflix_id),1)
        this.film[1][property]="/src/assets/"+property+".png"
      }
      localStorage.setItem(property+'s', JSON.stringify(array))
    },
    deleteSymbols(obj,oldSymbol,updateSymbol){
      if(obj){
        while(obj.search(oldSymbol)!=-1){
          console.log(obj);
          obj = obj.replace(oldSymbol,updateSymbol)
        }
      }
      return obj
    }
  },
  computed:{
    ...mapGetters(['getFilms']),
    synopsis(){
      return this.deleteSymbols(this.film[1].synopsis,'&#39;',"'")
    },
    title(){
      return this.deleteSymbols(this.film[1].title,'&#39;',"'")
    }
  }
})
</script>


<template>


  <main class="flex-col">
    <div class="container top mr-auto ml-auto">
      <section>
        <img :src="film[2].img" alt="" class="section blocks" v-show="film[2].img!='/src/assets/gray.jpg'">
      </section>
      <section>
        <img :src="film[1].img" alt="" style="min-width: 300px; width: 300px; height: 450px;" class="blocks">
      </section>
      <section>
        <div class="section blocks bg-gray-400 overflow-hidden">
          <div class="bg-yellow-300 text-lg font-medium p-5">{{ title }}</div>
          <div class="bg-gray-300 mt-5 h-full p-2 text-justify">{{ synopsis }}</div>
        </div>
        
      </section>
    </div>
    <div class="container bottom mr-auto ml-auto">
      <section> 
        <button class="p-1 w-40 blocks button" @click="getLastMovie" v-show="film[2].img!='/src/assets/gray.jpg'">Попереднє</button>
        </section>
      <div class="flex">
        <div>
          <button class="small-button blocks button" @click="addToArray(likes,'like')"><img :src="film[1].like" alt="" class="w-9 h-9" v-show="film[1].img!='/src/assets/gray.jpg'"></button>
        </div>
        <div>
          <button class="small-button blocks button" @click="addToArray(eyes,'eye')"><img :src="film[1].eye"  alt="" class="w-9 h-9" v-show="film[1].img!='/src/assets/gray.jpg'"></button>
        </div>
      </div>
      <section>
        <router-link :to="{name: 'details', params:{netflix_id: film[1].netflix_id} }"><button class="p-1 w-40 blocks button" v-show="film[1].img!='/src/assets/gray.jpg'">Детальніше</button></router-link>
      </section>
    </div>
    <div class="container mr-auto ml-auto">
      <button class="main-button" @click="getMovie" :disabled="!getFilms">ГЕНЕРУВАТИ</button>
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
  @apply bg-yellow-300 p-3 font-medium rounded-full text-xl mt-5 hover:bg-yellow-200 hover:transition-all disabled:bg-yellow-100 disabled:text-gray-300;
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
