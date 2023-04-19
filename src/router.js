import { createRouter, createWebHashHistory } from 'vue-router'
import Main from './components/Main.vue'
import Details from './components/Details.vue'
import Like from './components/Like.vue'
import Settings from './components/Settings.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes:[
        { path: '/main', name:'main', component: Main, alias: '/'},
        { path: '/details/:netflix_id', name:'details', component: Details},
        { path: '/data', name:'data', component: Like},
        { path: '/settings', name:'settings', component: Settings}
    ]
})