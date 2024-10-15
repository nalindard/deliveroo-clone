import { FC, useState } from 'react'
import SlideView from './SlideView'
import Button from '../../shared/Button'
import fetchData from '../../../api/FetchData'

const EmailLogin: FC = () => {
    const [disabledContinue, setDisabledContinue] = useState(true)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [processing, setProcessing] = useState(false)


    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        if (email.length > 0) {
            setDisabledContinue(!true)
        } else {
            setDisabledContinue(!false)
        }
    }

    const handleContinue = async () => {
        setProcessing(true)
        console.log('email', email, 'password', password)
        const { data, error }: { data?: unknown; error: unknown } =
            await fetchData('auth/login', {
                method: 'POST',
                body: {
                    email: email,
                    password: password,
                },
            })

        console.log({ data, error })

        if (error) {
            console.log(error)
        } else {
            // @ts-expect-error property 'accessToken' does not exist on type 'unknown'
            localStorage.setItem('accessToken', data?.accessToken)
            // @ts-expect-error property 'accessToken' does not exist on type 'unknown'
            localStorage.setItem('refreshToken', data?.refreshToken)
        }
        setProcessing(false)
    }

    return (
        <SlideView>
            <h2 className='text-2xl font-semibold '>Log in with email</h2>
            <div className=''>
                <label htmlFor='email' className='flex flex-col'>
                    Email Address
                    <input
                        value={email}
                        onChange={handleEmailInput}
                        type='email'
                        name='email'
                        id='email'
                        placeholder='e.g. name@example.com'
                        className='border border-foreground-secondary/20 shadow-inner py-3 px-4 rounded mt-2'
                    />
                </label>
                <label htmlFor='email' className='flex flex-col'>
                    Password
                    <input
                        value={password}
                        onChange={handlePasswordInput}
                        type='password'
                        name='password'
                        id='password'
                        className='border border-foreground-secondary/20 shadow-inner py-3 px-4 rounded mt-2'
                    />
                </label>
            </div>
            <div className='*:border *:py-3 *:px-8 *:w-full *:text-center *:inline-flex *:justify-center *:items-center  *:h-12 *:text-base space-y-2 *:rounded *:font-light'>
                <Button
                    onClick={handleContinue}
                    className={
                        `bg-accent text-background-primary !font-bold ` +
                        (disabledContinue || processing ? '' : '')
                    }
                    disabled={disabledContinue || processing}>
                    <p className='pl-2 w-full'>Login</p>
                </Button>
                <Button className=' bg-background-primary text-accent'>
                    <p className='pl-2 w-full'>Forgot password?</p>
                </Button>
            </div>
        </SlideView>
    )
}

export default EmailLogin
