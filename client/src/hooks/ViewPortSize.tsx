import { useState, useEffect } from 'react'
// import viewport from '../../constants/viewport'

type ViewPortSize = {
    xs: boolean
    sm: boolean
    md: boolean
    lg: boolean
    xl: boolean
    '2xl': boolean
}

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const useViewPortSize = (): Size  => {
    const [ViewPortSize, setViewPortSize] = useState<ViewPortSize>({
        xs: true,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        '2xl': false,
    })

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth

            setViewPortSize({
                xs: width < 539,
                sm: width >= 539 && width < 540,
                md: width >= 540 && width < 768,
                lg: width >= 768 && width < 960,
                xl: width >= 960 && width < 1280,
                '2xl': width >= 1280,
            })
            // setViewPortSize({
            //     xs: width < viewport.xs,
            //     sm: width >= viewport.xs && width < viewport.sm,
            //     md: width >= viewport.sm && width < viewport.md,
            //     lg: width >= viewport.md && width < viewport.lg,
            //     xl: width >= viewport.lg && width < viewport.xl,
            //     '2xl': width >= viewport['2xl'],
            // })
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return Object.entries(ViewPortSize).filter(([, currentSize]) => currentSize)[0][0] as Size
}

export default useViewPortSize
