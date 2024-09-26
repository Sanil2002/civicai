import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { tokenType } from '@/lib/generalTypes'

// Define a type for the slice state
interface AuthState {
    isAuthenticated: boolean,
    token: tokenType
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: {},
}

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<any>) => {
            state.isAuthenticated = action.payload;
        },
        setToken: (state, action: PayloadAction<any>) => {
            state.token = action.payload;
        },
    },
})

export const { setAuth, setToken } = authSlice.actions

export default authSlice.reducer