import { Icon } from '@iconify/react/dist/iconify.js'
import { FC, useEffect, useMemo } from 'react'
import Button from './Button'
// import DishCard from './DishCard'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { getBasketData } from '../../store/basket/basketActions'
import useAuth from '../../hooks/UseAuth'
import BasketItem from './BasketItem'
import fetchData from '../../api/FetchData'
import { CheckOutResponse } from '../../types'
import { replaceBasket } from '../../store/basket/basketSlice'
// import Counter from './Counter'

type BasketProps = {
    // userId: string
    restaurantId: string
}

const Basket: FC<BasketProps> = ({ restaurantId }: BasketProps) => {
    // const [isEmpty, setIsEmpty] = useState(!true)

    const dispatch = useDispatch()
    const userId =
        useSelector((state: RootState) => state.auth.user?.id) ?? null
    const auth = useAuth()

    useEffect(() => {
        getBasketData(userId, restaurantId)(dispatch)
    }, [dispatch, userId, restaurantId])

    const basketItems = useSelector((state: RootState) => state.basket.items)
    const basketId = useSelector((state: RootState) => state.basket.id)
    const totalValue = useMemo(
        () =>
            (
                basketItems.reduce(
                    (total, item) => total + item.priceInCents * item.amount,
                    0
                ) / 100
            ).toFixed(2),
        [basketItems]
    )
    const unAvailableItemsInBasket = useMemo(
        () => basketItems.filter((item) => !item.isAvaliable).length > 0,
        [basketItems]
    )

    const handleCheckout = async () => {
        if (!auth) throw new Error('Not authenticated')
        console.log('handleCheckout:', basketId, basketItems)

        const { ok, data, error } = (await fetchData(`orders`, {
            method: 'POST',
            withAuth: true,
            body: {
                basketId,
                userId,
            },
        })) as CheckOutResponse
        if (!ok) {
            alert(error ?? 'Failed to checkout')
            return
        }

        console.log('checkout-data:', data)
        alert(`${data.message}, totalValueInCents: ${data?.data.totalValueInCents}`)
        dispatch(replaceBasket([]))
        getBasketData(userId, restaurantId)(dispatch)
    }

    const handleRemoveItem = async (itemId: string) => {
        console.log('handleRemoveItem:', itemId)
        const { ok, error } = await fetchData(
            `basket/${basketId}/items/${itemId}`,
            {
                method: 'DELETE',
                withAuth: true,
            }
        )
        if (!ok) {
            alert(error ?? 'Failed to remove item')
            return
        }
        getBasketData(userId, restaurantId)(dispatch)
    }

    return (
        <div className='border bg-background-primary w-full h-[calc(100vh_-_64px_-_(72px_+_73px))] flex flex-col justify-between p-4'>
            {basketItems.length === 0 ? (
                <span
                    // onClick={() => setIsEmpty(!isEmpty)}
                    className='text-foreground-secondary/50 flex-grow grid place-items-center'>
                    <span className='text-center'>
                        <Icon
                            icon='ph:basket-bold'
                            className='mx-auto'
                            width={50}
                        />
                        <p>Your basket is empty</p>

                        {/* {basketItems.map((item) => {
                            return <BasketItem dishData={item} key={item.id} />
                        })} */}
                    </span>
                    {/* <span><Counter /></span> */}
                </span>
            ) : (
                <div
                    // onClick={() => setIsEmpty(!isEmpty)}
                    className='w-full h-full bg-background-secondary overflow-y-scroll flex flex-col gap-y-2 p-2 *:min-h-[76px]'>
                    {/* {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i}>
                            <DishCard
                                key={i}
                                id=''
                                name='Parmesan Chicken Salad'
                                price='£69.99'
                                // desc='A feast for 6 people! halloumi with pesto, roasted peppers, roasted tomatoes, sweet potato, pickled red onion and balsamic dressing served on a mixed leaf base.'
                                // highlight='Popular'
                                kcal='325 kcal'
                                layout='horizontal'
                                image='/images/image-dish.webp'
                            />
                        </div>
                    ))} */}
                    {basketItems.map((item) => {
                        return (
                            <BasketItem
                                dishData={item}
                                key={item.id}
                                onRemove={handleRemoveItem}
                            />
                        )
                    })}
                </div>
            )}

            <div>
                <Button
                    // onClick={handleCheckout}
                    disabled={true}
                    className='bg-accent text-background-primary font-bold w-full text-center py-4 mx-auto focus:focus-ring rounded mb-0.5 !cursor-default'>
                    <p className='text-center w-full'>
                        Total Value: £{totalValue}
                    </p>
                </Button>
                <Button
                    onClick={handleCheckout}
                    disabled={!auth || unAvailableItemsInBasket || basketItems.length === 0}
                    className='bg-accent text-background-primary font-bold w-full text-center py-4 mx-auto focus:focus-ring rounded'>
                    <p className='text-center w-full'>Go To Checkout</p>
                </Button>
            </div>
        </div>
    )
}

export default Basket
