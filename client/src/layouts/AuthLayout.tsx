import { Outlet } from 'react-router-dom'
import NavBar from '../components/app/NavBar'
import Footer from '../components/app/Footer'

const MainLayout = () => {
    return (
        <div className='width-strict min-h-dvh mx-auto relative'>
            <header className='right-0 left-0 h-14 z-20 bg-background-primary border-b sm:h-[72px] mx-auto'>
                <NavBar searchEnabled={false} className='xl:px-0 max-w-[1120px]'/>
            </header>

            <main className='sm:mt-[72px] max-w-[1120px] mx-auto'>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout
