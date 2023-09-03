
call stack
----------

queue
------
console.log("second")

web api
-------


const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();

event loop:
1. bar function call - push bar to call stack

    bar

2. bar calls setTimeout function - push to call stack

    setTimeout
    bar

3. setTimeout is executed; it returns a value but not used in this case. pop off setTimeout; bar returns undefined; pop off bar
   
4. web api handles setTimeout: it keeps callback and runs timer for 500ms;
[after 500ms, it pushes it to the queue (not the stack!) ]
For the mean time, the main thread continues to run the rest of the code line-by-line

5. foo function call - push foo to call stack

    foo

6. foo calls console.log - push to call stack

    console.log
    foo


7. console.log runs and prints "First" to console; returns something but not used -> pop off console.log; foo returns undefined; pop off foo


8. baz function all - push to call stack
    baz

9.  baz calls console.log - push to call stack

    console.log
    baz

10. console.log runs and prints "Third" to console; returns something but not used -> pop off console.log; baz returns undefined; pop off baz

11. Call stack is empty
    
12. If 500ms has passed, web api already added the callback to queue


13. Since call stack is empty, event loop starts running from queue


14. push console.log to stack; run console.log, which prints "Second"; pop off


15. Stack is empty; queue is empty; program is done





display:
First
Third
Second