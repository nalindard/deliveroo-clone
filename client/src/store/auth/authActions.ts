import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { setUserLoading, login, setUser } from './authSlice'
import fetchData from '../../api/FetchData'

// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function updateUser() {
    try {
        const accessToken = localStorage.getItem('accessToken') ?? null
        // console.log('User sync',)

        if (accessToken) {
            // const res = await fetchData('auth/protected', { withAuth: true })
            const res = await fetchData('auth', { withAuth: true })
            console.log('User sync', res)

            // @ts-expect-error property 'user' does not exist on type 'unknown'
            if (res.ok) return {ok: true, user: res.data?.user}
            // if (res.ok) {
            //     const { data } = res
            //     const user: User = data.user
            //     return { ok: true, user }
            // }
        }

        return {ok: false}
    } catch (error) {
        console.log(error)
        return {ok: false}
    }
}

export const syncUser = () => {
    return async (dispatch: Dispatch<UnknownAction>) => {
        try {
            console.log('syncing user...')

            dispatch(setUserLoading(true))
            // await wait(1000)
            const user = await updateUser()
            if (user.ok) {
                dispatch(login())
                dispatch(setUser(user.user))
            }
            dispatch(setUserLoading(false))
        } catch (error) {
            console.error(error)
        }
    }
}
