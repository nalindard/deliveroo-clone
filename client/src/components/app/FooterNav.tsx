import { FC } from 'react'

type FooterNavProps = {
    title: string
    links: { title: string; url: string }[]
}

const FooterNav: FC<FooterNavProps> = ({ title, links }: FooterNavProps) => {
    return (
        <div className='bg-foreground-secondary/50 py-5 px-6 rounded-sm'>
            <h4 className='text-lg font-semibold'>{title || 'Nav Title'}</h4>
            <ul className='*:font-light space-y-4 xl:space-y-2 mt-4 text-sm'>
                {links.map((link) => (
                    <li key={link.title}>{link.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default FooterNav
