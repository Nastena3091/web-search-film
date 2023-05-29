import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      devOptions: {
        // вмикати якщо є необхідність потестувати саме PWA-функції локально
        // коли увімкнено – додаток кешує index.html та інші файли, тому треба не забувати робити "Clear site data" в браузері за потреби
        // після вимкнення – в браузері все ще залишиться зареєстрований SW, якому краще зробити "Unregister"
        // enabled: true
      },
      manifest: {
        name:'Генератор кіно та серіалів',
        short_name:'КіноГенератор',
        description:"Сайт генерації кіно або серіалів для перегляду на вечір",
        theme_color:'#FFFFFF',
        icons:[
          {
            src:'android-chrome-192x192.png',
            sizes:'192x192',
            type:'image/png'
          },
          {
            src:'android-chrome-512x512.png',
            sizes:'512x512',
            type:'image/png'
          }
        ]
      },
      workbox: {
        globDirectory:"D:/web-search-film/my-project/",
        globPatterns:[
            '**/*/{js,css,woff2,png,svg,ico,jpg,jpeg,webp}'
        ],
        navigateFallback:null,
        globIgnores: [
          "node_modules",
          "dist",
        ]
      },
    }),
  ],
})
