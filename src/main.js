import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
createApp(App).use(store).mount('#app')

window.addEventListener('contextmenu', function (e) { // Не совместимо с IE младше 9 версии
    e.preventDefault();
}, false);
