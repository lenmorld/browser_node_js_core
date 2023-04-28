const calcButton = document.querySelector('#calc-2')
// const delayButton = document.querySelector('#delay-2')
const changeBgButton = document.querySelector('#change-bg-2')
const stopWorkerButton = document.querySelector('#stop')

// w = new Worker("./worker.js")
// to use ES module or CommonJS in a worker
let worker 

calcButton.addEventListener("click", () => {
    // send message to worker
    // worker.postMessage("hello")

    if (worker !== undefined) {
        console.log("[main] worker already running")
        return
    }

    worker = new Worker(
        new URL('./web-worker-calc.js', import.meta.url),
        { type: 'module' }
    )

    // offload expensive calculation to wb worker
    // send a "signal" to start processing
    worker.postMessage(true)

    // listen to data from worker
    worker.onmessage = (event) => {
        alert("[main] calculation result: " + event.data)
    }
})

// UI - DOM manipulation
changeBgButton.addEventListener("click", () => {
    if (document.body.style.backgroundColor !== "green") {
        document.body.style.backgroundColor = "green"
    } else {
        document.body.style.backgroundColor = "blue"
    }
})

// stop worker
stopWorkerButton.addEventListener("click", () => {
    alert("[main] worker stopped!")
    worker.terminate()
    worker = undefined
})

// delayButton.addEventListener("click", () => {
//     // callback/event based operation
//     // this DOESN'T BLOCK the main thread
//     // i.e. you can click on other buttons; UI is responsive
//     setTimeout(() => {
//         alert("delayed operation result: " )
//     }, 10000)
// })