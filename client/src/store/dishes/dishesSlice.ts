import { createSlice } from '@reduxjs/toolkit'
import type { IDishData } from './../../types/index.d'

const dishesSlice = createSlice({
    name: 'dishes',
    initialState: {
        popularDishesLoading: <boolean>true,
        featuredDishesLoading: <boolean>true,
        popularDishes: <IDishData[]>[],
        featuredDishes: <IDishData[]>[],
    },
    reducers: {
        setPopularDishesLoading: (state, action) => {
            state.popularDishesLoading = action.payload
        },
        setFeaturedDishesLoading: (state, action) => {
            state.featuredDishesLoading = action.payload
        },
        setPopularDishes: (state, action) => {
            state.popularDishes = action.payload
        },
        setFeaturedDishes: (state, action) => {
            state.featuredDishes = action.payload
        },
    },
})

export const {
    setPopularDishesLoading,
    setPopularDishes,
    setFeaturedDishesLoading,
    setFeaturedDishes,
} = dishesSlice.actions
export default dishesSlice.reducer
