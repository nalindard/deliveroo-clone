import { Outlet } from 'react-router-dom'
import NavBar from '../components/app/NavBar'
import Footer from '../components/app/Footer'

const MainLayout = () => {
    return (
        <div className='width-strict min-h-dvh mx-auto relative'>
            <header className='fixed top-0 right-0 left-0 h-14 z-20 bg-background-primary border-b sm:h-[72px]'>
                <NavBar />
            </header>

            <main className='mt-14  sm:mt-[72px] bg-background-secondary'>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout
