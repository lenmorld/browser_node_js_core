### JS engine
JS engine runs these operations; event loop 
is just a mechanism and call stack is a DS*

### Event loop (part of JS engine)
- continually checks the queue and call stack
- so when stack is empty (all lines of code had been executed), start looking at the queue to run them
- run them = move queue item to stack 
- runs macro tasks queue first; when that's empty, runs micro tasks queue

### Call stack

- ons thread = one call stack = one line at a time
- only for functions; statements are executed right away by the JS engine

- when stack is empty, push next line of code to stack
  - i.e. stack can only handle a line of code and all its function calls (and function call's own function calls, and so on...)
- if line calls a function, it gets pushed to stack
- when function is finished or returns a value, pop off the stack
- empty stack means the current line has finished all its function calls, time to push the next one
- call stack represents the main thread in JS, 
the async operations are added to micro and macro task queues for scheduling


-> stack is empty: means all previously invoked functions have returned their values and popped off the stack

-> executing a line / function call = pushing to stack and running it

->  console.log(), setTimeout are also functions, thus also added to call stack; they just don't appear in stack trace

### Event loop flow

engine encounters `console.log`; push to call stack
    execute -> log to console (#1)
    pop off the stack; engine continues

engine encounters `setTimeout`; push
    execute -> setTimeout is a browser native;
        send callback to WebAPI
            WebAPI runs timer, when expires (0), WebAPI adds it to the (macro)task queue
    pop

    macro-task [callback1]
    micro-task []

engine encounters 2nd `setTimeout`; push
    execute...

    macro-task [callback1, callback 2]
    micro-task []

engine encounters Promise.resolve; push
    execute -> engine knows how to handle Promise
        add .then callback to micro-task queue
    pop

    macro-task [callback1, callback 2]
    micro-task [Promise.then 1]

engine encounters declaration of new Promise; push
    execute -> Promise constructor: push
        a now has the Promise
engine encounters a.then; push
    execute -> engine knows how to handle Promise
        add .then callback to micro-task queue
    pop

    macro-task [callback1, callback 2]
    micro-task [Promise.then 1, Promise.then 2]

script done

call stack is empty
engine runs through micro-task queue until it's empty (FIFO)
    engine takes Promise.then 1 into the call stack
        execute -> log to console (#2)
    engine takes Promise.then 2 into the call stack
        execute -> log to console (#3)

    micro-task [Promise.then 1, Promise.then 2] ->
    micro-task []

call stack is empty
engine sees micro-task queue is empty
engine runs through (macro)task queue until it's empty (FIFO)
    engine takes callback1 into the call stack
        execute -> log to console (#4)
    engine takes callback2 into the call stack
        execute -> log to console (#5)

call stack is empty
no more liens of code
done

output:
regular task
promise then 1 - micro task
promise then 2 - micro task
set timeout callback 1 - macro task
set timeout callback 2 - macro task