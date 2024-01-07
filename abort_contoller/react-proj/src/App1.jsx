// improvement 1: disable button while loading
// so it cannot be clicked again while fetching
// -> use loading states

import { useState } from 'react'
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [fetchStatus, setFetchStatus] = useState('IDLE')

    async function getUsers() {
        setFetchStatus("LOADING")

        try {
            const raw = await fetch("http://localhost:3001/users")
            const data = await raw.json()
            setFetchStatus("SUCCESS")

            setUsers(data)

        } catch (e) {
            setFetchStatus("ERROR")
        }
        // console.log(data)
    }

    return (
        <>
            <button onClick={getUsers} disabled={fetchStatus === "LOADING"}>
                Load users
            </button>
            {fetchStatus === "ERROR" && <h3>error!</h3>}
            {
                fetchStatus === "SUCCESS" && (
                    <pre>
                        {JSON.stringify(users, null, 2)}
                    </pre>
                )
            }

        </>
    )
}

export default App
