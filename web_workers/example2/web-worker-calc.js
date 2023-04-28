const expensiveCalc = () => {
    console.log("[worker] calculating....")

    let sum = 0
    for(let i=0; i < 10000000000; i++) {
        sum+=i
    }

    // send message back to main thread
    console.log("[worker] done...sending result to main thread")
    postMessage(sum)
}



// message from main thread
self.onmessage = (event) => {
    console.log(event.data)

    // start computation
    if (event.data === true) {
        expensiveCalc()
    }
}

