# Websockets

https://www.youtube.com/watch?v=J8xReLuBNPY&list=RDCMUCY38RvRIxYODO4penyxUwTg&index=4

## server

Two libraries

`ws` 
https://github.com/websockets/ws
- simpler, smaller footprint
- can run on its own without a server
- doesn't have API to send to all clients

npm start

`socket.io` 
https://socket.io/

- bigger footprint and can be slower?
- need to attach to a server
- has API to send to all clients: `io.emit`

npm run start2


## Client (app)

Run individual clients using 
`parcel index.html --port 5001`
`parcel index.html --port 5002`
...