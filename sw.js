 // after a service worker is installed and the user navigates to a different page or 
        // refreshes,the service worker will begin to receive fetch events
                          
        self.addEventListener('fetch', function(event) {
        event.respondWith(caches.open('cache').then(function(cache) {
        return cache.match(event.request).then(function(response) {
        console.log("cache request: " + event.request.url);
        var fetchPromise = fetch(event.request).then(function(networkResponse) {  

        // if we got a response from the cache, update the cache                   
        console.log("fetch completed: " + event.request.url, networkResponse);
        if (networkResponse) {
            console.debug("updated cached page: " + event.request.url, networkResponse);
              cache.put(event.request, networkResponse.clone());}
              return networkResponse;
                  }, function (event) {   

        // rejected promise - just ignore it, we're offline!   
                  console.log("Error in fetch()", event);
                  event.waitUntil(
                  caches.open('cache').then(function(cache) { 

        // our cache is named *cache* in the caches.open() above
                  return cache.addAll
                  ([  

        //cache.addAll(), takes a list of URLs, then fetches them from the server
        // and adds the response to the cache.           
        // add your entire site to the cache- as in the code below; for offline access
                      
                '/', // do not remove this
                '/index.html', //default
                '/index.html?homescreen=1', //default
                '/?homescreen=1', //default
                '/assets/css/bootstrap.min.css',
                '/assets/css/gijgo.min.css',
                '/assets/css/octicon.css',
                '/assets/css/styles.css',
                '/assets/images/favicon.ico',
                '/assets/images/svg/*',// choose images to keep offline; 
                '/assets/fonts/gijgo-material.ttf',
                '/assets/fonts/gijgo-material.woff',
                '/assets/js/bootstrap.min.js',
                '/assets/js/gijgo.min.js',
                '/assets/js/jquery-3.3.1.slim.min.js',
                '/assets/js/moment.min.js',
                '/assets/js/popper.min.js',
                '/assets/js/main.js',
             
                ]);
                })
                );
                });

        // respond from the cache, or the network
          return response || fetchPromise;
        });
        }));
        });
        
        self.addEventListener('install', function(event) {
          // The promise that skipWaiting() returns can be safely ignored.
          self.skipWaiting();
          console.log("Latest version installed!");
        });