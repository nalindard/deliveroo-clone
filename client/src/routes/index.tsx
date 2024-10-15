import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ErrorPage from '../pages/ErrorPage'
import MenuPage from '../pages/MenuPage'
import LoginPage from '../pages/LoginPage'
import PasswordResetPage from '../pages/PasswordResetPage'
import MenuLoader from '../actions/MenuAction'
import RouteGuard from '../components/guards/RouteGuard'


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: 'menu/:city/:area/:restaurant',
                element: <MenuPage />,
                errorElement: <ErrorPage />,
                loader: MenuLoader,
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
            // {
            //     path: 'login',
            //     element: <LoginPage />,
            // },
            // {
            //     path: 'password_reset',
            //     element: <PasswordResetPage />,
            // },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'login',
                element: (<RouteGuard inverse={true}> <LoginPage /></RouteGuard>),
            },
            {
                path: 'password_reset', 
                element: <RouteGuard inverse={true}> <PasswordResetPage /></RouteGuard>,
            }
        ],
    }
])

export default router
