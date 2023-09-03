// no split - finishes in ~1700ms
export function cpuHungryTask() {
    let i = 0
    let total = 0
    let start = Date.now()

    function count() {
        // simulate long-running job
        for (let j = 0; j < 1e9; j++) {
            i++
            total += i
        }

        // alert("Done in " + (Date.now() - start) + ' ms')
        alert("Done in " + (Date.now() - start) + ' ms; Total: ' + total)
    }

    count()
}

// split 1 - run first round, then schedule next round, and so on
export function cpuHungryTaskSplit1() {
    let i = 0
    let total = 0
    let round = 0
    let start = Date.now()

    function count() {
        // simulate long-running job
        // for (let j = 0; j < 1e9; j++) {
        //     i++
        // }

        // split job
        // run 1 -> (1e6)
        // when reach 1e6, schedule 1e6 -> 2e6
        // when react 2e6, schedule 2e6 -> 3e6
        // ... until 1e9, then stop
        // runs 1e3 times (1e9/1e6)
        do {
            i++
            total += i
        } while (i % 1e6 !== 0)

        round++
        console.log("round #: ", round)

        if (i === 1e9) {
            // alert("Done in " + (Date.now() - start) + ' ms')
            alert("Done in " + (Date.now() - start) + ' ms; Total: ' + total)
        } else {
            // schedule new call - recursive
            setTimeout(count) 
        }
    }

    count()
}

// split 2 - schedule all rounds in the beginning
export function cpuHungryTaskSplit2() {
    let i = 0
    let total = 0
    let round = 0
    let start = Date.now()

    function count() {
        // simulate long-running job
        // for (let j = 0; j < 1e9; j++) {
        //     i++
        // }

        // split job
        // run 1 -> (1e6)
        // when reach 1e6, schedule 1e6 -> 2e6
        // when react 2e6, schedule 2e6 -> 3e6
        // ... until 1e9, then stop
        // runs 1e3 times (1e9/1e6)
        // do {
        //     i++
        // } while (i % 1e6 !== 0)

        round++
        
        // move scheduling to beginning
        // 1e9 / 1e6 = 1e3 rounds
        
        if (round <= 1e3) {
            setTimeout(count)
        }

        // alternative way to schedule, use i
        // if (i < 1e9 - 1e6) {
        //     setTimeout(count); // schedule the new call
        // }

        console.log("round #: ", round)

        do {
            i++
            total += i
        } while (i % 1e6 !== 0)

        if (i === 1e9) {
            // alert("Done in " + (Date.now() - start) + ' ms')
            alert("Done in " + (Date.now() - start) + ' ms; Total: ' + total)
        } 
        // else {
        //     // schedule new call - recursive
        //     setTimeout(count) 
        // }
    }

    count()
}