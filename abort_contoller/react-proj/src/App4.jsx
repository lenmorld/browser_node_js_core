// improvement 4: notify + allow cancel
// -> use ref to hold the abort controller
// -> which is managed per fetch, should be oustide of component lifecycle

import { useRef, useState } from 'react'
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [fetchStatus, setFetchStatus] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState('')

    const controllerRef = useRef()

    // ❌ DOESN'T WORK HERE, since it's specific to fetch
    // and should be controlled outside of the component lifecycle
    // const controller = new AbortController()

    async function getUsers() {
        setFetchStatus("LOADING")

        controllerRef.current = new AbortController()

        const timeout = setTimeout(() => {
            // will go into catch block
            // controller.abort()
            setFetchStatus("DELAYED")
        }, 3000)

        try {
            const raw = await fetch("http://localhost:3001/users", {
                signal: controllerRef.current.signal
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
                setFetchStatus("CANCELLED")
                setErrorMessage('Request took too long, request aborted')
            } else {
                setFetchStatus("ERROR")
                setErrorMessage(e.message)
            }

        } finally {
            clearTimeout(timeout)
        }
        // console.log(data)
    }

    const cancelRequest = () => {
        // controller.abort()
        controllerRef.current.abort()
    }

    return (
        <>
            <button onClick={getUsers} disabled={fetchStatus === "LOADING" || fetchStatus === "DELAYED"}>
                Load users
            </button>
            {fetchStatus === "DELAYED" && (<>
                <h3>Response is taking longer than normal.</h3>
                <button onClick={cancelRequest}>Cancel</button>
            </>
            )}
            {fetchStatus === "ERROR" && <h3>{errorMessage || 'error!'}</h3>}
            {fetchStatus === "CANCELLED" && <h3>{errorMessage || 'cancelled!'}</h3>}
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
