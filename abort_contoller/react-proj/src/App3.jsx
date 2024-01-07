// improvement 3: for users with slow connections
// which is a big part of the world (3rd-world countries)
// just notify users
// -> set status to DELAYED

import { useState } from 'react'
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [fetchStatus, setFetchStatus] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState('')

    async function getUsers() {
        setFetchStatus("LOADING")

        // const controller = new AbortController()

        const timeout = setTimeout(() => {
            // will go into catch block
            // controller.abort()
            setFetchStatus("DELAYED")
        }, 3000)

        try {
            const raw = await fetch("http://localhost:3001/users", {
                // signal: controller.signal
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
            <button onClick={getUsers} disabled={fetchStatus === "LOADING" || fetchStatus === "DELAYED"}>
                Load users
            </button>
            {fetchStatus === "DELAYED" && <h3>Response is taking longer than normal</h3>}
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
