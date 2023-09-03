console.log("regular task")

setTimeout(() => {
    console.log("set timeout callback 1 - macro task")
})

setTimeout(() => {
    console.log("set timeout callback 2 - macro task")
})

Promise.resolve()
    .then(() => console.log("promise then 1 - micro task"))

const a = new Promise((resolve) => resolve(1))
a.then(a => console.log("promise then 2 - micro task"))

/*
regular task
promise then 1 - micro task
promise then 2 - micro task
set timeout callback 1 - macro task
set timeout callback 2 - macro task

1. Microtasks
2. Macrotasks



*/

