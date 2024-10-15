import { Icon } from '@iconify/react/dist/iconify.js'
import { FC, useMemo } from 'react'
import type { IDish, IDishData } from '../../types/index.d.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store.ts'

type DishCardProps = IDishData & {
    layout?: 'vertical' | 'horizontal'
    id: string
    image: string
    name: string
    cal?: number
    price: string
    desc?: string
    highlight?: string
    disabled?: boolean
    className?: string
    dishData?: IDish
    onClick?: (id: string, data?: IDish) => void
}

const DishCard: FC<DishCardProps> = ({
    layout,
    id,
    image,
    name,
    cal,
    price,
    desc = '',
    highlight,
    disabled,
    className,
    dishData,
    onClick,
}: DishCardProps) => {
    const basketItems = useSelector((state: RootState) => state.basket.items)
    const basketItemsIds = useMemo(
        () => basketItems.map((item) => item.id),
        [basketItems]
    )

    const inBasket = basketItemsIds.includes(id)

    const handleClick = () => {
        if (!disabled && !inBasket && onClick) {
            onClick(id, dishData)
        }
    }

    return (
        <div
            onClick={handleClick}
            className={
                `flex relative overflow-hidden rounded bg-background-primary ` +
                (layout === 'vertical'
                    ? 'flex-col max-w-[125px] shadow'
                    : 'flex-row w-full shadow-sm hover:shadow-xl duration-500 hover:scale-[1.001] py-4 px-4') +
                (disabled
                    ? ' !cursor-not-allowed opacity-50 !hover:shadow-none !hover:scale-100 '
                    : ' cursor-pointer ') +
                (inBasket ? ' border border-accent border-l-8 ' : '  ') +
                className
            }>
            {/* Image */}
            <div
                style={{
                    backgroundImage: `url('${image}')`,
                }}
                className={
                    ` grid place-items-center *:scale-125 overflow-hidden bg-[url('${image}')] bg-cover bg-center bg-no-repeat ` +
                    (layout === 'vertical'
                        ? 'order-1 w-[124px] h-[124px]'
                        : 'order-2 w-[100px] h-[100px] rounded')
                }>
                {/* <img className='h-full w-full' src={image || '/image-dish.webp'} alt='' /> */}
            </div>

            {/* Body */}
            <div
                className={
                    `text-xs text-foreground-secondary leading-relaxed md:text-sm ` +
                    (layout === 'vertical'
                        ? 'order-2 px-2'
                        : 'order-1 w-1/2 pr-4 flex-grow ')
                }>
                <h3
                    className={
                        `font-bold text-foreground-primary ` +
                        (layout === 'vertical' ? '' : 'text-base')
                    }>
                    {name}
                </h3>
                <p
                    className={
                        `text-ellipsis line-clamp-2 ` +
                        (layout === 'vertical' ? '' : 'text-sm')
                    }>
                    {desc?.length > 60 ? desc?.substring(0, 60) + '...' : desc}
                </p>
                <h5 className={` ` + (layout === 'vertical' ? '' : 'text-sm')}>
                    {cal}kcal
                </h5>
                <h5
                    className={
                        `flex justify-between_ pt-0.5 ` +
                        (layout === 'vertical' ? '' : 'text-sm')
                    }>
                    <span>{price}</span>
                    <span className='text-orange-500 pl-2'>. {highlight}</span>
                </h5>
            </div>

            {/* Action */}
            <div
                className={
                    layout === 'vertical' ? 'order-3 p-2' : 'order-3 pl-2'
                }>
                <button
                    onClick={handleClick}
                    className={
                        `w-full h-full max-h-[100px] min-h-[34px] grid place-items-center border p-2 text-foreground-secondary/50 ` +
                        (disabled || inBasket ? ' !cursor-not-allowed ' : '')
                    }
                    disabled={disabled || inBasket}>
                    <Icon icon={'mingcute:add-line'} height={20} />
                </button>
            </div>
        </div>
    )
}

export default DishCard
