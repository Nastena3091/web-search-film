import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({ 
    registerType: 'autoUpdate',
    outDir: "build",
    manifest:{
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
      globDirectory:'build/',
      globPattern:[
          '**/*/{css,woff2,png,svg,ico,jpg,jpeg,js,json,cjs,vue,html}'
      ],
      swDest:'build/sw.js'
    }),
    
  ],
})
