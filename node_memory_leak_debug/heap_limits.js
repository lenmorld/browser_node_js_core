const memoryLeakAllocations = []

// const allocationStep = 10000 * 1024 // 10MB
const allocationStep = 100000 * 1024 // 100MB

const TIME_INTERVAL_IN_MSEC = 40

function allocateMemory(size) {
    // Simulate allocation of bytes
    const numbers = size / 8;
    const arr = [];
    arr.length = numbers;
    for (let i = 0; i < numbers; i++) {
      arr[i] = i;
    }
    return arr;
  }
  

setInterval(() => {
    const allocation = allocateMemory(allocationStep)

    memoryLeakAllocations.push(allocation)

    const memUsage = process.memoryUsage()

    // bytes / KB / MB / GB
    const memGb = memUsage["heapUsed"] / 1024 / 1024 / 1024
    const memRounded = Math.round(memGb * 100) / 100

    console.log(`Heap allocated ${memRounded} GB`)

}, TIME_INTERVAL_IN_MSEC)