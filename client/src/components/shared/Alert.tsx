import { Icon } from '@iconify/react/dist/iconify.js'
import { FC } from 'react'

type AlertProps = {
    message?: string
    variant: 'success' | 'error' | 'warning' | 'info'
    className?: string
}

const varients = {
    success: { bgColor: 'bg-success-light', defaultMessage: 'success', icon: 'ep:success-filled' },
    warning: { bgColor: 'bg-yellow-600', defaultMessage: 'warning', icon: 'ep:warn-triangle-filled' },
    info: { bgColor: 'bg-blue-600', defaultMessage: 'info', icon: 'material-symbols:info' },
    error: { bgColor: 'bg-red-600', defaultMessage: 'error', icon: 'fluent-mdl2:status-error-full' },
}

const Alert: FC<AlertProps> = ({ message, variant, className }: AlertProps) => {
    return (
        <div className={`rounded ${varients[variant].bgColor} text-background-primary ` + className}>
            <div className='flex p-4'>
                <span className='pr-4'>
                    <Icon icon={varients[variant].icon} width={24} height={24} />
                </span>
                <span className='flex-grow font-semibold'>{message || varients[variant].defaultMessage}</span>
            </div>
        </div>
    )
}

export default Alert
