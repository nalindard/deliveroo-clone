import { Icon } from '@iconify/react/dist/iconify.js'
import { FC } from 'react'
import Button from '../shared/Button'
import { NavLink } from 'react-router-dom'

type SideBarNavProps = {
    showSidebBar: boolean
    loggendIn: boolean
    onClose: () => void
}

const SideBarNav: FC<SideBarNavProps> = ({
    showSidebBar,
    loggendIn,
    onClose,
}: SideBarNavProps) => {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={
                `h-screen w-full md:w-[375px] bg-white absolute top-0 right-0 duration-300 ` +
                (showSidebBar ? 'translate-x-0' : 'translate-x-full')
            }>
            {/* Logo */}
            <div className='flex justify-between items-center pl-4 border-b sm:h-[72px] sm:py-2 sm:pr-0 sm:pl-6'>
                <div className='text-accent flex items-center gap-1'>
                    <Icon icon='simple-icons:deliveroo' height={32} />
                    <span className='font-semibold text-xl font-stratos'>
                        deliveroo
                    </span>
                    {/* <img src="/images/logo.png" alt="" /> */}
                </div>

                <Button onClick={onClose} className='text-accent w-10 h-10 grid place-items-center m-2 p-2 focus:focus-ring rounded'>
                    {/* <Icon icon='icon-park-outline:arrow-left' width={35} /> */}
                    <Icon icon='material-symbols:close' width={24} />
                </Button>
            </div>

            {/* Sign up button */}
            <div className='p-4 bg-background-secondary md:bg-background-primary md:pt-8'>
                <div>
                    <NavLink to='/login'>
                        <Button
                            disabled={loggendIn}
                            className='w-full bg-accent text-background-primary grid place-items-center font-semibold min-h-12 py-3 rounded focus:focus-ring'>
                            <span>Sign up or log in</span>
                        </Button>
                    </NavLink>
                </div>
            </div>

            {/* FAQs */}
            <div className='p-1 pt-6 sm:pt-1 md:pl-3 md:pt-0'>
                <div className='py-3 px-3 md:pt-2 flex justify-between items-center border-t border-b sm:border-t-0 sm:border-b-0 shadow-sm md:shadow-none  focus:focus-ring group'>
                    <span className='text-foreground-secondary/50 w-10'>
                        <Icon icon='octicon:question-16' width={20} />
                    </span>
                    <span className='flex-grow group-hover:text-accent'>
                        FAQs
                    </span>
                    <span className='text-accent md:hidden'>
                        <Icon
                            icon={'ph:caret-right-bold'}
                            width={18}
                            height={18}
                        />
                    </span>
                </div>
            </div>

            {/* Select */}
            <div className='h-full w-full bg-background-secondary md:bg-background-primary flex flex-col justify-between pb-12 sm:pb-11 md:pb-14 md:px-2'>
                <div></div>

                <div className='min-h-40 w-full -translate-y-full p-4'>
                    <div className='pt-4 relative'>
                        <span className='absolute top-4 right-0 bottom-0 aspect-square grid place-items-center text-foreground-secondary/50'>
                            {/* <Icon icon="gg:arrows-scroll-v" /> */}
                            <Icon icon='heroicons-solid:selector' height={20} />
                        </span>
                        <select
                            name='language'
                            id='language'
                            className='px-4 py-3 border border-foreground-primary/10 bg-background-primary w-full appearance-none rounded'>
                            <option value='English'>English</option>
                            <option value='English'>English</option>
                            <option value='English'>English</option>
                        </select>
                    </div>
                    <div className='pt-5 relative'>
                        <span className='absolute top-4 right-0 bottom-0 aspect-square grid place-items-center text-foreground-secondary/50'>
                            {/* <Icon icon="gg:arrows-scroll-v" /> */}
                            <Icon icon='heroicons-solid:selector' height={20} />
                        </span>
                        <select
                            name='country'
                            id='country'
                            className='px-4 py-3 border border-foreground-primary/10 bg-background-primary w-full appearance-none rounded'>
                            <option value='United Kingdom'>
                                United Kingdom
                            </option>
                            <option value='United Kingdom'>
                                United Kingdom
                            </option>
                            <option value='United Kingdom'>
                                United Kingdom
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBarNav
