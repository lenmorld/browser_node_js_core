// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
import { cpuHungryTask,
    cpuHungryTaskSplit1,
    cpuHungryTaskSplit2
   } from './eventLoop1'


  const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };

document.querySelector('button').addEventListener('click', (e) => {
  document.body.style.backgroundColor = randomHexColorCode()
})

// 1st is just counting, 2nd is with total

// done in ~1700ms | ~11000ms, but UI not interactive during that time
// cpuHungryTask()

// done in ~8000ms | ~16000ms, but UI interactive during that time
// cpuHungryTaskSplit1()

// BEST! ✅
// done in ~4860ms | ~10000ms, but UI interactive during that time
cpuHungryTaskSplit2()


document.querySelector('#app').innerHTML = ``

// setupCounter(document.querySelector('#counter'))
