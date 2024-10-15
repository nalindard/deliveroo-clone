import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { syncUser } from './store/auth/authActions'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-expect-error Dispatching unknown action
        dispatch(syncUser())
    }, [dispatch])

    return <RouterProvider router={router} />
}

export default App
