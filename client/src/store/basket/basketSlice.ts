import { createSlice } from '@reduxjs/toolkit'
import type { IBasketItem } from './../../types/index.d'

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        id: '',
        items: <IBasketItem[]>[],
        basketLoading: <boolean>false,
    },
    reducers: {
        setBasketId: (state, action) => {
            if (!action.payload) {
                throw new Error('No basket id provided')
            }
            state.id = action.payload
        },
        setBasketLoading: (state, action) => {
            state.basketLoading = action.payload
        },
        addItemToBasket: ({ items }, { payload: newBasketItem }: { payload: IBasketItem }) => {
            if (items.some((item) => item.itemId === newBasketItem.itemId)) {
                throw new Error('Item already in basket')
            }
            items.push(newBasketItem)
        },
        removeItemFromBasket: ({ items }, { payload: newBasketItem }: { payload: IBasketItem }) => {
            if (!items.some((item) => item.itemId === newBasketItem.itemId)) {
                throw new Error('Item not in basket')
            }
            items.splice(items.indexOf(newBasketItem), 1)
        },
        replaceBasket: (state, action) => {
            state.items = action.payload ?? []
        },
    },
})

export const {
    setBasketId,
    setBasketLoading,
    addItemToBasket,
    removeItemFromBasket,
    replaceBasket,
} = basketSlice.actions
export default basketSlice.reducer
