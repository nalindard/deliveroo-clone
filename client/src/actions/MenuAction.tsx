// interface LoaderResponse {
//     restaurant: string
//     area: string
//     city: string
// }

import { LoaderFunctionArgs } from 'react-router-dom'
import fetchData from '../api/FetchData'
import { RestaurantDataResponse } from '../types'
// import useFetch from '../hooks/UseFetch'

// const MenuLoader = async ({params,request,}: LoaderFunctionArgs): Promise<LoaderResponse> => {
const MenuLoader = async ({ params, request }: LoaderFunctionArgs): Promise<RestaurantDataResponse> => {
    const { restaurant, area, city } = params as {
        restaurant?: string
        area?: string
        city?: string
    } // Access route params

    // console.log(restaurant, area, city)

    // const {data, loading, error} =  useFetch(`/api/data/${restaurant}`, {})

    // console.log(data, loading, error);
    const data = await fetchData(`restaurants/${restaurant}`, { cache: 'save' })
    // console.log(data)

    const url = new URL(request.url)
    const searchParams = Object.fromEntries(url.searchParams) // Convert search params to an object

    // Access the filter search parameter safely
    const filter = searchParams.filter as string | undefined

    console.log(restaurant, area, city, searchParams, filter)

    return data?.data as RestaurantDataResponse
    // // return { restaurant, area, city, day, geohash, time }
    // const response = await fetch(
    //     `/api/data/${restaurant}?filter=${searchParams.filter}`
    // )
    // if (!response.ok) throw new Error('Failed to fetch data')
    // return response.json()
}

export default MenuLoader
