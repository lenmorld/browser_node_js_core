# Notion page

https://lennythedev.notion.site/Web-workers-a4bf8fbfa4eb45db878917e5a8a277b5?pvs=4

# Web worker

- a background thread (outside of main UI thread)
- A JS script running in the background
- runs independent of other scripts, doesn't affect UI thread

performance of page 
- doesn't affect UI performance of page
  UI can still interact with page
- runs outside of main thread
- ideally, main thread should be focused on UI
- communication to and from is simple with `postMessage`

web workers
- cannot perform any DOM manipulation

Use cases:
- offload any long-running computation
- large data to fetch/parse from server
- complex calculations
- dashboard pages that display real-time data
- auto-save


## Dedicated web worker (Worker)

Can only be accessed by the script that created it

## SharedWorker

Can be accessed by multiple scripts, different windows,
iframes or even workers 


### Notes

#### Doesn't work in Chrome if load locally
Wont' work in Chrome if loading local file from browser.
Need to serve from a web server like Node or a build tool with server like Parcel
https://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker

#### Parcel - using a ES/CJS module
```
new Worker(
  new URL('worker.js', import.meta.url),
  {type: 'module'}
);
```

https://parceljs.org/languages/javascript/#web-workers


# Running example

npx parcel index.html

# Resources

https://www.freecodecamp.org/news/how-webworkers-work-in-javascript-with-example/

https://www.youtube.com/watch?v=Gcp7triXFjg