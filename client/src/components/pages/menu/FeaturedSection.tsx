import { FC } from 'react'
import { useInView } from 'react-intersection-observer'

type FeaturedSectionProps = {
    title: string
    id: string
    children: JSX.Element
    layout: 'horizontal' | 'vertical'
    onVisible?: ({ id, view }: { id: string; view: string }) => void
}

const FeaturedSection: FC<FeaturedSectionProps> = ({
    title,
    id,
    children,
    onVisible,
}: FeaturedSectionProps) => {
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '-350px',
    })

    // if (inView) console.log(inView, title)
    if (inView && onVisible) onVisible({ id: id, view: title })

    return (
        <div ref={ref} id={id} className='flex flex-col py-4'>
            <h1 className='text-lg md:text-2xl font-bold'>{title}</h1>
            <div className='py-3'>{children}</div>
        </div>
    )
}

export default FeaturedSection
