let i = 0;
const timedCount = ()=>{
    i++;
    // send message back to main thread
    postMessage(i);
    // console.log(i)
    setTimeout(timedCount, 500);
    // this one works too?
    setTimeout("timedCount()", 500);
};
timedCount();

//# sourceMappingURL=worker.304e6481.js.map
