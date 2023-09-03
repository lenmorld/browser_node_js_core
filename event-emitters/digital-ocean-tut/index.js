const TicketManager = require("./ticketManager");
const EmailService = require("./emailService");
const DatabaseService = require("./databaseService");
const { BUY_EVENT }  = require('./constants')

const ticketManager = new TicketManager(3)
const emailService = new EmailService()
const databaseService = new DatabaseService()

// listen to BUY event
ticketManager.on(BUY_EVENT, (email, price, timestamp) => {
    emailService.send(email)
    databaseService.save(email, price, timestamp)
})

// catch error event
ticketManager.on('error', (error) => 
    console.error(`Sorry, an error occurred: ${error}`))

// listenerCount
console.log(`We have ${ticketManager.listenerCount(BUY_EVENT)} listeners for the BUY event`)

ticketManager.buy('user1@example.com', 100)
ticketManager.buy('user1@example.com', 200)
// TO TEST error - no more tickets
// ticketManager.buy('user1@example.com', 300)


// remove event listener
// ticketManager.off(BUY_EVENT, () => {
//     console.log('Tickets running out')
// })

ticketManager.removeAllListeners(BUY_EVENT);

console.log("The last ticket was bought. Removing event");

// event not triggered anymore - email not sent and not saved on DB
// to TEST event removed
ticketManager.buy('user1@example.com', 100)