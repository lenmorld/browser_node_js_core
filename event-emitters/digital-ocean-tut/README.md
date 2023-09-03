# Event emitters

> objects that trigger an event by sending a message, e.g. to signal that an action waas completed
> instead of chaining callbacks or promises that couples trigger action and result action, use "pub-sub" pattern, where a publisher sends a message, and a subscriber listens for and receives the message
> decouples the module that triggers action and the module that listens to action

## Mini project

Event listener for a "Ticker Manager"
Every time a ticket is bought, an event is triggered

## 2 ways

1. create `EventEmitter` object
2. extend `EventEmitter` class

https://www.digitalocean.com/community/tutorials/using-event-emitters-in-node-js
