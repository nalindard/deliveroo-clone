// import { useEffect } from 'react'
import fetchData from '../api/FetchData'

export default function AboutPage() {

    async function checkAuth() {
        const res = await fetchData('auth/protected', {withAuth: true})
        console.log(res);
        
        return true
    }

    // useEffect(() => {
        // alert('About Page')
        // checkAuth()
    // }, [])
    return (
        <div className='h-[calc(100vh-72px)]'>
            <h1>About Page</h1>

            <button onClick={() => checkAuth()}>Click Here</button>
        </div>
    )
}
