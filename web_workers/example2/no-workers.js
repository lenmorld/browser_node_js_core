const calcButton = document.querySelector('#calc')
// const delayButton = document.querySelector('#delay')
const changeBgButton = document.querySelector('#change-bg')

calcButton.addEventListener("click", () => {
    // simulate computationally expensive operation
    // takes 10-15 seconds to complete
    // it BLOCKS the main thread
    // i.e. you cannot click on other buttons; UI is blocked
    let sum = 0
    for(let i=0; i < 10000000000; i++) {
        sum+=i
    }
    alert("calculation result: " + sum)
})

// UI - DOM manipulation
changeBgButton.addEventListener("click", () => {
    if (document.body.style.backgroundColor !== "green") {
        document.body.style.backgroundColor = "green"
    } else {
        document.body.style.backgroundColor = "blue"
    }
})

// delayButton.addEventListener("click", () => {
//     // callback/event based operation
//     // this DOESN'T BLOCK the main thread
//     // i.e. you can click on other buttons; UI is responsive
//     setTimeout(() => {
//         alert("delayed operation result: " )
//     }, 10000)
// })