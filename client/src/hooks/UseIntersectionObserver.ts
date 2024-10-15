import { useEffect, useRef, useState } from 'react'

const useIntersectionObserver = (options?: IntersectionObserverInit) => {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const ref = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)
        }, options)

        const element = ref.current;

        if (ref.current && element) {
            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [options])

    return [ref, isIntersecting] as const
}

export default useIntersectionObserver

