// register -> install -> activate

/* CACHING
cache all pages
assets, HTML

2 ways:

1. cache indiv. pages
2. cache entire response

This is the 2nd way
-> cache entire response
*/

// good to version, to keep track
const cacheName = 'v2'


// attach event listener to worker
self.addEventListener('install', (e) => {
    console.log("SW: installed")
})

// now that we cache pages in CacheStorage
// These are used when browser goes offline, 
// on the fetch event
        
// call activate event
self.addEventListener('activate', e => {
    console.log("SW: activated")

    // clean up any old cache
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                console.log("cacheNames: ", cacheNames)

                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== cacheName) {
                            console.log("SW: Clearing old cache: ", cache)
                            return caches.delete(cache)
                        }
                    })
                )
            })
    )
})


// call fetch event
self.addEventListener('fetch', (e ) => {
    console.log('SW: fetching')
    // check if live site is available,
    e.respondWith(
        // initial request: e.request
        fetch(e.request)
            .then(res => {
                // clone response from server
                const resClone = res.clone()
                // open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // add response to cache
                        console.log('SW: cache response')
                        console.log(e.request, resClone)
                        cache.put(e.request, resClone)
                    })
                return res
        }).catch(err => {
            // match requested resource, get from cache
            // it should be in the cache, as long
            // as user went to site once when online
            caches.match(e.request)
                .then(res => res)
        })
    )
})
