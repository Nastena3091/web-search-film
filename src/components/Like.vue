<template>
  <main v-if="array.length!=0">
    <div class="flex flex-wrap">
        <div class="section" v-for="a in array" :key="a.netflix_id">
            <img :src="a.img" alt="" class="w-full" @click="$router.push({name: 'details', params:{netflix_id: a.netflix_id} })">
            <div class="flex h-10">
                <div class="text-container w-full diva  overflow-hidden whitespace-pre" @click="$router.push({name: 'details', params:{netflix_id: a.netflix_id} })">
                    <p class="text truncate" :title="a.title">{{ a.title }}</p>
                </div>
                <div class="w-16 relative bord diva" @click="removeInArray(a)">
                    <img :src="'/src/assets/'+type+'-full.png'" alt="" class="w-10 h-10 blocks">
                </div>
            </div> 
        </div>
    </div>
  </main>
  <main v-else>
    <p class="text-9xl text-white">ВАШ СПИСОК ПОРОЖНІЙ</p>
  </main>
</template>

<script>
export default {
    data(){
        return{
            type:'',
            array:[],
            button:'',
        }
    },
    mounted(){
    },
    watch: {
        '$route.params': {
            handler() {
                this.type = this.$route.params.data_base;
                if(JSON.parse(localStorage.getItem(this.type+'s'))){
                    this.array=JSON.parse(localStorage.getItem(this.type+'s'))
                }
            },
            immediate: true
        }
    },
    methods:{
        removeInArrayWithParams(array,nameInLocalStorage,index){
            array.splice(index, 1);
            console.log(array);
            localStorage.setItem(nameInLocalStorage, JSON.stringify(array))
        },
        removeInArray(obj){
            this.removeInArrayWithParams(this.array,this.type+'s',this.array.indexOf(obj))
        },
    },
}
</script>

<style scoped>
.section{
    width: calc(1/4*100% - (1 - 1/4)*22px);
    @apply rounded-3xl overflow-hidden m-2 bg-gray-300
}
p{
    @apply font-medium py-2 px-4
}

.text-container .text:hover {
  cursor: pointer;
}

section {
    @apply w-max flex;
}
img{
    @apply contrast-100;
}
.bord{
    border-left: 1px solid rgb(156, 163, 175);
}
.blocks{
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
}
div.diva:hover{
    @apply bg-gray-200 contrast-150 transition-all
}
</style>