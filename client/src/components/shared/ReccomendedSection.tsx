import React from 'react'
import { FC } from 'react'

type ReccommendedSectionProps = {
    title: string
    children: React.ReactNode[]
}

const ReccommendedSection: FC<ReccommendedSectionProps> = ({
    title,
    children,
}: ReccommendedSectionProps) => {
    return (
        <div className='pt-6'>
            <h4 className='[font-size:16px] [line-height:22px] font-semibold'>
                {title || 'add a 1 litre juice?'}
            </h4>

            {React.Children.map(children, (child, index) => (
                <div key={index}>
                    {child}
                </div>
            ))}

            {/* <div className='pt-4 text-foreground-secondary/50'>
                <button className='w-full flex justify-between'>
                    <div className='text-left w-3/4'>
                        <h4>freshly squeezed large ACG juice - 1 litre</h4>
                        <p className='text-sm'>no known allergens 351 kcal</p>
                    </div>

                    <div className='w-1/4 flex'>
                        <span>+£17.99</span>

                        <span className='pl-1'>
                            <input type='checkbox' />
                        </span>
                    </div>
                </button>
            </div> */}
        </div>
    )
}

export default ReccommendedSection
