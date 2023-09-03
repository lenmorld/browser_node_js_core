// memory usage of reverse()
let arr = Array(1e6).fill("some string");
arr.reverse()

// result in bytes
const bytesUsed = process.memoryUsage().heapUsed
const bytesTotal = process.memoryUsage().heapTotal

// convert to MB
const used =  bytesUsed / 1024 / 1024
console.log("bytesUsed: ", bytesUsed)
// console.log("used: ", used)
console.log(`The script uses approx ${Math.round(used * 100) / 100} MB`)


// convert to MB
const total =  bytesTotal / 1024 / 1024
// console.log("bytesTotal: ", bytesTotal)
console.log(`Approx total ${Math.round(total * 100) / 100} MB`)
