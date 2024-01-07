const ws = require('ws')
const server = new ws.Server({ port: 3000 })

server.on('connection', socket => {
    socket.on('message', message => {

        // message is a Buffer
        const b = Buffer.from(message)
        console.log(`${socket.id}: ${b.toString()}`) 
        // socket.send(`server received: ${message}`)

        // just echo what was received
        socket.send(`${message}`)
    })
})