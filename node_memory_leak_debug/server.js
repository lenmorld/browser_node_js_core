const express = require('express');
const { serialize } = require('v8')
const server = express();

const port = 4000;

const tasks = []

function printMemoryUsage() {
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
}

server.use((req, res, next) => {
    // leak! this is not garbage-collected
    tasks.push(req.headers)
    next()
})

server.get("/json", (req, res) => {
    console.log("tasks: ", tasks.length)

    printMemoryUsage()

    res.json({ message: "Hello world" });
});

server.get("/", (req, res) => {
    console.log("tasks: ", tasks.length)

    printMemoryUsage()

    res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});