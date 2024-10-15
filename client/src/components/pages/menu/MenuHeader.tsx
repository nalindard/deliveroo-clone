import { FC } from 'react'
import Button from '../../shared/Button'
import HeaderInfoRow from './HeaderInfoRow'
import { Icon } from '@iconify/react'
import { RestaurantDataResponse } from '../../../types'

function formatTimeToHHMM(isoDateString: string): string {
    const date = new Date(isoDateString)

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}.${minutes}`
}

type MenuHeaderProps = {
    restaurentData: RestaurantDataResponse
}

const MenuHeader: FC<MenuHeaderProps> = ({ restaurentData }) => {
    return (
        <div className='bg-background-primary border border-dark relative sm:w-[calc(100%_-_2*16px)] sm:mx-auto sm:border-none xl:px-12'>
            {/* Home Feed Link */}
            <div className='absolute top-2 left-2 z-10 bg-background-primary rounded-full overflow-hidden aspect-square sm:static sm:aspect-auto sm:rounded-none sm:inline-flex sm:items-center'>
                <Button className='text-xs text-accent p-2 focus:focus-ring '>
                    {/* <Icon icon='ep:back' width={20} /> */}
                    <Icon icon='ion:arrow-back' width={22} />
                </Button>
                <p className='hidden sm:block text-accent'>Back</p>
            </div>

            {/* Content */}
            <div className='md:flex md:pt-4 md:pb-6 md:w-[calc(100%_-_2*16px)] md:mx-auto 2xl:w-full 2xl:flex 2xl:justify-between'>
                {/* Header */}
                <div className='relative md:w-1/3 md:rounded overflow-hidden 2xl:w-[30%]'>
                    <img
                        className='w-full md:h-full md:object-cover xl:aspect-video'
                        src={restaurentData?.image || `/images/image.webp`}
                        alt=''
                    />

                    {/* <span className='absolute bottom-2 right-2 text-accent bg-background-primary'>start group chat</span> */}
                    <Button
                        icon={
                            // <Icon icon={'ic:round-chat'} />
                            <Icon icon='ri:group-line' />
                        }
                        className='absolute bottom-4 right-4 text-accent bg-background-primary py-2 px-4 rounded  md:m-4 xl:hidden focus:focus-ring'>
                        <p className='text-foreground-primary pl-2 text-base'>
                            Start group order
                        </p>
                    </Button>
                </div>

                {/* Body */}
                <div className='flex flex-col xl:flex-row 2xl:flex-grow 2xl:h-full 2xl:justify-between'>
                    <div className='flex flex-col py-4 px-3 gap-y-1 2xl:py-0 2xl:pl-6'>
                        <h1 className='text-2.5xl font-stratos font-semibold xl:[font-size:40px] xl:[line-height:48px]'>
                            {/* Tossed - St Martin's Lane */}
                            {restaurentData?.name || 'Name Not Found'}
                        </h1>
                        <h4 className='flex items-center'>
                            {/* Chicken . Salads . Healthy */}
                            {restaurentData?.titleTags
                                .split(',')
                                .map((tag, index, array) => (
                                    <span
                                        key={index}
                                        className='flex items-center'>
                                        <p className='first-letter:uppercase lowercase'>
                                            {tag.trim()}
                                        </p>
                                        {index < array.length - 1 && (
                                            <span className='flex items-center px-1'>
                                                ·
                                            </span>
                                        )}
                                    </span>
                                ))}
                        </h4>

                        <p className=' text-foreground-secondary'>
                            {restaurentData?.away || 'NA'} miles away
                            <span className='px-0.5'>·</span>
                            Opens at <span> </span>
                            {formatTimeToHHMM(restaurentData?.opensAt) || 'NA'}
                            <span className='px-0.5'>·</span>£
                            {restaurentData?.minimumInCents / 100 || 'NA'}
                            <span> </span>
                            minimum <span className='px-0.5'>·</span> £
                            {restaurentData?.deliveryFeesInCents / 100 || 'NA'}
                            <span> </span>delivery
                        </p>

                        <HeaderInfoRow
                            title='Info'
                            subtitle='Maps, allegence and hygiens rating'
                            leadingIcon={
                                <Icon
                                    icon='material-symbols:info-outline'
                                    height={25}
                                />
                            }
                            endIcon={
                                // <Icon icon="uiw:right" height={25}/>
                                <Icon icon='mingcute:right-line' height={25} />
                            }
                        />
                        <HeaderInfoRow
                            title={`${ restaurentData?.RestaurentReviews
                                ?.averageRating &&
                                restaurentData?.RestaurentReviews
                                    ?.averageRating.substring(0, 3) || 'NA'
                            } Excellent`}
                            subtitle={`See all ${
                                restaurentData?.RestaurentReviews
                                    ?.totalReviews || 'NA'
                            } reviews`}
                            varient='success'
                            leadingIcon={
                                <Icon
                                    icon='material-symbols:star'
                                    height={25}
                                />
                            }
                            endIcon={
                                // <Icon icon="uiw:right" height={25}/>
                                <Icon icon='mingcute:right-line' height={25} />
                            }
                        />
                        {/* <HeaderInfoRow
                            leadingIcon={
                                <img
                                    src={'/images/bike.svg'}
                                    className='w-6 h-6'
                                    alt=''
                                />
                            }
                            title='Deliver in 10 - 20 min'
                            endText='Change'
                        /> */}
                    </div>

                    <div className='px-3 flex flex-col xl:items-end xl:pt-4 gap-y-1'>
                        <HeaderInfoRow
                            leadingIcon={
                                <img
                                    src={'/images/bike.svg'}
                                    className='w-6 h-6'
                                    alt=''
                                />
                            }
                            title='Deliver in 10 - 20 min'
                            endText='Change'
                        />

                        <div className='hidden xl:block'>
                            <Button
                                icon={
                                    // <Icon icon={'ic:round-chat'} />
                                    <Icon icon='ri:group-line' />
                                }
                                className='border max-w-max text-accent bg-background-primary py-2 px-4 rounded focus:focus-ring'>
                                <p className='text-foreground-primary pl-2 text-base'>
                                    Start group order
                                </p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuHeader
