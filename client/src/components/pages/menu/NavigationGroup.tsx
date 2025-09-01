import { Icon } from '@iconify/react/dist/iconify.js'
import { FC } from 'react'
import NavigationTag from '../../shared/NavigationTag'


type NavigationGroupProps = {
    // text?: string
    activeId?: string
    navTags: {
        id: string
        text: string
    }[]
    // onNavigationRequest: ({ id, text }: { id: string; text: string }) => void
    onNavigationRequest: ( {id} : {id:string} ) => void
}

const NavigationGroup: FC<NavigationGroupProps> = ({
    // text,
    activeId,
    navTags,
    onNavigationRequest,
}: NavigationGroupProps) => {
    return (
        <div className='w-full overflow-hidden bg-background-primary border-t sm:px-4 md:flex md:items-center xl:px-12 xl:flex xl:justify-between '>
            <ul className='flex px-4 py-7 gap-5  w-full overflow-scroll md:overflow-hidden md:w-4/5'>
                {navTags.map((tag) => {
                    return (
                        <li key={tag.id}>
                            <NavigationTag
                                id={tag.id}
                                text={tag.text}
                                onClick={({ id,  }) => onNavigationRequest({id})}
                                active={activeId === tag.id}
                                key={tag.id}
                            />
                        </li>
                    )
                })}
            </ul>
            <div className='hidden md:block md:w-1/5 relative text-center xl:flex xl:justify-between'>
                <button className='text-accent inline-flex justify-center items-center ml-auto'>
                    More <Icon icon='icon-park-outline:down' />
                </button>
                <div></div>
            </div>
        </div>
    )
}

export default NavigationGroup
