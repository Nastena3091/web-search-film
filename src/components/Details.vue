<template>
    <main class="flex-col">
    <div class="container mr-auto ml-auto">
      <section class="flex w-2/5">
        <img :src="info.detail.large_image ? info.detail.large_image : info.detail.default_image" alt="" style="min-width: 300px; width: 300px; height: 450px;" class="rounded-3xl">
        <div class="container mr-auto ml-auto h-16">
          <div class="flex">
            <div>
              <button class="small-button blocks button" @click="addToArray(likes,'like')"><img :src="info.infoBase.like" alt="" class="w-9 h-9"></button>
            </div>
            <div>
              <button class="small-button blocks button" @click="addToArray(eyes,'eye')"><img :src="info.infoBase.eye"  alt="" class="w-9 h-9"></button>
            </div>
          </div>
        </div>
      </section>
      <section class="w-3/5 pr-10 pl-10">
        <div class="bg-gray-400 overflow-hidden  blocks">
          <div class="bg-yellow-300 text-lg font-medium p-5">{{ title }} ( {{ info.detail.year }} )</div>
          <div class="bg-gray-300 mt-5 h-max text-justify p-2">{{ synopsis }}</div>
          <div class="bg-gray-300 mt-5 h-max text-justify overflow-hidden">
            <table>

              <tr v-show="runtime!='0 : 0 : 0'"><td class="w-max">Тривалість</td> <td class="w-full">{{ runtime }}</td></tr>
              <tr v-show="genre"><td class="w-max">Жанр</td>       <td class="w-full">{{ genre }}</td></tr>
              <tr v-show="directors"><td class="w-max">Режисери</td>   <td class="w-full">{{ directors }}</td></tr>
              <tr v-show="creators"><td class="w-max">Сценаристи</td> <td class="w-full">{{ creators }}</td></tr>
              <tr v-show="actors"><td class="w-max">Актори</td>     <td class="w-full">{{ actors }}</td></tr>
              <tr v-show="info.detail.rating || film.rating"><td class="w-max">Рейтинг</td>    <td class="w-full">{{ info.detail.rating ? info.detail.rating : film.rating }}</td></tr>
            </table>
            </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>

export default {
  data() {
    return {
      limit:0,
      film:{},
      likes:[],
      eyes:[],
      info: {
        detail: {
          title:'',
          year:'',
          synopsis:'',
          runtime:'',
          rating:'',
          netflix_id:'',
          large_image:'',
          default_image:'',
          alt_runtime:'',
        },
        genreList: [
          {
            genre:'',
            genre_id:0
          }
        ],
        people: [
          {
            netflix_id:0,
            full_name:'',
            person_type:'',
            title:'',
          }
        ],
        infoBase: {
          like:'/src/assets/like.png', 
          eye:'/src/assets/eye.png'
        }
      },
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
    this.film.netflix_id=this.$route.params.netflix_id
    
    if(JSON.parse(localStorage.getItem('info'))){
      this.info=JSON.parse(localStorage.getItem('info'))
      this.info.infoBase.like="/src/assets/like.png"
      this.info.infoBase.eye="/src/assets/eye.png"
    }
    if(JSON.parse(localStorage.getItem('limit'))){
      this.limit=JSON.parse(localStorage.getItem('limit'))
    }
    if(!this.info.detail.netflix_id){
      if(this.limit<=80){
        this.SET_INFO()
      }
    } else if(this.film.netflix_id!=this.info.detail.netflix_id){
      if(this.limit<=80){
        this.SET_INFO()
        console.log(this.film.netflix_id +" - film")
      }
    }
    if(JSON.parse(localStorage.getItem('likes'))){
      this.likes=JSON.parse(localStorage.getItem('likes'))
      if(this.likes.some(obj=>obj.netflix_id==this.film.netflix_id)){
        console.log("/src/assets/like-full.png");
        this.info.infoBase.like="/src/assets/like-full.png"
      }
    }
    if(JSON.parse(localStorage.getItem('eyes'))){
      this.eyes=JSON.parse(localStorage.getItem('eyes'))
      if(this.eyes.some(obj=>obj.netflix_id==this.film.netflix_id)){
        this.info.infoBase.eye="/src/assets/eye-full.png"
      }
    }
  },
  methods: {
    SET_INFO(){
      this.info.infoBase.like="/src/assets/like.png"
      this.info.infoBase.eye="/src/assets/eye.png"
      this.limit++
      fetch(`https://unogs-unogs-v1.p.rapidapi.com/title/details?netflix_id=${this.film.netflix_id}`, this.options)
        .then(response => response.json())
        .then(response => {
          this.info.detail = response
          console.log(response)
        })
        .catch(err => console.error(err))
      
      setTimeout(()=>{fetch(`https://unogs-unogs-v1.p.rapidapi.com/title/genres?netflix_id=${this.film.netflix_id}`, this.options)
        .then(response => response.json())
        .then(response => {
          this.info.genreList = response.results
          console.log(response.results)
        })
        .catch(err => console.error(err));},1000)
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
    },
    GET_PEOPLE(people){
      let a=''
      return this.info.people.map(elem=>{
        if (elem.person_type==people && a!=elem.full_name){
          a=elem.full_name
          return elem.full_name
        }
      }).filter(elem=>elem!=undefined).join(', ')
    },
    addToArray(array,property){
      if(!array.some(film=>film.netflix_id == this.info.detail.netflix_id)){
        array.push({"img":this.info.detail.large_image ? this.info.detail.large_image : this.info.detail.default_image, "title":this.title, "netflix_id":this.info.detail.netflix_id})
        this.info.infoBase[property]="/src/assets/"+property+"-full.png"
      } else if(array.findIndex(film => film.netflix_id == this.info.detail.netflix_id)!=-1){
        array.splice(array.findIndex(film => film.netflix_id == this.info.detail.netflix_id),1)
        this.info.infoBase[property]="/src/assets/"+property+".png"
      }
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
    synopsis(){
      return this.deleteSymbols(this.info.detail.synopsis,'&#39;',"'")
    },
    title(){
      return this.deleteSymbols(this.info.detail.title,'&#39;',"'")
    },
    runtime(){
      let hour
      let minute
      let second
      let time=this.info.detail.runtime
      if(this.info.detail.runtime==''){
        time=this.info.detail.alt_runtime
      }
      hour=Math.floor(time/3600)
      minute=Math.floor(time%3600/60)
      second=time-(minute*60+hour*3600)
      console.log(hour+" : "+minute+" : "+second)
      return hour+" : "+minute+" : "+second
    },
    genre(){
      return this.info.genreList.map(elem => elem.genre).join(', ')
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
