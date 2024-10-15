import { FC } from 'react'

type HeaderInfoRowProps = {
    leadingIcon?: JSX.Element
    title: string
    subtitle?: string
    endIcon?: JSX.Element
    endText?: string
    varient?: 'base' | 'success' | 'warning' | 'info' | 'error'
}

const colorClasses = {
    base: 'text-foreground-secondary',
    success: 'text-success',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    error: 'text-red-600',
}

const HeaderInfoRow: FC<HeaderInfoRowProps> = ({
    leadingIcon,
    title,
    subtitle,
    endIcon,
    endText,
    varient = 'base', // Default to 'base' if not provided
}: HeaderInfoRowProps) => {
    const textColorClass = colorClasses[varient]

    return (
        <button className='!appearance-none  text-left focus:focus-ring rounded w-max'>
            <div className='flex flex-row gap-4 justify-between md:justify-normal items-center py-1.5 px-1'>
                <div
                    className={
                        'h-full aspect-square w-1/12 grid place-items-center ' +
                        textColorClass
                    }>
                    {leadingIcon}
                </div>
                <div className=' flex-grow md:flex-grow-0 text-nowrap'>
                    <h5 className={textColorClass}>{title}</h5>
                    <p className=' text-sm text-foreground-secondary'>
                        {subtitle}
                    </p>
                </div>
                <div className='text-accent'> {endIcon || endText || '>'} </div>
            </div>
        </button>
    )
}

export default HeaderInfoRow
