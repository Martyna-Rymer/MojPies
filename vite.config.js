import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/MojPies/',
  plugins: [vue(), VitePWA(
    {
      manifest: {
        icons: [
          {
            src: "./lapa_medium.png",
            sizes: "192x192",
            type: "image/png",},
          {
            src: "./lapa.png",
            sizes: "192x192",
            type: "image/png",},
          ],
            purpose: "any",
          },
       
        workbox: {
          runtimeCaching: [
            {
              
                urlPattern: ({ url }) => url.origin.includes('firebaseio.com'),
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'firebase-cache',
                  fetchOptions: {
                    mode: 'no-cors',
                  },
                },
              },
              {
                urlPattern: ({ url }) => url.pathname.includes('api'),
                handler: 'CacheFirst',
                options: {
                  cacheName: 'api-cache',
                  cacheableResponse: {
                    statuses: [0, 200],
                  },
                },




              // urlPattern: ({ url }) => {
              //   return url.pathname.includes("firebaseio");
              // },
              // handler: "CacheFirst",
              // options: {
              //   cacheName: "api-cache",
              //   cacheableResponse: {
              //     statuses: [0, 200],
              //   },
              // },
            },
          ],
        },
      },
        )
        ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

// module.exports = {
//   configureWebpack: {
//     output: {
//       globalObject: 'this'
//     }
//   }
// };

