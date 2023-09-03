// register -> install -> activate

/* CACHING
cache all pages
assets, HTML

2 ways:

1. cache indiv. pages
2. cache entire response

This is the first way
-> cache indiv. pages
*/

// good to version, to keep track
const cacheName = 'v1'

// (1) cache indiv. pages, we have only a few to cache
const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
]

// attach event listener to worker
self.addEventListener('install', (e) => {
    console.log("SW: installed")

    // wait until saving is finished
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('SW: caching files')
                cache.addAll(cacheAssets)
            })
            .then(() => {
                // finish waiting
                self.skipWaiting()
            })
    )
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
self.addEventListener('fetch', (e) => {
    console.log('SW: fetching')
    // check if live site is available,
    // if not, load the cached
    e.respondWith(
        // original request: e.request
        // if no connection, ths will fail, so catch
        fetch(
            e.request
        )
            .catch(() =>
                // match requested resource, get from cache
                caches.match(e.request)
            )
    )
})
