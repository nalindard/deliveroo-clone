import { FC, useState } from 'react'
import Button from '../components/shared/Button'
import Alert from '../components/shared/Alert'
// import Counter from '../components/shared/Counter'

const PasswordResetPage: FC = () => {
    const disabled = false
    const [sent, setSent] = useState<boolean>(false)

    return (
        <div className='w-full grid place-items-center'>

            {/* <Counter /> */}

            <div
                className={
                    `pb-16 px-4 max-w-[432px] ` + (sent ? ' w-[480px]  ' : ' xl:w-[432px] ')
                }>
                <h4 className='text-2xl font-semibold w-full'>
                    Reset your password
                </h4>

                <div className='*:w-full space-y-4 pt-7 w-full'>
                    <p>
                        To reset your password, we need to send you an email.{' '}
                    </p>

                    <div className={`  ` + (sent ? '' : 'hidden')}>
                        <Alert
                            variant='success'
                            message={`Password reset e-mail sent to 'email@example.com'.
                            Remember to check your spam folder.`}
                            className=''
                        />
                    </div>

                    <label htmlFor='email' className='flex flex-col'>
                        Email address
                        <input
                            type='email'
                            name='email'
                            id='email'
                            // placeholder='e.g. name@example.com'
                            className='border border-foreground-secondary/20 shadow-inner py-3 px-4 rounded mt-2 ring-primary'
                        />
                    </label>
                    <div className='*:border *:py-3 *:px-8 *:w-full *:text-center *:inline-flex *:justify-center *:items-center  *:h-12 *:text-base space-y-2 *:rounded *:font-light w-full'>
                        <Button
                            className={
                                `bg-accent text-background-primary !font-bold w-full focus:focus-ring ` +
                                (disabled ? '' : '')
                            }
                            onClick={() => setSent((sent) => !sent)}
                            disabled={disabled}
                            >
                            <p className='pl-2 w-full'>Continue</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordResetPage
