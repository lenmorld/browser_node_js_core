import { useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  async function getUsers() {
    const raw = await fetch("http://localhost:3001/users")
    const data = await raw.json()

    // console.log(data)

    setUsers(data)
}
  

  return (
    <>
        <button onClick={getUsers}>
            Load users
        </button>
        <pre>
            {JSON.stringify(users, null, 2)}
        </pre>
    </>
  )
}

export default App
