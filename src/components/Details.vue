<template>
    <main class="flex-col">
    <div class="container mr-auto ml-auto">
      <section class="flex w-2/5">
        <img src="/src/assets/poster.png" alt="" style="min-width: 300px; width: 300px; height: 450px;" class="rounded-3xl">
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
          <div class="bg-yellow-300 text-lg font-medium p-5">НАЗВА</div>
          <div class="bg-gray-300 mt-5 h-max text-justify p-2">Опис</div>
          <div class="bg-gray-300 mt-5 h-max text-justify overflow-hidden">
            <table>
              <tr><td class="w-max">Жанр</td>       <td class="w-full"></td></tr>
              <tr><td class="w-max">Режисери</td>   <td class="w-full"></td></tr>
              <tr><td class="w-max">Сценаристи</td> <td class="w-full"></td></tr>
              <tr><td class="w-max">Акторы</td>     <td class="w-full"></td></tr>
              <tr><td class="w-max">Рейтинг</td>    <td class="w-full"></td></tr>
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
    return {};
  },
  mounted() {},
  methods: {},
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
