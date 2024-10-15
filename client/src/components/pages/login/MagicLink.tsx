import { FC, useState } from 'react'
import SlideView from './SlideView'
import Button from '../../shared/Button'

const MagicLink: FC = () => {
    const [linkSent, setLinkSent] = useState<boolean>(true)
    const disabled = false

    return linkSent ? (
        <SlideView>
            <h4
                className='text-2xl font-semibold'
                onClick={() => setLinkSent((linkSent) => !linkSent)}>
                Want an easier way to log in ?
            </h4>

            <p>
                Get a magic link sent to your email that will sign you in
                instantly !
            </p>

            <div>
                <img
                    width={180}
                    height={237}
                    className='mx-auto'
                    src='/images/magic-link.png'
                    alt=''
                />
            </div>

            <div className='*:border *:py-3 *:px-8 *:w-full *:text-center *:inline-flex *:justify-center *:items-center  *:h-12 *:text-base space-y-2 *:rounded *:font-light'>
                <Button
                    className={
                        `bg-accent text-background-primary  !font-bold` +
                        (disabled ? '' : '')
                    }
                    disabled={true}>
                    <p className='pl-2 w-full'>Magic Link</p>
                </Button>
                <Button className=' bg-background-primary text-accent'>
                    <p className='pl-2 w-full'>Type password</p>
                </Button>
            </div>
        </SlideView>
    ) : (
        <SlideView>
            <h4
                className='text-2xl font-semibold'
                onClick={() => setLinkSent((linkSent) => !linkSent)}>
                Check your email, including your spam folder.
            </h4>

            <p>We sent a magic link to name@example.com</p>

            <div>
                <img
                    width={264}
                    height={325}
                    className='mx-auto'
                    src='/images/magic-link-sent.png'
                    alt=''
                />
            </div>
        </SlideView>
    )
}

export default MagicLink
