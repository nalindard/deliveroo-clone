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
        </div>
    )
}

export default ReccommendedSection
