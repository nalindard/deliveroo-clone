import { FC } from 'react'
import SlideView from './SlideView'
import Button from '../../shared/Button'

const VerifyPhone: FC = () => {
    const disabled = false

    return (
        <SlideView>
            <h4 className='text-lg font-semibold'>Verify your phone number</h4>

            <p>
                Please enter your phone number. We will then send you a 6-digit
                code to verify your number.
            </p>

            <label htmlFor='phone' className='flex flex-col'>
                Email Address
                <input
                    type='tel'
                    name='phone'
                    id='phone'
                    defaultValue={'+44'}
                    className='border border-foreground-secondary/20 shadow-inner py-3 px-4 rounded mt-2 ring-primary '
                />
            </label>
            <p className='text-xs text-foreground-secondary'>
                This site is protected by reCAPTCHA Enterprise and the Google{' '}
                <a href='#' className='side-link'>
                    Privacy Policy
                </a>
                and
                <a href='#' className='side-link'>
                    Terms of Service
                </a>
                apply.
            </p>
            <div className='*:border *:py-3 *:px-8 *:w-full *:text-center *:inline-flex *:justify-center *:items-center  *:h-12 *:text-base *:font-bold space-y-2 *:rounded '>
                <Button
                    className={
                        `bg-accent text-background-primary outline-2 focus-visible:ring-2 ring-accent/50 focus-within:ring-accent/50 ring-0` +
                        (disabled ? '' : '')
                    }
                    disabled={true}>
                    <p className='pl-2 w-full'>Send verification code</p>
                </Button>
            </div>
        </SlideView>
    )
}

export default VerifyPhone
