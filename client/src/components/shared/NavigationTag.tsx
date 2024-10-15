import { FC } from 'react'

type NavigationTagProps = {
    id: string
    text: string
    active?: boolean
    className?: string
    onClick: ({ id, text }: { id: string, text: string }) => void
}

const NavigationTag: FC<NavigationTagProps> = ({
    id,
    text,
    active,
    className,
    onClick,
}: NavigationTagProps) => {
    return (
        <button
            id={`${id}-tag`} //${id+'-tag'}
            onClick={() => onClick({ id, text })}
            className={
                ` rounded-full px-4 py-0.5 text-sm text-nowrap cursor-pointer focus:focus-ring ` +
                (active
                    ? ` !bg-accent !text-background-primary font-semibold  `
                    : ` bg-background-primary text-accent `) +
                className
            }>
            {text || ''}
        </button>
    )
}

export default NavigationTag
