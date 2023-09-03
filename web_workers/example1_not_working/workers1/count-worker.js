let i = 0

const timedCount = () => {
    console.log("=== worker doing CPU-intensive stuff ===")

    i++
    // send message back to main thread
    postMessage(i)
    // console.log(i)
    setTimeout(timedCount, 3000)

    // this one works too?
    // setTimeout("timedCount()", 500)
}

timedCount()