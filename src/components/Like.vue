<template>
  <main>
    <div class="flex flex-wrap"><div class="section">
            <img src="/src/assets/poster.png" alt="" class="w-full">
            <div class="flex">
                <div class="w-full diva">
                    <p>НАЗВА</p>
                </div>
                <div class="w-16 relative bord diva">
                    <img src="../assets/like.png" alt="" class="w-10 h-10 blocks">
                </div>
            </div> 
        </div>
    </div>
  </main>
</template>

<script>
export default {
    data(){
        return{
        
        }
    },
    mounted(){},
    methods:{},
}
</script>

<style scoped>
.section{
    width: calc(1/4*100% - (1 - 1/4)*22px);
    @apply rounded-3xl overflow-hidden m-2 bg-gray-300
}
p{
    @apply p-3 text-xl font-medium contrast-100
}
p:hover{
}
section {
  @apply w-max flex ;
}
img{
    @apply contrast-100
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