<template>
    <main class="flex-col">
    <div class="container mr-auto ml-auto">
      <section class="flex w-2/5">
        <img :src="film.img" alt="" style="min-width: 300px; width: 300px; height: 450px;" class="rounded-3xl">
        <div class="container mr-auto ml-auto h-16">
          <div class="flex">
            <div>
              <button class="small-button blocks button"><img src="/src/assets/like.png" alt="" class="w-9 h-9"></button>
            </div>
            <div>
              <button class="small-button blocks button"><img src="/src/assets/eye.png" alt="" class="w-9 h-9"></button>
            </div>
          </div>
        </div>
      </section>
      <section class="w-3/5 pr-10 pl-10">
        <div class="bg-gray-400 overflow-hidden  blocks">
          <div class="bg-yellow-300 text-lg font-medium p-5">{{ film.title }}</div>
          <div class="bg-gray-300 mt-5 h-max text-justify p-2">{{ film.synopsis }}</div>
          <div class="bg-gray-300 mt-5 h-max text-justify overflow-hidden">
            <table>
              <tr><td class="w-max">Жанр</td>       <td class="w-full"></td></tr>
              <tr><td class="w-max">Режисери</td>   <td class="w-full"></td></tr>
              <tr><td class="w-max">Сценаристи</td> <td class="w-full"></td></tr>
              <tr><td class="w-max">Актори</td>     <td class="w-full"></td></tr>
              <tr><td class="w-max">Рейтинг</td>    <td class="w-full">{{ film.rating }}</td></tr>
            </table>
            </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      limit:0,
      film:{},
      info: {},
      options:{
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'c50076e3c3msh3189de4fc39be4fp121294jsn9bcaafdc0139',
          'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
      },
    };
  },
  mounted() {
    this.film=JSON.parse(localStorage.getItem('Film'))
    if(JSON.parse(localStorage.getItem('info'))){
      this.info=JSON.parse(localStorage.getItem('info'))
    }
    if(JSON.parse(localStorage.getItem('limit'))){
      this.limit=JSON.parse(localStorage.getItem('limit'))
    }
    if(!this.info.detail){
      if(this.limit!=80){
        this.SET_INFO()
    }} else{
        if(this.film.netflix_id!=this.info.detail.netflix_id){
              if(this.limit!=80){
              this.SET_INFO()
              console.log(this.film.netflix_id +" - film")
            }}
    }
    
    
    
    
    
  },
  methods: {
    SET_INFO(){
      this.limit++
      fetch(`https://unogs-unogs-v1.p.rapidapi.com/title/genres?netflix_id=${this.film.netflix_id}`, this.options)
        .then(response => response.json())
        .then(response => {
          this.info.genre = response.results
          console.log(response.results)
        })
        .catch(err => console.error(err));
      setTimeout(()=>{fetch(`https://unogs-unogs-v1.p.rapidapi.com/title/details?netflix_id=${this.film.netflix_id}`, this.options)
        .then(response => response.json())
        .then(response => {
          this.info.detail = response
          console.log(response)
        })
        .catch(err => console.error(err))},1000)
        this.limit++
        this.limit++
      setTimeout(()=>{fetch(`https://unogs-unogs-v1.p.rapidapi.com/search/people?netflix_id=${this.film.netflix_id}`, this.options)
        .then(response => response.json())
        .then(response => {
          this.info.people = response.results
          console.log(response.results)
        })
        .catch(err => console.error(err))},2000)
      setTimeout(()=>{
        console.log(this.info)
        localStorage.setItem('info', JSON.stringify(this.info))
        console.log(this.info.detail.netflix_id +" - info")
      },4000)
      console.log(this.limit)
      localStorage.setItem('limit', this.limit)
    }
  },
};
</script>

<style scoped>
div{
  @apply w-full relative;
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
  @apply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl;
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
  @apply max-w-max p-2 absolute;
}
td{
  border: 1px solid rgb(156, 163, 175);
  @apply p-2 border-collapse;
}
</style>
