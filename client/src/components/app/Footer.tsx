import { FC } from 'react'
import FooterNav from './FooterNav'
import { Icon } from '@iconify/react/dist/iconify.js'

const links1 = [
    { title: 'Investors', url: 'Investors' },
    { title: 'About us', url: 'About us' },
    { title: 'Takeaway', url: 'Takeaway' },
    { title: 'More', url: 'More' },
    { title: 'Newsroom', url: 'Newsroom' },
    { title: 'Engineering blog', url: 'Engineering blog' },
    { title: 'Design blog', url: 'Design blog' },
    { title: 'Gift Cards', url: 'Gift Cards' },
    { title: 'Deliveroo Students', url: 'Deliveroo Students' },
    { title: 'Careers', url: 'Careers' },
    { title: 'Restaurant signup', url: 'Restaurant signup' },
    { title: 'Become a rider', url: 'Become a rider' },
]

const links2 = [
    { title: 'Terms and conditions', url: 'Terms and conditions' },
    { title: 'Privacy', url: 'Privacy' },
    { title: 'Cookies', url: 'Cookies' },
    { title: 'Modern Slavery Statement', url: 'Modern Slavery Statement' },
    { title: 'Tax Strategy', url: 'Tax Strategy' },
    { title: 'Section 172 Statement', url: 'Section 172 Statement' },
    { title: 'Public Authority Requests', url: 'Public Authority Requests' },
]

const links3 = [
    { title: 'Contact', url: 'Contact' },
    { title: 'FAQs', url: 'FAQs' },
    { title: 'Cuisines', url: 'Cuisines' },
    { title: 'Brands', url: 'Brands' },
]

const Footer: FC = () => {
    return (
        <div className='bg-foreground-primary text-background-primary py-6 px-4 '>
            <div className='max-w-[1152px] mx-auto'>
            <div className='flex flex-col gap-y-4 sm:gap-y-0 *:w-full md:*:w-1/3 md:*:flex-grow md:flex-row md:flex-wrap md:gap-7 xl:*:w-1/5 xl:gap-5'>
                <FooterNav title='Discover Deliveroo' links={links1} />
                <FooterNav title='Legal' links={links2} />
                <FooterNav title='Help' links={links3} />

                <div className='bg-foreground-secondary/50 py-5 px-6 rounded-sm'>
                    <h4 className='text-lg font-semibold'>
                        Take Deliveroo with you
                    </h4>
                    <div className='space-y-4 py-4'>
                        <span
                            className={`bg-[url('/images/app.svg')] h-[40px] w-[135px] bg-left block`}></span>
                        <span
                            className={`bg-[url('/images/app.svg')] h-[40px] w-[135px] bg-right block`}></span>
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-center pt-4 sm:pt-7'>
                <div className='flex gap-5'>
                    <a href='#' target='_blank' rel='noopener noreferrer'>
                        <Icon
                            icon={'akar-icons:facebook-fill'}
                            width={20}
                            height={20}
                        />
                    </a>
                    <a href='#' target='_blank' rel='noopener noreferrer'>
                        <Icon
                            icon={'akar-icons:twitter-fill'}
                            width={20}
                            height={20}
                        />
                    </a>
                    <a href='#' target='_blank' rel='noopener noreferrer'>
                        <Icon
                            icon={'akar-icons:instagram-fill'}
                            width={20}
                            height={20}
                        />
                    </a>
                </div>

                <div>
                    <p className='text-sm text-foreground-secondary my-auto'>
                        © 2024 Deliveroo
                    </p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Footer
