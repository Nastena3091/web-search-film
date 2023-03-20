<script>
import Main from "./components/Main.vue"
import Details from "./components/Details.vue"
import Like from "./components/Like.vue"

export default({
  components:{
      Main,
      Details,
      Like
  },
  data(){
    return{
      
    }
  },
  mounted(){},
  methods: {
    
}
})
</script>

<template>
  <div>
    <nav class="max-w-max bg-yellow-300 rounded-b-3xl ml-auto mr-auto flex justify-center items-center overflow-hidden">
      <ul class="list-none flex justify-center items-center">
          <li class="divider"><a href="/main"><img src="/src/assets/home.png"></a><a href="#/main">ГОЛОВНА</a></li>
          <li class="divider"><a href="#"><img src="/src/assets/like.png"></a><a href="#">УЛЮБЛЕНІ</a></li>
          <li><a href="#"><img src="/src/assets/eye.png"></a><a href="#">ПЕРЕГЛЯНУТІ</a></li>
      </ul>
    </nav>
    <main class="w-4/5 mt-5 mb-4 mr-auto ml-auto rounded-3xl bg-gray-400/60 pt-2 pb-2">
      
      <router-view></router-view>

    </main>
  </div>
</template>

<style scoped>
nav li {
    @apply p-2 pl-5 pr-5 flex items-center min-w-max contrast-50 transition-all;
}

nav a {
    @apply flex flex-col items-center text-base;
}
nav li:hover{
  @apply contrast-100 bg-yellow-200
}
nav img {
    @apply w-10 mr-1;
}

nav li.divider {
    border-right: 1px solid black;
}
</style>
