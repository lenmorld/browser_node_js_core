// ws
//  const socket = new WebSocket("ws://localhost:3000")

// socket.io - import not needed if using CDN of library
// import { io } from "socket.io-client"
const socket = io("ws://localhost:3000")

 function sendMessage(e) {
    e.preventDefault()

    const input = document.querySelector('input')

    if(input.value) {
        // ws
        // socket.send(input.value)
        // socket.io
        socket.emit("message", input.value)
        input.value = ""
    }

    input.focus()

 }

 document.querySelector('form')
    .addEventListener('submit', sendMessage)

// listen for messages

// ws
// socket.addEventListener("message", ({ data }) => {

// socket.io
socket.on("message", (data) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})