import { FC, useState } from 'react'
import SlideView from './SlideView'
import Button from '../../shared/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import fetchData from '../../../api/FetchData'
import useAuth from '../../../hooks/UseAuth'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleOAuthDataResponse } from '../../../types'
import { useDispatch } from 'react-redux'
import { syncUser } from '../../../store/auth/authActions'

const SignUpLogin: FC = () => {
    const [viewEmail, setViewEmail] = useState<boolean>(false)
    const [disabledContinue, setDisabledContinue] = useState(true)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [processing, setProcessing] = useState(false)

    const loggendIn = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const handleSuccess = (googleUser: unknown) => {
    //     console.log('Google User:', googleUser)
    // }
    // window.handleSuccess = handleSuccess

    // useEffect(() => {
    //     // @ts-expect-error google apis are not typed, loaded from a cdn
    //     window.google.accounts.id.initialize({
    //         client_id: '',
    //         callback: handleSuccess
    //     })
    // }, [])

    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => console.log(codeResponse),
    //     flow: 'auth-code',
    // })
    const login = useGoogleLogin({
        onSuccess: async ({ access_token, expires_in, scope, token_type }) => {
            console.log(access_token, expires_in, scope, token_type)
            const { ok, data, error } = (await fetchData('auth/oauth/google', {
                method: 'POST',
                body: {
                    access_token,
                    expires_in,
                    scope,
                    token_type,
                },
            })) as GoogleOAuthDataResponse

            console.log({ ok, data, error })

            if (error) {
                console.log(error)
            } else {
                localStorage.setItem('accessToken', data?.accessToken)
                localStorage.setItem('refreshToken', data?.refreshToken)
                syncUser()(dispatch)
                navigate('/')
            }

            // async function getGoogleUserData(access_token: string) {
            //     try {
            //         const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
            //             method: 'GET',
            //             headers: {
            //                 Authorization: `Bearer ${access_token}`,
            //             },
            //         });
            //         const data = await response.json();
            //         console.log(data);

            //         return data;
            //     } catch (error) {
            //         throw new Error('Failed to fetch user info: ' + error);
            //     }
            // }
            // await getGoogleUserData(access_token)
        },
        onError: (error) => alert(error),
        scope: 'openid email profile',
    })

    if (loggendIn) {
        return (
            <Navigate to='/menu/london/covent-garden/tossed-st-martins-lane-new/' />
        )
    }

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

    const handleEmailView = () => {
        setViewEmail((viewEmail) => !viewEmail)
    }

    const handleContinue = async () => {
        setProcessing(true)
        console.log('email', email, 'password', password)
        const { data, error }: { data?: unknown; error: unknown } =
            await fetchData('auth', {
                method: 'POST',
                body: {
                    email: email,
                    password: password,
                    name: `test-${email.split('@')[0]}`,
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
            syncUser()(dispatch)
            navigate(-1)
        }
        setProcessing(false)

        return
    }

    // const handleGoogle = async () => {
    //     // @ts-expect-error Cannot find name 'google'. (google apis are not typed, loaded from a cdn)
    //     google.accounts.id.prompt()
    //     console.log('Google')
    // }

    return !viewEmail ? (
        <SlideView>
            <h2
                className='text-2xl font-semibold '
                // onClick={() => setViewEmail((viewEmail) => !viewEmail)}
            >
                Sign up or log in
            </h2>
            <div className='text-center'>
                <div className='*:border *:border-foreground-secondary *:py-3 *:px-8 *:w-full *:text-center *:inline-flex *:justify-center *:items-center *:h-12 *:text-base *:font-bold space-y-4 *:rounded'>
                    <Button
                        className='bg-[#4c69ba] text-background-primary focus:[box-shadow:0_0_0_3px_#4c69ba4d] focus:duration-200 !border-0'
                        icon={<Icon icon='ic:outline-facebook' width={24} />}>
                        <p className='pl-2'>Continue with Facebook</p>
                    </Button>
                    <Button
                        // onClick={handleGoogle}
                        onClick={() => login()}
                        className=' focus:[box-shadow:0_0_0_3px_#7f7f7f4d] focus:duration-200 !border-foreground-secondary/50 '
                        icon={<Icon icon='devicon:google' width={24} />}>
                        <p className='pl-2'>Continue with Google</p>
                    </Button>
                    <Button
                        className='bg-[#191919] text-background-primary focus:[box-shadow:0_0_0_3px_#7f7f7f4d] focus:duration-200'
                        icon={<Icon icon='ic:outline-apple' width={24} />}>
                        <p className='pl-2'>Continue with Apple</p>
                    </Button>
                </div>

                <div className='py-7 relative'>
                    <hr className=' absolute top-1/2 -translate-y-1/2 border-foreground-secondary/20 w-full' />
                    <p className=' absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-background-primary p-2.5'>
                        or
                    </p>
                </div>

                <div className='pt- *:border *:py-3 *:px-8 *:w-full *:text-center *:inline-flex *:justify-center *:items-center  *:h-12 *:text-base *:font-bold space-y-4 *:rounded'>
                    <Button
                        onClick={handleEmailView}
                        className=' bg-accent text-background-primary focus:focus-ring'
                        icon={<Icon icon='mdi:email-outline' width={24} />}>
                        <p className='pl-2'>Continue with email</p>
                    </Button>
                </div>
            </div>
            <p className='pt-2 text-sm text-foreground-secondary'>
                By continuing you agree to our{' '}
                <a href='#' className='side-link underline'>
                    T&Cs
                </a>
                . Please also check out our{' '}
                <a href='#' className='side-link underline'>
                    Privacy Policy
                </a>
                . We use your data to offer you a personalised experience and to
                better understand and improve our services.{' '}
                <a href='#' className='side-link underline'>
                    For more information see here
                </a>
                .
            </p>
        </SlideView>
    ) : (
        <SlideView>
            <h2
                className='text-2xl font-semibold '
                // onClick={() => setViewEmail((viewEmail) => !viewEmail)}
            >
                Sign up or log in
            </h2>
            <div className=''>
                <label htmlFor='email' className='flex flex-col'>
                    Email Address
                    <input
                        value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        onChange={handleEmailInput}
                        // disabled={processing}
                        type='email'
                        name='email'
                        id='email'
                        placeholder='e.g. name@example.com'
                        className='border border-foreground-secondary/20 shadow-inner py-3 px-4 rounded mt-2 ring-primary'
                    />
                </label>
                <label htmlFor='email' className='flex flex-col'>
                    Password
                    <input
                        value={password}
                        onChange={handlePasswordInput}
                        // disabled={processing}
                        type='password'
                        name='password'
                        id='password'
                        className='border border-foreground-secondary/20 shadow-inner py-3 px-4 rounded mt-2 ring-primary'
                    />
                </label>
                {/* <label htmlFor='email' className='flex flex-col'>
                    Repeat Password
                    <input
                        type='password'
                        name='password'
                        id='password'
                        className='border border-foreground-secondary/20 shadow-inner py-3 px-4 rounded mt-2 ring-primary'
                    />
                </label> */}
            </div>
            <div className='*:border *:py-3 *:px-8 *:w-full *:text-center *:inline-flex *:justify-center *:items-center  *:h-12 *:text-base space-y-2 *:rounded *:font-light'>
                <Button
                    onClick={handleContinue}
                    className={
                        `bg-accent text-background-primary !font-bold ` +
                        (disabledContinue || processing ? '' : '')
                    }
                    // disabled={disabledContinue || processing}
                >
                    <p className='pl-2 w-full'>Continue</p>
                </Button>
                <NavLink to='/password_reset'>
                    <Button className=' bg-background-primary text-accent'>
                        <p className='pl-2 w-full'>Forgot password?</p>
                    </Button>
                </NavLink>
            </div>
        </SlideView>
    )
}

export default SignUpLogin
