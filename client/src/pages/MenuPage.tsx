import { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import MenuHeader from '../components/pages/menu/MenuHeader'
import NavigationGroup from '../components/pages/menu/NavigationGroup'
import Carousel2 from '../components/shared/Carousel2'
import FeaturedSection from '../components/pages/menu/FeaturedSection'
import DishCard from '../components/shared/DishCard'
import Basket from '../components/shared/Basket'
import { createPortal } from 'react-dom'
import DishDetails from '../components/shared/DishDetails'
import { RestaurantDataResponse } from '../types'
// import { useInView } from 'react-intersection-observer'

type IFeaturedSection = {
    id: string
    text: string
}

// type MenuPageParams = {
//     city: string
//     area: string
//     restaurant: string
// }

const MenuPage: FC = () => {
    const [viewingSection, setViewingSection] = useState<string | null>()
    const [isNavigating, setIsNavigating] = useState<boolean>(false)
    const [showModal, setShowModal] = useState(false)
    // const { restaurant } = useParams<MenuPageParams>()

    const actionData = useLoaderData() as RestaurantDataResponse // Access the loaded data

    const z: IFeaturedSection[] = actionData?.Categories.map(
        (item) => item.name
    ).map((item) => ({ id: item.toLowerCase().replace(' ', '-'), text: item }))

    const [featuredSections] = useState<IFeaturedSection[]>(z)
    const [featuredDishId, setFeaturedDishId] = useState<string>('')

    const updateViewingSection = ({ id }: { id: string }) => {
        setIsNavigating(true)
        setViewingSection(id)

        const element = document.getElementById(id)
        if (element) {
            const topPosition =
                element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                top: topPosition - 150, // Scroll to 150px above the element
                behavior: 'smooth',
            })
        }
        setTimeout(() => {
            setIsNavigating(false)
        }, 500)
    }

    const handleVisibilityChange = (id: string) => {
        if (!isNavigating) {
            setViewingSection(id)
        }
    }

    // useEffect(() => {
    //     if (showModal) {
    //         document.body.classList.add('overflow-hidden')
    //     } else {
    //         document.body.classList.remove('overflow-hidden')
    //     }
    // }, [showModal])

    const handleMeunClick = (id: string) => {
        // alert(id)
        setFeaturedDishId(id)
        setShowModal(!showModal)
    }

    document.title = `${
        actionData?.name
    } delivery from ${actionData?.area.replace(
        /-/g,
        ' '
    )} - Order with Fake Deliveroo`

    return (
        <div className={ showModal ? '  ' : ''}>
            {/* <div className='xl:[width:calc(100%_-_2_*_64px)] mx-auto'> */}
            <div>
                <MenuHeader restaurentData={actionData} />
            </div>

            <div className='sticky top-14 sm:top-[71px] z-50 shadow'>
                <NavigationGroup
                    navTags={featuredSections}
                    activeId={viewingSection as string}
                    onNavigationRequest={updateViewingSection}
                />
            </div>

            {/* <div className='fixed top-0 left-0 w-screen h-screen bg-black z-[1000]'></div> */}

            <div className='relative xl:flex sm:px-4 xl:px-12 '>
                <main className='bg-background-secondary pt-7 px-3 sm:w-[calc(100%_-_2*16px)] sm:mx-auto sm:bg-background-primary xl:bg-background-secondary lg xl:relative xl:w-[60%] 2xl:w-[68%] min-h-screen'>
                    {/* <div className='xl:w-1/2'> */}

                    <p className='text-sm text-foreground-secondary'>
                        Adults need around 2000 kcal a day
                    </p>

                    <FeaturedSection
                        title='Popular with other people'
                        id='popular-with-other-people'
                        layout='horizontal'
                        onVisible={({ id }) => handleVisibilityChange(id)}>
                        <Carousel2>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                                (i) => (
                                    <DishCard
                                        key={i}
                                        id='1'
                                        name='Parmesan Chicken Salad'
                                        price='£69.99'
                                        // desc='A feast for 6 people! halloumi with pesto, roasted peppers, roasted tomatoes, sweet potato, pickled red onion and balsamic dressing served on a mixed leaf base.'
                                        // highlight='Popular'
                                        kcal='325 kcal'
                                        layout='vertical'
                                        image='/images/image-dish.webp'
                                    />
                                )
                            )}
                        </Carousel2>
                    </FeaturedSection>

                    {/* {featuredSections.map(({ id, text }) => { */}
                    {actionData?.Categories.map(({ name, Dishes }) => {
                        return (
                            <FeaturedSection
                                title={name}
                                id={name.toLowerCase().replace(' ', '-')}
                                key={name}
                                layout='horizontal'
                                onVisible={({ id }) =>
                                    handleVisibilityChange(id)
                                }>
                                <div
                                    className='space-y-0.5 2xl:*:w-1/3 2xl:gap-4 2xl:flex 2xl:flex-wrap 2xl:*:flex-grow'
                                    // ref={ref}
                                >
                                    {/* {Array.from({ length: 10 },(_, i) => i + 1).map((i) => ( */}
                                    {Dishes.map((dish) => (
                                        <DishCard
                                            key={dish.id}
                                            id={dish.id}
                                            name={dish.name}
                                            price={
                                                `£` +
                                                String(dish.priceInCents / 100)
                                            }
                                            desc={dish.description}
                                            highlight={
                                                Math.random() < 0.8
                                                    ? ''
                                                    : dish.highlight
                                            }
                                            cal={dish.calories}
                                            layout='horizontal'
                                            image={dish.image}
                                            // image='/images/image-dish.webp'
                                            disabled={!dish.isAvaliable}
                                            className='2xl:max-w-[50%]'
                                            // onClick={() => setShowModal(true)}
                                            onClick={handleMeunClick}
                                        />
                                    ))}
                                    {/* )) */}
                                    {/* <Counter /> */}
                                </div>
                            </FeaturedSection>
                        )
                    })}
                </main>

                <aside className='hidden xl:block flex-grow h-screen pt-7 pl-5 bg-background-secondary sticky top-[calc(72px_+_80px)] 2xl:!w-[29%] 2xl:!max-w-[32%]'>
                    <Basket restaurantId={actionData?.id} />
                </aside>
            </div>

            {createPortal(
                <div
                    onClick={() => setShowModal(!true)}
                    className={
                        `fixed top-0 left-0 w-screen h-screen bg-black z-[1000] duration-300 ` +
                        (showModal
                            ? 'bg-opacity-50 visible pointer-events-auto'
                            : 'bg-opacity-10 invisible pointer-events-none')
                    }>
                    {/* <button
                        className='z-[1000000] bg-white pointer-events-auto'
                        onClick={() => setShowModal(!true)}>
                        close model
                    </button> */}

                    <DishDetails
                        dishId={featuredDishId}
                        onClose={() => setShowModal(!showModal)}
                        visible={showModal}
                        className={
                            showModal
                                ? '!scale-100 duration-300 delay-300'
                                : '!scale-90 invisible'
                        }
                    />
                </div>,
                document.getElementById('model') as HTMLElement
            )}
        </div>
    )
}

export default MenuPage
