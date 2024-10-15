import { FC } from 'react'

const ReccommendedItem: FC = () => {
    return (
        <div className='pt-4 text-foreground-secondary/50'>
            <button className='w-full flex justify-between'>
                <span className='hidden sm:block'>
                    <input className='w-[18px] h-[18px]' type='checkbox' disabled/>
                </span>
                <div className='text-left w-3/4'>
                    <h4>freshly squeezed large ACG juice - 1 litre</h4>
                    <p className='text-sm'>no known allergens 351 kcal</p>
                </div>

                <div className='w-1/4 sm:w-auto flex justify-end it'>
                    <div className=' flex justify-between items-center w-max h-min'>
                        <span>+£17.99</span>
                        <span className='pl-2 sm:hidden'>
                            <input
                                className='w-[18px] h-[18px]'
                                type='checkbox'
                                disabled
                            />
                        </span>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default ReccommendedItem
