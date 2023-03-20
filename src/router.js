import { createRouter, createWebHashHistory } from 'vue-router'
import Main from './components/Main.vue'
import Details from './components/Details.vue'
import Like from './components/Like.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes:[
        { path: '/main', component: Main, alias: '/'},
        { path: '/details', component: Details},
        { path: '/like', component: Like}
    ]
})