

import { LoaderFunctionArgs } from 'react-router-dom'
import fetchData from '../api/FetchData'
import { RestaurantDataResponse } from '../types'

const MenuLoader = async ({ params, request }: LoaderFunctionArgs): Promise<RestaurantDataResponse> => {
    const { restaurant, area, city } = params as {
        restaurant?: string
        area?: string
        city?: string
    } // Access route params

    const data = await fetchData(`restaurants/${restaurant}`, { cache: 'save' })
    // console.log(data)

    const url = new URL(request.url)
    const searchParams = Object.fromEntries(url.searchParams) // Convert search params to an object

    // Access the filter search parameter safely
    const filter = searchParams.filter as string | undefined

    console.log(restaurant, area, city, searchParams, filter)

    return data?.data as RestaurantDataResponse
}

export default MenuLoader
