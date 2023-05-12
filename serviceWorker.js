self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })


  var GHPATH = '/MojPies';
  var APP_PREFIX = 'MojPies_';
  var VERSION = 'version_00';
  var URLS = [    
    `${GHPATH}/`,
    `${GHPATH}/index.html`,
    `${GHPATH}/src/assets/main.css`,
    `${GHPATH}/src/main.js`
  ]



  // self.addEventListener('install', event => {
  //   function onInstall() {
  //     return caches.open('static')
  //       .then(cache => cache.addAll([
  //         '/src/assets/',
  //         '/src/main.js',
  //         'public/'
  //       ])
  //       );
  //   }
  
  //   event.waitUntil(onInstall(event));
  // });