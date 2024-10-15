import { FC, useState } from 'react'
import Button from '../shared/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import useViewPortSize from '../../hooks/ViewPortSize'
import { createPortal } from 'react-dom'
import useAuth from '../../hooks/UseAuth'
import SideBarNav from './SideBarNav'
import { NavLink } from 'react-router-dom'

type NavBarProps = {
    searchEnabled?: boolean
    className?: string
}

const NavBar: FC<NavBarProps> = ({
    searchEnabled = true,
    className,
}: NavBarProps) => {
    const viewPortSize = useViewPortSize()
    const [showSidebBar, setShowSidebBar] = useState(false)
    const [showBackdrop, setShowBackdrop] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const loggendIn = useAuth()

    const toogleSideBar = (trigger: boolean) => {
        setShowSidebBar(trigger)
        setShowBackdrop(trigger)
    }

    const toogleSearch = (trigger: boolean) => {
        setShowSearch(trigger)
        setShowBackdrop(trigger)
    }

    const toogleBackdrop = (trigger: boolean) => {
        toogleSideBar(trigger)
        toogleSearch(trigger)
    }

    return (
        <nav
            className={
                `flex justify-between items-center h-14 px-3.5 py-3 sm:h-[72px] md:w-[calc(100%_-_2*16px)] md:mx-auto md:px-0 md:pl-2 width-strict xl:px-12 ` +
                (className || '')
            }>
            <div className='text-accent flex items-center gap-1'>
                <Icon icon='simple-icons:deliveroo' height={32} />
                <span className='font-semibold text-xl font-stratos'>
                    deliveroo
                </span>
                {/* <img src="/images/logo.png" alt="" /> */}
            </div>
            {JSON.stringify(viewPortSize)}

            {/* Search */}
            <div
                className={
                    `text-accent flex-grow px-7 ` +
                    (searchEnabled ? '  ' : ' hidden invisible opacity-0 ')
                }>
                <Button
                    onClick={() => toogleSearch(true)}
                    className='border p-2 rounded-lg sm:h-[40px] sm:w-[51.2px] sm:grid sm:place-items-center lg:hidden focus:focus-ring'>
                    <Icon icon='ri:search-line' width={16} />
                </Button>

                <div className='hidden lg:max-w-[650px] py-4 lg:flex lg:items-center'>
                    <div
                        id='search'
                        className='border h-2/5 lg:w-full rounded inline-flex justify-start items-center px-2 ring-primary '>
                        <Icon
                            icon='ri:search-line'
                            width={35}
                            className='text-foreground-secondary/50 p-2'
                        />
                        <input
                            type='text'
                            placeholder="Search Tossed - St Martin's Lane"
                            className='placeholder-foreground-secondary/50 p-2 pl-0 w-full focus:outline-none'
                            // onClick={() => toogleSearch(true)}
                        />
                    </div>
                </div>
            </div>

            <div className='flex items-end justify-end gap-2 text-accent px-7 md:px-0'>
                {/* <Button className='border p-2 rounded-lg'> */}
                {/* <Icon icon='ph:house-light' width={16} /> */}
                {/* </Button> */}
                <NavLink to='/login'>
                    <Button
                        disabled={loggendIn}
                        className='border p-2 rounded-lg hidden sm lg:inline-flex focus:focus-ring'
                        // onClick={() => setShowSidebBar(true)}>
                        onClick={() => toogleSideBar(true)}>
                        <>
                            {/* <Icon icon='hugeicons:user' width={16} /> */}
                            <Icon icon='lucide:house' width={16} />
                            <p className='hidden sm:block text-foreground-primary sm:px-2 text-nowrap'>
                                Sign up or log in
                            </p>
                        </>
                    </Button>
                </NavLink>
                <Button
                    className='border p-2 rounded-lg focus:focus-ring'
                    // onClick={() => setShowSidebBar(true)}>
                    onClick={() => toogleSideBar(true)}>
                    <>
                        {/* <Icon icon='hugeicons:user' width={16} /> */}
                        <Icon icon='uil:user' width={16} />
                        <p className='hidden sm:block text-foreground-primary sm:px-2'>
                            Account
                        </p>
                    </>
                </Button>
                {/* <button
                    className='z-[1000000] bg-white'
                    onClick={() => setShowSidebBar(true)}>
                    show model
                </button> */}
            </div>

            {createPortal(
                <div
                    // onClick={() => {toogleSideBar(false); toogleSearch(false);}}
                    onClick={() => toogleBackdrop(false)}
                    className={
                        `fixed top-0 left-0 w-screen h-screen bg-black z-[1000] duration-300 ` +
                        (showBackdrop
                            ? 'bg-opacity-50 visible pointer-events-auto'
                            : 'bg-opacity-10 invisible pointer-events-none')
                    }>
                    {/* <button
                        className='z-[1000000] bg-white pointer-events-auto'
                        onClick={() => setShowSidebBar(!true)}>
                        close model
                    </button> */}

                    {/* <DishDetails className={(showSidebBar ? '!scale-100 duration-300 delay-300' : '!scale-90 invisible')} /> */}

                    {/* Search */}
                    <div className='m-8 grid place-items-center absolute top-0 right-0 h-screen w-screen'>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={
                                ` w-full max-w-[560px] max-h[calc(100%-64px)] bg-white min-h-32 duration-300 ` +
                                (showSearch
                                    ? 'visible scale-100'
                                    : 'invisible scale-90')
                            }>
                            <div className='flex items-center py-1 px-4'>
                                <span className='!text-accent fill-accent'>
                                    <Icon
                                        icon='icon-park-outline:arrow-left'
                                        width={35}
                                        className='text-accent p-1'
                                    />
                                    {/* <Icon icon="octicon:arrow-left-24" /> */}
                                </span>
                                <span className='py-3 px-4'>
                                    <input
                                        type='text'
                                        placeholder="Search Tossed - St Martin's Lane"
                                        className='placeholder-foreground-secondary/50  w-full focus:outline-none'
                                    />
                                </span>
                            </div>
                            <div></div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <SideBarNav
                        loggendIn={loggendIn}
                        showSidebBar={showSidebBar}
                        onClose={() => toogleSideBar(false)}
                    />
                </div>,
                document.getElementById('drawer-left') as HTMLElement
            )}
        </nav>
    )
}

export default NavBar
