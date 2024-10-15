import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from './counterSlice'
import AuthReducer from './auth/authSlice'
import DishesReducer from './dishes/dishesSlice'
import BasketReducer from './basket/basketSlice'

export const store = configureStore({
    reducer: {
        // Reducers here
        counter: CounterReducer,
        auth: AuthReducer,
        dishe: DishesReducer,
        basket: BasketReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;