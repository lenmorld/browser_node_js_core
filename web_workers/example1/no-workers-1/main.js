console.log("web workers demo")

let w

function startWorker() {
    if (typeof(w) === "undefined") {
        // w = new Worker("./worker.js")
        // to use ES module or CommonJS in a worker
        
        w = new Worker(
            // new URL('./count-worker.js', import.meta.url), // PART 1 - Counter
            new URL('./fetch-worker.js', import.meta.url), // PART 2 - Fetch
            { type: 'module' }
        )

        w.onmessage = (event) => {
            console.log("result from worker: ", event.data)
        }
    }
}

function stopWorker() {
    if (typeof w !== 'undefined') {
        w.terminate()
        w = undefined
    }
}

function main() {
    // --- test responsiveness of UI ---
    document.getElementById("increment").addEventListener("click", () => {
        const output = document.getElementById("output1")
        const currentVal = Number(output.innerHTML)
        output.innerHTML = currentVal + 1
    })

    document.getElementById("input").addEventListener("change", () => {
        const output = document.getElementById("output2")
        output.innerHTML = document.getElementById("input").value
    })
    // --- end test ---



    // NO WORKERS - do this in same thread
    // count

    // fetch
    const fetchLargeData = () => {
        console.log("=== fetching and parsing large file ===")

        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(raw => raw.json())
            .then(data => 
                // postMessage(data)
                console.log(data)
            )
    }

    document.getElementById("fetch").addEventListener("click", () => {
        fetchLargeData()
    })



    // document.getElementById("start").addEventListener("click", (e) => {
    //     startWorker()
    // })
    
    // document.getElementById("stop").addEventListener("click", (e) => {
    //     stopWorker()
    // })
}

main()


