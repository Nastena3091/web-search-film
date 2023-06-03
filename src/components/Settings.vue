<script>
import country from "../data/country"
import genreMovie from "../data/genreMovie";
import genreSeries from "../data/genreSeries";
import VueSimpleRangeSlider from "vue-simple-range-slider";
import "vue-simple-range-slider/css";
import { mapMutations } from "vuex";
export default {
  components:{VueSimpleRangeSlider},
  data() {
    return {
      type:'',
      genre:'',
      order_by:'rating',
      country:[],
      rating:[3,10],
      date:[1910,2023],
      arrowType1:'',
      arrowType2:'arrow down',
      arrowType3:'',
      param:[]
    }
  },
  mounted(){
    if(JSON.parse(localStorage.getItem('Param'))){
      this.param=JSON.parse(localStorage.getItem('Param'))
      this.type = this.param.type
      this.genre = this.param.genre
      this.order_by = this.param.order_by
      this.country = this.param.country
      this.rating = this.param.rating
      this.date = this.param.date
      this.arrowType1 = this.param.arrowType1
      this.arrowType2 = this.param.arrowType2
      this.arrowType3 = this.param.arrowType3
    }
  },
  methods:{
    ...mapMutations(['SET_FILMS_TO_STATE']),
    GetSort(array, property) {
      return array.sort(function(a, b) {
        let x = a[property];
        let y = b[property];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    },
    changeArrow(arrow, numb){
      let order
      let type
      if(!arrow || arrow=="arrow up"){
        arrow="arrow down"
      } else if(arrow=="arrow down"){
        arrow="arrow up"
      }
      type=arrow
      switch(numb){
        case 1: {
          order = "date"
          this.arrowType1=arrow
          this.arrowType2=''
          this.arrowType3=''
          break
        }
        case 2: {
          order = "rating"
          this.arrowType2=arrow
          this.arrowType1=''
          this.arrowType3=''
          break
        }
        case 3: {
          order = "title"
          this.arrowType3=arrow
          this.arrowType2=''
          this.arrowType1=''
          break
        }
      }
      if(type=="arrow up"){
        order=order+"_asc"
      }
      console.log(type);
      console.log(order);
      this.order_by=order
    },
    SaveReset(option){
      let param
      if(option=="save"){
        param={
          type: this.type,
          genre: this.genre,
          order_by:this.order_by,
          country: this.country,
          rating: this.rating,
          date: this.date,
          arrowType1: this.arrowType1,
          arrowType2: this.arrowType2,
          arrowType3: this.arrowType3,
        }
      } else if(option=="reset"){
        param={
          type:'',
          genre:'',
          order_by:'rating',
          country:[],
          rating:[3,10],
          date:[1910,2023],
          arrowType1:'',
          arrowType2:'arrow down',
          arrowType3:'',
        }
      }
      localStorage.setItem('Param', JSON.stringify(param))
      this.SET_FILMS_TO_STATE('')
    },
    changeType(){
      this.genre=0
    }
    
  },
  computed:{
    isDisables(){
      return this.type=='' && this.genre=='' && this.order_by=='rating' && JSON.stringify(this.country)==JSON.stringify([]) && JSON.stringify(this.rating)==JSON.stringify([3,10]) && JSON.stringify(this.date)==JSON.stringify([1910,2023]) && this.arrowType1=='' && this.arrowType2=='arrow down' && this.arrowType3==''
    },
    isDisablesSave(){
      return this.param.type==this.type && this.param.genre==this.genre && this.param.order_by==this.order_by && JSON.stringify(this.param.country)==JSON.stringify(this.country) && JSON.stringify(this.param.rating)==JSON.stringify(this.rating) && JSON.stringify(this.param.date)==JSON.stringify(this.date) && this.param.arrowType1==this.arrowType1 && this.param.arrowType2==this.arrowType2 && this.param.arrowType3==this.arrowType3
    },
    genres(){
      if(this.type=="movie"){
        return [...[{title:"Нічого", id:0},...this.GetSort(genreMovie, "title")]]
      } else if(this.type=="series"){
        return [...[{title:"Нічого", id:0},...this.GetSort(genreSeries, "title")]]
      }else {
        return [...[{title:"Нічого", id:0},...this.GetSort([...genreMovie,...genreSeries],"title")]]
      }
    },
    countries(){
      return this.GetSort(country,"country")
    },
  }
}
</script>

<template>
  <main class=" justify-between">
    <section>
      <div class="container">
        <div class="hat">Сортування за</div>
        <div>
          <table>
            <tr><td><div class="circle" @click="changeArrow(arrowType1, 1)"><div :class="arrowType1"></div></div>Дата</td></tr>
            <tr><td><div class="circle" @click="changeArrow(arrowType2, 2)"><div :class="arrowType2"></div></div>Рейтинг</td></tr>
            <tr><td><div class="circle" @click="changeArrow(arrowType3, 3)"><div :class="arrowType3"></div></div>Назва</td></tr>
          </table>
        </div>
      </div>
      <div class="container">
        <div class="hat">Тип твору</div>
        <div>
          <table>
            <tr><td><input type="radio" v-model="type" value="movie" @click="changeType"> Фільм</td></tr>
            <tr><td><input type="radio" v-model="type" value="series" @click="changeType"> Серіал</td></tr>
            <tr><td><input type="radio" v-model="type" value=""> Неважливо</td></tr>
          </table>
        </div>
      </div>
      <div class=" flex justify-between">
        <a href="#/main" :aria-disabled="isDisables">
        <button class="main-button" @click="SaveReset('save')" :disabled="isDisablesSave">ЗБЕРЕГТИ</button></a>
        <a href="#/main" :aria-disabled="isDisables">
        <button class="main-button" @click="SaveReset('reset')" :disabled="isDisables">ОЧИСТИТИ</button>
        </a>
      </div>
      
    </section>
    <section>
      <div class="container">
        <div class="hat">Країна виробник</div>
        <div class="max-h-52 overflow-auto">
          <table >
            <tr v-for="c in countries" :key="c.country_id"><td><input type="checkbox" :id="c.country_id" :value="c.country_id" v-model="country">{{ c.country }}</td></tr>
          </table>
        </div>
      </div>
      <div class="container">
        <div class="hat">Рейтинг</div>
        <div>
          <VueSimpleRangeSlider class="m-3"
            :min="1"
            :max="10"
            v-model="rating"
            active-bar-color="#FEE12B"
          >
            <template #suffix="{ value }" >&starf;</template>
          </VueSimpleRangeSlider>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="hat">Жанр</div>
        <div class="max-h-52 overflow-auto">
          <table >
            <tr v-for="g in genres" :key="g.id"><td><input type="radio" :id="g.id" :value="g.id" v-model="genre">{{ g.title}}</td></tr>
          </table>
        </div>
      </div>
      <div class="container">
        <div class="hat">Дата</div>
        <div>
          <VueSimpleRangeSlider class="m-3"
            :min="1901"
            :max="2023"
            v-model="date"
            active-bar-color="#FEE12B">
            <template #suffix="{ value }">&#128197;</template>
          </VueSimpleRangeSlider>
        </div>
      </div>
    </section>

  </main>

</template>

<style scoped>
main{
  display: flex;
}
.container{
  @apply bg-gray-400 overflow-hidden rounded-3xl mb-4;
}
section{
  @apply w-full  mt-4 flex-col flex pr-8 pl-8;
}
.main-button {
  @apply bg-yellow-300 p-3 mb-4 ml-1 mr-1 font-medium rounded-full hover:bg-yellow-200 hover:transition-all disabled:bg-yellow-100 disabled:text-gray-300;
}
.hat{
  @apply bg-gray-300 rounded-3xl p-4 w-full text-center;
}
td{
  border-bottom: 1px solid rgb(135, 136, 140);
  @apply p-2 border-collapse flex;
}
table{
  @apply w-full;
}
.circle{
  @apply  bg-yellow-300 w-6 h-6 rounded-full relative mr-2;
}
.arrow{
  @apply inline-block p-1 absolute top-1/2 left-1/2;
  border: solid black;
  border-width: 0 3px 3px 0;
}
.up{
  transform: translate(-50%, -50%) rotate(-135deg);
}
.down{
  transform: translate(-50%, -50%) rotate(45deg);
}
@media (max-width: 992px){
  main{
    flex-direction: column;
  }
  section{
    flex-direction: column-reverse;
  }
}
</style>
