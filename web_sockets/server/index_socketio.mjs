import { createServer } from 'http'
import { Server } from "socket.io";

const httpServer = createServer()

// const io = new Server(3000)
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("connected")
    // socket.emit("hello from server!")

    const socketId = socket.id.substring(0,5)

    socket.on("message", (data) => {
        console.log(`${socketId}: ${data}`)

        // to client only
        // socket.emit("message", `to client: ${data}`)

        // to all
        io.emit("message", `${socketId}: ${data}`)
    })
})


httpServer.listen(3000, () => console.log('listening on port 3000'))