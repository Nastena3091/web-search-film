<script>

export default({
  data(){
    return{
      films:[],
      film:[{},{img:'/src/assets/gray.jpg'},{img:'/src/assets/gray.jpg'}],
      randomNumber: 0,
      isLoading:true,
      options:{
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '446a849920msh40579f805fb4bffp15077ajsn780f820fb8f3',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
      }
    }
  },
  mounted(){
    this.SET_FILMS()
    if (JSON.parse(localStorage.getItem('Film'))){
      this.film[1]=JSON.parse(localStorage.getItem('Film'))
    }
    if(JSON.parse(localStorage.getItem('LastFilm'))){
      this.film[2]=JSON.parse(localStorage.getItem('LastFilm'))
    }
    if(this.film[1].img=='/src/assets/gray.jpg'){
      if(this.films.length>0){
        this.randomNumber=Math.floor(Math.random()*this.films.length)
        this.film[1]=this.films[this.randomNumber]
        localStorage.setItem('Film', JSON.stringify(this.film[1]))
      }
    }else if(this.film[1].img!='/src/assets/gray.jpg'){

    }
  },
  methods:{
     getMovie(){
      if(this.films.length>0){
        console.log(this.films.length)
        this.randomNumber=Math.floor(Math.random()*this.films.length)
        if(!this.film[1]){
          this.film[1]=this.films[this.randomNumber]
          localStorage.setItem('Film', JSON.stringify(this.film[1]))
        }else{
          this.film[0]=this.films[this.randomNumber]
          localStorage.setItem('Film', JSON.stringify(this.film[0]))
          this.film[2]=this.film[1]
          if (this.films[2]){
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
      fetch('https://unogs-unogs-v1.p.rapidapi.com/search/titles?order_by=rating&type=movie', this.options)
      .then(response => response.json())
      .then(response => {
          console.log(response)
          this.films=response.results;
          this.isLoading=false
      })
      .catch(err => console.error(err));
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
    }
  },
})
</script>


<template>
  <!-- <button class="button p-5" @click="getMovie">Генерувати</button>
  <h1>{{film.title}}</h1>
  <img :src="film.img" alt=""> -->

  <main class="flex-col">
    <div class="container top mr-auto ml-auto">
      <section>
        <img :src="film[2].img" alt="" class="section blocks">
      </section>
      <section>
        <img :src="film[1].img" alt="" style="min-width: 300px; width: 300px; height: 450px;" class="blocks">
      </section>
      <section>
        <div class="section blocks bg-gray-400 overflow-hidden">
          <div class="bg-yellow-300 text-lg font-medium p-5">{{ film[1].title }}</div>
          <div class="bg-gray-300 mt-5 h-full p-2 text-justify">{{ film[1].synopsis }}</div>
        </div>
        
      </section>
    </div>
    <div class="container bottom mr-auto ml-auto">
      <section> 
        <button class="p-1 w-40 blocks button" @click="getLastMovie">Попереднє</button></section>
      <div class="flex">
        <div>
          <button class="small-button blocks button"><img src="/src/assets/like.png" alt="" class="w-9 h-9"></button>
        </div>
        <div>
          <button class="small-button blocks button"><img src="/src/assets/eye.png" alt="" class="w-9 h-9"></button>
        </div>
      </div>
      <section>
        <a href="#/details"><button class="p-1 w-40 blocks button" >Детальніше</button></a>
      </section>
    </div>
    <div class="container mr-auto ml-auto">
      <button class="main-button" @click="getMovie">ГЕНЕРУВАТИ</button>
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
