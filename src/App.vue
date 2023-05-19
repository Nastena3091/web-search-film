<script>
import Main from "./components/Main.vue"
import Details from "./components/Details.vue"
import Like from "./components/Like.vue"
import Settings from "./components/Settings.vue"

export default({
  components:{
      Main,
      Details,
      Like,
      Settings
  },
  data(){
    return{
      burger: "burger",
      menu:"menu"
    }
  },
  mounted(){},
  methods: {
    toggleOpen(){
      if (this.burger=='burger'){
        this.burger = 'burger open'
        this.menu = 'menu open'
      } else{
        this.burger = 'burger'
        this.menu = 'menu'
      }
    }
}
})
</script>

<template>
  <div class="main">
      <nav>
        <ul class=" divider">
          <li class="main_button" @click="$router.push({name: 'main'});
          this.burger = 'burger'
          this.menu = 'menu'"><img src="/assets/home.png"><span>ГОЛОВНА</span></li>
          <li class="burger_li" @click="toggleOpen"><div :class="burger"><span></span></div></li>
        </ul>
        <ul :class="menu">
          <li class="divider" @click="$router.push({name: 'settings'});
          this.burger = 'burger'
          this.menu = 'menu'"><img src="/assets/setting.png"><span>НАЛАШТУВАННЯ</span></li>
          <li class="divider" @click="$router.push({name: 'data', params:{data_base: 'like'} });
          this.burger = 'burger'
          this.menu = 'menu'"><img src="/assets/like.png"><span>УЛЮБЛЕНІ</span></li>
          <li class="divider" @click="$router.push({name: 'data', params:{data_base: 'eye'} });
          this.burger = 'burger'
          this.menu = 'menu'"><img src="/assets/eye.png"><span>ПЕРЕГЛЯНУТІ</span></li>
          <li @click="$router.push({name: 'data', params:{data_base: 'history'} });
          this.burger = 'burger'
          this.menu = 'menu'"><img src="/assets/history.png"><span>ІСТОРІЯ</span></li>
        </ul>
      </nav>
    
    <main class="w-4/5 mb-4 mr-auto ml-auto rounded-3xl bg-gray-400/60 mt-4 pt-2 pb-2">
      
      <router-view></router-view>

    </main>
  </div>
</template>

<style scoped>
nav li {
    @apply flex items-center min-w-max contrast-50 transition-all h-12;
}

ul{
  @apply list-none flex justify-center items-center;
  width: 100%;
}
nav{
  @apply max-w-max bg-yellow-300 rounded-b-3xl flex justify-center items-center overflow-hidden sticky mx-auto top-0 z-10;

}

nav li:hover{
  @apply contrast-100 bg-yellow-200
}
nav img {
    @apply w-10 mr-1;
}

.divider {
    border-right: 1px solid black;
}
.burger{
  display:none
}
.burger_li{
  @apply  flex justify-center items-center w-1/4
}
.menu li{
  @apply pl-4 pr-4
}
.main_button{
  @apply pl-4 pr-4
}
@media(max-width:800px){
  .burger {
    display:block;
    position: relative;
    width:35px;
    height:30px;
  }
  .burger.open::before {
    transform: rotate(45deg);
    top:13px
  }
  .burger.open::after {
    transform: rotate(-45deg);
    bottom: 12px;
  }
  .burger.open span{
    transform:scale(0);
  }
  .burger span{
    position:absolute;
    left: 0;
    height: 5px;
    width: 70%;
    background-color: black;
    border-radius: 5px;
    top:13px;
    transition: all 0.5s ease ;
  }
  .burger::before,
  .burger::after{
    content:'';
    background-color: black;
    position:absolute;
    width: 100%;
    height:5px;
    left: 0;
    border-radius: 5px;
    transition: all 0.5s ease ;
  }
  .burger::before{
    top:0;
  }
  .burger::after{
    bottom: 0;
  }
  nav{
    @apply w-3/4 flex-col max-w-none;
    
  }
  .menu{
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(-100%);
  transition: opacity 1s, transform 0.5s;
}

.menu.open {
  opacity: 1;
  transform: translateY(0);
}
  .menu.open li, .main_button{
    display: flex;
    width: 100%;
    height:60px;
  }
  .burger_li{
    height:60px;
    @apply border-l border-black;
  }
  .menu li{
    display: none;
    @apply w-full
  }
  .divider{
    border-right: 0;
  }
  .menu.open li{
    border-top: 1px solid black;
  }


}
</style>
