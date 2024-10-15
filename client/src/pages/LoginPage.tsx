import { FC, useState } from 'react'
// import Model from '../components/app/Model'
import VerifyPhone from '../components/pages/login/VerifyPhone'
import SignUpLogin from '../components/pages/login/SignUpLogin'
import MagicLink from '../components/pages/login/MagicLink'
import EmailLogin from '../components/pages/login/EmailLogin'

type views = 'login' | 'verify-phone' | 'magic-link' | 'login-email'

const LoginPage: FC = () => {
    const [view, setView] = useState<views>('login')

    return (
        <div className='w-full grid place-items-center'>
            <div className='absolute flex top-0'>
                <input
                    type='radio'
                    value={view}
                    checked={view === 'login'}
                    onChange={() => setView('login')}
                />
                <input
                    type='radio'
                    value={view}
                    checked={view === 'verify-phone'}
                    onChange={() => setView('verify-phone')}
                />
                <input
                    type='radio'
                    value={view}
                    checked={view === 'magic-link'}
                    onChange={() => setView('magic-link')}
                />
                <input
                    type='radio'
                    value={view}
                    checked={view === 'login-email'}
                    onChange={() => setView('login-email')}
                />
            </div>

            {/* <Model /> */}

            <div className='xl:w-[432px] max-w-[432px] pb-16 px-4'>
                <div
                    className={
                        `*:w-full space-y-4 pt-4 ` +
                        (view === 'login' ? '' : 'hidden')
                    }>
                    <SignUpLogin />
                </div>

                <div
                    className={
                        `*:w-full space-y-4 pt-4 ` +
                        (view === 'verify-phone' ? '' : 'hidden')
                    }>
                    <VerifyPhone />
                </div>

                <div
                    className={
                        `*:w-full space-y-4 pt-4 ` +
                        (view === 'magic-link' ? '' : 'hidden')
                    }>
                    <MagicLink />
                </div>

                <div
                    className={
                        `*:w-full space-y-4 pt-4 ` +
                        (view === 'login-email' ? '' : 'hidden')
                    }>
                    <EmailLogin />
                </div>
            </div>
        </div>
    )
}

export default LoginPage
