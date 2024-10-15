import { FC, ReactNode } from 'react'

type SlideViewProps = {
    children?: ReactNode
}

const SlideView: FC<SlideViewProps> = ({ children }: SlideViewProps) => {
    return (
        <div
            className={
                `*:w-full w-full space-y-4 pt-4`
                // `*:w-full space-y-4 pt-4 ` + (view === 'email' ? '' : 'hidden')
            }>
            {children}
        </div>
    )
}

export default SlideView
