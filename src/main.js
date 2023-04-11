import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app')

window.addEventListener('contextmenu', function (e) { // Не совместимо с IE младше 9 версии
    e.preventDefault();
}, false);
