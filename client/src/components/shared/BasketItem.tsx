import { Icon } from '@iconify/react/dist/iconify.js'
import { FC } from 'react'
import type { IBasketItem } from '../../types/index.d.ts'

type BasketItemProps = {
    className?: string
    dishData: IBasketItem
    // amount: number
    onRemove?: (id:string) => void
}

const BasketItem: FC<BasketItemProps> = ({
    className,
    dishData,
    onRemove,
}: BasketItemProps) => {
    const handleClick = () => {
        console.log(dishData)
        onRemove?.(dishData.itemId)
    }

    return (
        <div
            className={
                `flex relative overflow-hidden rounded  flex-row w-full shadow-sm hover:shadow-xl duration-500 hover:scale-[1.001] py-2 px-2 text-left !h-[68px] ` + (dishData.isAvaliable ? ' bg-background-primary ' : ' border border-red-500  bg-red-50 hover:shadow-none hover:scale-100') +
                className
            }>
            {/* Image */}
            <div
                style={{
                    backgroundImage: `url('${dishData?.image}')`,
                }}
                className={` grid place-items-center *:scale-125 overflow-hidden bg-[url('${dishData?.image}')] bg-cover bg-center bg-no-repeat w-[60px] h-[60px] rounded ` + (dishData.isAvaliable ? '' : 'opacity-25') }>
                {/* <img className='h-full w-full' src={image || '/image-dish.webp'} alt='' /> */}
            </div>

            {/* Body */}
            <div
                className={`text-xs text-foreground-secondary leading-relaxed md:text-sm w-1/2 pl-2 flex-grow `}>
                <h3 className={`font-bold text-foreground-primary text-base ` + (dishData.isAvaliable ? '' : 'line-through text-foreground-primary/50')}>
                    {dishData?.name}
                </h3>
                {/* <p  className={`text-ellipsis line-clamp-2 text-sm' `}>{desc?.length > 60 ? desc?.substring(0, 60) + '...' : desc}</p> */}
                {/* <h5 className={` text-sm `}>{dishData?.calories}kcal</h5> */}
                <h5 className={`flex justify-between_ pt-0.5 text-sm `}>
                    <span>£{(dishData?.priceInCents ?? 0) / 100}</span>
                    {/* <span>£{String(dishData?.isAvaliable) }</span> */}
                    <span className='px-0.5 pl-2'>x</span>
                    <span className='text-orange-500 pl-2'>
                        {dishData.amount ?? 1}
                    </span>
                </h5>
            </div>

            {/* Action */}
            <div className={'pl-2'}>
                <button
                    onClick={handleClick}
                    className='w-full h-full max-h-[100px] min-h-[34px] grid place-items-center p-2 text-foreground-secondary/50'>
                    <Icon className={(dishData.isAvaliable ? '': ' text-success-light ')} icon={'line-md:close-small'} height={27} />
                </button>
            </div>
        </div>
    )
}

export default BasketItem
