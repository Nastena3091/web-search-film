<template>
    <main class="flex-col">
    <div class="container mr-auto ml-auto">
      <section class="flex w-2/5">
        <img v-show="getInfo.detail.large_image || getInfo.detail.default_image" :src="getInfo.detail.large_image ? getInfo.detail.large_image : getInfo.detail.default_image" alt="" style="min-width: 300px; width: 300px; height: 450px;" class="rounded-3xl">
        <div class="container mr-auto ml-auto h-16">
          <div class="flex" v-show="getInfo.infoBase.like && getInfo.infoBase.eye">
            <div>
              <button class="small-button blocks button" @click="addToArray(likes,'like')"><img :src="getInfo.infoBase.like" alt="" class="w-9 h-9"></button>
            </div>
            <div>
              <button class="small-button blocks button" @click="addToArray(eyes,'eye')"><img :src="getInfo.infoBase.eye"  alt="" class="w-9 h-9"></button>
            </div>
          </div>
        </div>
      </section>
      <section class="w-3/5 pr-10 pl-10">
        <div class="bg-gray-400 overflow-hidden  blocks">
          <div class="bg-yellow-300 text-lg font-medium p-5">{{ title }} ( {{ getInfo.detail.year }} )</div>
          <div class="bg-gray-300 mt-5 h-max text-justify p-2">{{ synopsis }}</div>
          <div class="bg-gray-300 mt-5 h-max text-justify overflow-hidden">
            <table>

              <tr v-show="runtime!='0 : 0 : 0'"><td class="w-max">Тривалість</td> <td class="w-full">{{ runtime }}</td></tr>
              <tr v-show="genre"><td class="w-max">Жанр</td>       <td class="w-full">{{ genre }}</td></tr>
              <tr v-show="directors"><td class="w-max">Режисери</td>   <td class="w-full">{{ directors }}</td></tr>
              <tr v-show="creators"><td class="w-max">Сценаристи</td> <td class="w-full">{{ creators }}</td></tr>
              <tr v-show="actors"><td class="w-max">Актори</td>     <td class="w-full">{{ actors }}</td></tr>
              <tr v-show="getInfo.detail.rating || film.rating"><td class="w-max">Рейтинг</td>    <td class="w-full">{{ getInfo.detail.rating ? getInfo.detail.rating : film.rating }}</td></tr>
            </table>
            </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import store from '../store'
export default {
  data() {
    return {
      limit:0,
      film:{},
      likes:[],
      eyes:[],
    };
  },
  mounted() {
    this.film.netflix_id=this.$route.params.netflix_id
    
    if(JSON.parse(localStorage.getItem('info'))){
      store.commit('SET_DETAILS_TO_STATE',JSON.parse(localStorage.getItem('info')))
    }
    if(JSON.parse(localStorage.getItem('limit'))){
      this.limit=JSON.parse(localStorage.getItem('limit'))
    }
    if(!this.getInfo.detail.netflix_id){
      if(this.limit<=80){
        this.SET_INFO()
      }
    } else if(this.film.netflix_id!=this.getInfo.detail.netflix_id){
      if(this.limit<=80){
        this.SET_INFO()
        console.log(this.film.netflix_id +" - film")
      }
    }
    if(JSON.parse(localStorage.getItem('likes'))){
      this.likes=JSON.parse(localStorage.getItem('likes'))
      if(this.likes.some(obj=>obj.netflix_id==this.film.netflix_id)){
        console.log("/src/assets/like-full.png");
        this.getInfo.infoBase.like="/src/assets/like-full.png"
      }
    }
    if(JSON.parse(localStorage.getItem('eyes'))){
      this.eyes=JSON.parse(localStorage.getItem('eyes'))
      if(this.eyes.some(obj=>obj.netflix_id==this.film.netflix_id)){
        this.getInfo.infoBase.eye="/src/assets/eye-full.png"
      }
    }
  },
  methods: {
    ...mapActions(['GET_DETAILS_FROM_API']),
    SET_INFO(){
      this.limit++
      this.limit++;
      this.limit++;
      console.log(this.limit);
      localStorage.setItem('limit', this.limit);
      this.GET_DETAILS_FROM_API(this.film.netflix_id);
      console.log(this.getInfo);
    },
    GET_PEOPLE(people){
      let a=''
      return this.deleteSymbols(this.getInfo.people.map(elem=>{
        if (elem.person_type==people && a!=elem.full_name){
          a=elem.full_name
          return elem.full_name
        }
      }).filter(elem=>elem!=undefined).join(', '),'&#39;',"'")
    },
    addToArray(array,property){
      let arrayWithEditInfoBase=this.getInfo
      if(!array.some(film=>film.netflix_id == this.getInfo.detail.netflix_id)){
        array.push({"img":this.getInfo.detail.large_image ? this.getInfo.detail.large_image : this.getInfo.detail.default_image, "title":this.title, "netflix_id":this.getInfo.detail.netflix_id})
        arrayWithEditInfoBase.infoBase[property]="/src/assets/"+property+"-full.png"
      } else if(array.findIndex(film => film.netflix_id == this.getInfo.detail.netflix_id)!=-1){
        array.splice(array.findIndex(film => film.netflix_id == this.getInfo.detail.netflix_id),1)
        arrayWithEditInfoBase.infoBase[property]="/src/assets/"+property+".png"
      }
      store.commit('SET_DETAILS_TO_STATE',arrayWithEditInfoBase)
      console.log(array);
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
    ...mapGetters(['getInfo']),
    synopsis(){
      return this.deleteSymbols(this.getInfo.detail.synopsis,'&#39;',"'")
    },
    title(){
      return this.deleteSymbols(this.getInfo.detail.title,'&#39;',"'")
    },
    runtime(){
      let hour
      let minute
      let second
      let time=this.getInfo.detail.runtime
      if(this.getInfo.detail.runtime==''){
        time=this.getInfo.detail.alt_runtime
      }
      hour=Math.floor(time/3600)
      minute=Math.floor(time%3600/60)
      second=time-(minute*60+hour*3600)
      console.log(hour+" : "+minute+" : "+second)
      return hour+" : "+minute+" : "+second
    },
    genre(){
      return this.getInfo.genreList.map(elem => elem.genre).join(', ')
    },
    actors(){
      return this.GET_PEOPLE("Actor")
    },
    directors(){
      return this.GET_PEOPLE("Director")
    },
    creators(){
      return this.GET_PEOPLE("Creator")
    }
  }
};
</script>

<style scoped>
div{
  @apply w-full ;
}
section {
  @apply w-full text-center flex-col justify-center items-center;
}
img {
  @apply self-center
}
.container{
  @apply flex justify-center w-full
}
.blocks{
  @apply rounded-3xl;
}
section div {
  @apply rounded-3xl;
}
.button {
  @apply bg-gray-300 rounded-3xl text-lg overflow-hidden contrast-75;
}
.button:hover{
  @apply bg-gray-200 contrast-100 transition-all 
}
.small-button{
  @apply max-w-max p-2 ;
}
td{
  border: 1px solid rgb(156, 163, 175);
  @apply p-2 border-collapse;
}
</style>
