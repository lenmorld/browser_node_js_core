const EventEmitter = require("events");

const { BUY_EVENT } = require('./constants')

class TicketManager extends EventEmitter {
    constructor(inventory) {
        super()
        this.inventory = inventory
    }

    buy(email, price) {
        console.log(`[Ticket Manager] purchase request submitted ${email} ${price}`)

        if (this.inventory <= 0) {
            this.emit('error', new Error('[Ticket Manager] No more tickets left! sorry'))
            return
        }

        this.inventory--
        this.emit(BUY_EVENT, email, price, Date.now())
    }
}

// USAGE
// const ticketManager = new TicketManager(10)

// once() - removed after event is called once
// ticketManager.once(BUY_EVENT, () => {
// ticketManager.on(BUY_EVENT, () => {
//     console.log('Someone bought a ticket')
// })

// ticketManager.buy('user1@example.com', 20)
// ticketManager.buy('user2@example.com', 30)

module.exports = TicketManager
