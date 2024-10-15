import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userLoading: <boolean>false,
        isAuthenticated: <boolean | null>null,
        user: <{id:string, email:string, name:string, role:string} | null>{},
    },
    reducers: {
        login: (state) => {
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.isAuthenticated = false
        },
        setUserLoading: (state, action) => {
            state.userLoading = action.payload as boolean
        },

        setUser: (state, action) => {
            state.user = action.payload
        },
    },
})

export const { login, logout, setUserLoading, setUser } = authSlice.actions
export default authSlice.reducer