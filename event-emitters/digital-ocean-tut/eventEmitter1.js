const { EventEmitter } = require('events')

const firstEmitter = new EventEmitter()

// subscribe
firstEmitter.on('event', (a) => {
    console.log('event triggered', a)
})

// publish
firstEmitter.emit('My first event')
