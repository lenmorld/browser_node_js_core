// check if SW are supported

// navigator is the browser
if ('serviceWorker' in navigator) {
    console.log('Service Worker supported')

    // register when window loads
    window.addEventListener('load', () => {
        navigator.serviceWorker
            // .register('../sw_cached_pages.js')
            // for Parcel
            .register(
                new URL('../sw_cached_site.js', import.meta.url),
                // new URL('../sw_cached_pages.js', import.meta.url),
                {
                    // scope: './',
                }
            )
            .then(reg => {
                console.log("SW: registered")
            })
            .catch(err => console.log(`SW error: ${err}`))
    })
}