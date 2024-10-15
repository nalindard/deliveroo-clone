import { FC } from 'react'

type ButtonProps = {
    children?: JSX.Element
    disabled?: boolean
    className?: string
    // text?: string
    icon?: JSX.Element
    onClick?: () => void
}

const Button: FC<ButtonProps> = ({
    children,
    disabled,
    className,
    // text,
    icon,
    onClick,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={` cursor-pointer flex items-center ` + className + (disabled ? ' !cursor-not-allowed !bg-foreground-secondary/20 !text-foreground-secondary/50': ' focus-visible:[-webkit-box-shadow:0_0_0_2px_#2e3333,0_0_0_4px_#fff] ')}>
            <span>
                {icon}
            </span>
            {children ? children : 'Click Here'}
        </button>
    )
}

export default Button
