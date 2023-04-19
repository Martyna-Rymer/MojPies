self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })


  var GHPATH = '/MojPies';
  var APP_PREFIX = 'mojpies_';
  var VERSION = 'version_00';
  var URLS = [    
    `${GHPATH}/`,
    `${GHPATH}/index.html`,
    `${GHPATH}/src/assets/main.css`,
    `${GHPATH}/src/main.js`
  ]