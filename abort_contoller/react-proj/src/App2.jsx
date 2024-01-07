// improvement 2: improve UX if request takes too long
// -> technique 1: abort after a specified waiting time
// -> using AbortController

// e.g. if it takes longer than 3 seconds
// abort request, something must have gone wrong with server?

import { useState } from 'react'
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [fetchStatus, setFetchStatus] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState('')

    async function getUsers() {
        setFetchStatus("LOADING")

        const controller = new AbortController()

        const timeout = setTimeout(() => {
            // will go into catch block
            controller.abort()
        }, 3000)

        try {
            const raw = await fetch("http://localhost:3001/users", {
                signal: controller.signal
            })
            const data = await raw.json()
            setFetchStatus("SUCCESS")

            setErrorMessage('')

            setUsers(data)

        } catch (e) {
            // debugger
            // catch abort
            console.log(e)

            if (e.name === "AbortError") {
                // setErrorMessage(e.message)
                setErrorMessage('Request took too long, request aborted')
            }

            setFetchStatus("ERROR")
        } finally {
            clearTimeout(timeout)
        }
        // console.log(data)
    }

    return (
        <>
            <button onClick={getUsers} disabled={fetchStatus === "LOADING"}>
                Load users
            </button>
            {fetchStatus === "ERROR" && <h3>{errorMessage || 'error!'}</h3>}
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
