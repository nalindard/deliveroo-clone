// import { UnknownAction } from '@reduxjs/toolkit'
import { UnknownAction, Dispatch } from '@reduxjs/toolkit'
// import { Dispatch } from 'react'
import {
    setBasketLoading,
    replaceBasket,
    addItemToBasket,
    setBasketId,
} from './basketSlice'
// import { IBasketItem } from '../../types'
import fetchData from '../../api/FetchData'
import {
    BasketCreateionResponse,
    BasketDataResponse,
    CreateBasketResponse,
    IBasket,
    IDish,
    PostBasketItemResponse,
} from '../../types'

// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function createBasket(userId: string, restaurantId: string) {
    try {
        const { ok, data, error } = (await fetchData(`basket`, {
            method: 'POST',
            withAuth: true,
            body: {
                userId,
                restaurantId,
            },
        })) as CreateBasketResponse
        if (ok) {
            return { ok, data, error }
        }
        alert(error ?? 'Failed to create basket')
        throw new Error(`Failed to create basket: ${error}`)
    } catch (error) {
        console.error(error)
        return {
            ok: false,
            data: null,
            error: `Failed to create basket: ${error}`,
        }
    }
}

async function fetchBasketData(
    userId: string,
    restaurantId: string
): Promise<{ ok: boolean; data: IBasket | null; error: string | null }> {
    try {
        const {
            ok,
            data,
            error,
        }: {
            ok: boolean
            data: BasketDataResponse | null
            error: string | null
        } = await fetchData(
            `basket?userId=${userId}&restaurantId=${restaurantId}`,
            {
                withAuth: true,
            }
        )
        // console.log('getBasketData:', data)
        // console.log(data?.data[0])
        if (ok) {
            return { ok, data: data?.data[0] ?? null, error }
        }
        alert(error ?? 'Failed to fetch basket data')
        throw new Error(`Failed to fetch basket data: ${error}`)
    } catch (error) {
        console.error(error)
        alert(`Failed to fetch basket data: ${error}`)
        return {
            ok: false,
            data: null,
            error: `Failed to fetch data: ${error}`,
        }
    }
}

export const getBasketData = (userId: string | null, restaurantId: string) => {
    return async (dispatch: Dispatch<UnknownAction>) => {
        if (!userId || !restaurantId) return
        try {
            const { ok, data } = await fetchBasketData(userId, restaurantId)

            dispatch(setBasketId(data?.id))

            console.log('getBasketData:', { ok, data })
            const basketItems =
                data?.OrderItems &&
                data.OrderItems.map((item) => {
                    const data = {
                        itemId: item.id,
                        amount: item.amount,
                        dishId: item.dishId,
                        ...item.Dish,
                    }
                    return data
                })

            dispatch(setBasketLoading({ basketLoading: false }))
            dispatch(replaceBasket(basketItems))
        } catch (error) {
            // console.error(error)
            throw new Error(`Failed to fetch data: ${error}`)
        }
    }
}
// export const sendBasketData = (basket: IBasketItem[]) => {
//     return async (dispatch: Dispatch<UnknownAction>) => {
//         try {
//             await wait(1000)
//             // dispatch(setBasketLoading({ basketLoading: false }))
//             // dispatch(replaceBasket([]))
//             dispatch(replaceBasket(basket))
//         } catch (error) {
//             console.error(error)
//         }
//     }
// }

async function postBasketItem(
    basketId: string,
    dishId: string,
    amount: number
) {
    try {
        // basket/28f2c1d9-c8ae-4e3d-891e-e3d82bd7b3a5/items
        if (!basketId || !dishId || !amount) {
            return { ok: false, data: null, error: 'Failed to add item to basket' }            
        }
        const { ok, data, error } = (await fetchData(
            `basket/${basketId}/items`,
            {
                method: 'POST',
                withAuth: true,
                body: {
                    dishId,
                    amount,
                },
            }
        )) as PostBasketItemResponse
        return { ok, data, error }
    } catch (error) {
        console.error(error)
        return { ok: false, data: null, error: 'Failed to add item to basket' }
    }
}

export const addNewItemToBasket = (
    basketId: string,
    dish: IDish,
    userId: string,
    amount: number
) => {
    return async (dispatch: Dispatch<UnknownAction>) => {
        try {
            // await wait(1000)
            if (!basketId) {
                const { ok, data, error } = await createBasket(
                    userId,
                    dish.restaurantId
                ) as BasketCreateionResponse

                if (!ok) {
                    alert(error ?? 'Failed to create basket')
                    throw new Error(`Failed to create basket: ${error}`)
                }
                dispatch(setBasketId(data.data.id))
                // return true
            }

            await new Promise((resolve) => setTimeout(resolve, 250))

            const { ok, data, error } = await postBasketItem(
                basketId,
                dish.id,
                amount
            )

            // console.log('addNewItemToBasket:', ok, data, error)
            if (!ok) {
                alert(error ?? 'Failed to add item to basket')
                throw new Error(`Failed to add item to basket: ${error}`)
            }

            const newItem = {
                // @ts-expect-error 'itemId' is specified more than once, so this usage will be overwritten.
                itemId: data?.data.id,
                amount: amount,
                dishId: dish.id,
                ...dish,
            }

            dispatch(addItemToBasket(newItem))

            return true
        } catch (error) {
            console.error(error)
        }
    }
}
