import { Icon } from '@iconify/react/dist/iconify.js'
import { FC, useEffect, useState } from 'react'
import ReccommendedSection from './ReccomendedSection'
import ReccommendedItem from './ReccomendedItem'
import Button from './Button'
import fetchData from '../../api/FetchData'
import { DishDataResponse, IBasketItem } from '../../types'
import useAuth from '../../hooks/UseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { addNewItemToBasket } from '../../store/basket/basketActions'
import { RootState } from '../../store/store'
import { useInView } from 'react-intersection-observer'

type DishDetailsProps = {
    dishId: string
    className?: string
    visible?: boolean
    onClose?: () => void
}

const DishDetails: FC<DishDetailsProps> = ({
    dishId,
    className,
    visible,
    onClose,
}: DishDetailsProps) => {
    // const z = !true

    const [dishData, setDishData] = useState<DishDataResponse>()
    const [amount, setAmount] = useState(1)

    const auth = useAuth()
    const dispatch = useDispatch()
    const basketId = useSelector((state: RootState) => state.basket.id)
    const userId = useSelector((state: RootState) => state.auth.user?.id)
    const { ref, inView: imageIsVisible } = useInView({
        threshold: 0,
        // rootMargin: '-350px',
    })

    useEffect(() => {
        const fetchDishData = async (url: string) => {
            const { data } = await fetchData(url)
            setDishData(data as DishDataResponse)
            // console.log(data as DishDataResponse)
        }
        if (!dishId) return
        fetchDishData(`menus/${dishId}`)
    }, [dishId])

    const addOneItem = () => {
        if (amount >= 10) return
        setAmount(amount + 1)
    }
    const removeOneItem = () => {
        if (amount <= 1) return
        setAmount(amount - 1)
    }

    const addToBasket = async () => {
        if (!auth || !userId) return
        // console.log('add to basket:', dishData, amount)
        const res = await addNewItemToBasket(basketId, dishData as IBasketItem, userId, amount)(dispatch)
        setAmount(1)
        if(res && onClose) onClose()
        
    }

    // if (!dishData) return null;

    return (
        <div
            className={
                `bg-white min-h-40 min-w-20 w-screen h-screen relative sm:bg-transparent flex justify-center  ` +
                className
            }>
            <div
                onClick={(e) => e.stopPropagation()}
                className='h-full overflow-y-scroll sm:m-4 md:m-8 md:relative md:h-[calc(100vh-64px)] md:max-w-[560px] flex flex-col justify-between'>
                <div className='h-[75%] flex-grow overflow-y-scroll'>
                    <div
                        className={
                            `absolute top-0 left-0 right-0 flex justify-center px-4 z-[100] duration-300 ` +
                            (!imageIsVisible
                                ? 'bg-background-primary block'
                                : 'bg-transparent')
                        }>
                        <h1
                            className={
                                `text-center font-bold bg-background-primary w-[calc(100%-32px)] py-4 duration-300 ` +
                                (!imageIsVisible ? 'opacity-100' : 'opacity-0')
                            }>
                            {dishData?.name || 'NA'}
                        </h1>

                        <button
                            onClick={() => onClose && onClose()}
                            className={
                                `w-10 h-10 mt-2 bg-background-primary rounded-full overflow-hidden text-accent grid place-items-center shadow focus:focus-ring ` +
                                (visible ? '' : 'hidden')
                            }>
                            <Icon
                                icon='ic:baseline-close'
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>

                    <div ref={ref} className='md:[aspect-ratio:952/536] overflow-hidden md:flex md:items-center justify-center relative'>
                        <img
                            className='md:h-full md:z-10'
                            // src='/images/dish-details.webp'
                            src={dishData?.image || '#'}
                            alt=''
                        />
                        <img
                            className='hidden md:block md:absolute md:w-full'
                            src='/images/dish-details.webp'
                            // src={dishData?.image || '#'}
                            alt=''
                        />
                    </div>

                    {/* Details */}
                    <div className='bg-background-primary p-4 pb-6'>
                        <div>
                            <h2
                                className='font-semibold [font-size:22px] md[font-feature-settings:"ss01","ss02"] md:[font-size:28px] 
                        md[line-height:36px] md:font-stratos leading-9'>
                                {dishData?.name || 'NA'}
                            </h2>
                            <p className='pt-2 [font-size:16px] [line-height:22px]'>
                                {/* A feast for 6 people! halloumi with pesto,
                                roasted peppers, roasted tomatoes, sweet potato,
                                pickled red onion and balsamic dressing served
                                on a mixed leaf base. */}
                                {dishData?.description || 'NA'}
                            </p>
                        </div>

                        <div className='py-3'>
                            <hr />
                        </div>

                        <div className='text-foreground-secondary [font-size:14px] [line-height:19px]'>
                            <h4 className='text-foreground-secondary font-semibold '>
                                {/* Contains milk, mustard, sulphur
                                dioxide/sulphites */}
                                Contains{' '}
                                {dishData?.ingradients?.replace(/,/g, ', ') ||
                                    'NA'}
                            </h4>
                            <p className='text-left w-[80%]'>
                                Questions about allergens, ingredients or
                                cooking methods?{' '}
                                <a className='side-link' href='#'>
                                    Please contact the restaurant
                                </a>
                            </p>
                        </div>

                        <div className='py-3'>
                            <hr />
                        </div>

                        <div className=''>
                            {/* Reccommended for selected dish */}

                            {/* <div className='pt-6'>
                            <h4 className='[font-size:16px] [line-height:22px] font-semibold'>
                                add a 1 litre juice?
                            </h4>

                            <div className='pt-4 text-foreground-secondary/50'>
                                <button className='w-full flex justify-between'>
                                    <div className='text-left w-3/4'>
                                        <h4>
                                            freshly squeezed large ACG juice - 1
                                            litre
                                        </h4>
                                        <p className='text-sm'>no known allergens 351 kcal</p>
                                    </div>

                                    <div className='w-1/4 flex'>
                                        <span>+£17.99</span>

                                        <span className='pl-1'>
                                            <input type='checkbox' />
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div> */}

                            <ReccommendedSection title=''>
                                {Array.from({ length: 6 }, (_, i) => i + 1).map(
                                    (i) => (
                                        <ReccommendedItem key={i} />
                                    )
                                )}
                            </ReccommendedSection>
                            <ReccommendedSection title=''>
                                {Array.from({ length: 6 }, (_, i) => i + 1).map(
                                    (i) => (
                                        <ReccommendedItem key={i} />
                                    )
                                )}
                            </ReccommendedSection>
                            <ReccommendedSection title=''>
                                {Array.from({ length: 6 }, (_, i) => i + 1).map(
                                    (i) => (
                                        <ReccommendedItem key={i} />
                                    )
                                )}
                            </ReccommendedSection>
                        </div>

                        {/* <div className='min-h-40'></div> */}
                    </div>
                    {/* <div className='h-screen bg-purple-200'></div> */}
                </div>

                <div className=''>
                    <div className='p-4 md:p-6 bg-background-primary  [box-shadow:0_-2px_20px_-10px_rgba(0,0,0,0.2)] md:max-w-[560px]'>
                        <div className={ `pb-4 ` + (auth ? ' text-foreground-primary ' : ' text-foreground-secondary/50 ') }>
                            <div className='w-[200px] mx-auto flex justify-between items-center'>
                                <Button onClick={removeOneItem}>
                                    <Icon
                                        icon='dashicons:remove'
                                        width={24}
                                        height={24}
                                    />
                                </Button>
                                <p className='text-center text-2xl font-bold'>
                                    {amount}
                                </p>
                                <Button onClick={addOneItem}>
                                    <Icon
                                        icon='gridicons:add-outline'
                                        width={24}
                                        height={24}
                                    />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Button
                            onClick={addToBasket}
                                className='w-full h-full grid place-items-center font-bold min-h-12 py-3 px-6 rounded bg-accent text-background-primary focus:focus-ring'
                                disabled={!auth}>
                                {/* <p>Add for £{dishData?.priceInCents/100}</p> */}
                                {dishData && (
                                    <p>
                                        Add for £
                                        {(dishData.priceInCents * amount) / 100}
                                    </p>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DishDetails
