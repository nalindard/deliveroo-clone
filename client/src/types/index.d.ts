export type IDishData = {
    id?: string | number
    image: string
    name: string
    kcal?: string
    price: string
    desc?: string
    highlight?: string
}

export type IBasketItem = {
    itemId: string
    // id: string
    // count: number
    // price: number
    // name: string
    // image: string
    // desc?: string
    id: string
    name: string
    restaurantId: string
    priceInCents: number
    calories: number
    description: string
    highlight: string
    image: string
    isAvaliable: boolean
    ingradients: string
    createdAt?: string
    updatedAt?: string
    amount: number
}

interface BasketDataResponse {
    data: Basket[] // Array of Basket
}

export type IDish = Omit<IBasketItem, 'amount'>

export interface IOrderItem {
    id: string
    basketId: string
    orderId: string | null // orderId can be null
    dishId: string
    amount: number
    createdAt: string // ISO 8601 date string
    updatedAt: string // ISO 8601 date string
    Dish: Dish // Reference to the Dish interface
}

interface IBasket {
    id: string
    userId: string
    restaurantId: string
    createdAt: string // ISO 8601 date string
    updatedAt: string // ISO 8601 date string
    OrderItems: IOrderItem[] // Array of OrderItem
}

export interface MenuDish {
    id: string
    name: string
    priceInCents: number
    calories: number
    description: string
    highlight: string
    image: string
    isAvaliable: boolean
    ingradients: string
}

interface ApiResponse {
    data: IBasket[] // Array of Basket
}

export interface MenuCategory {
    name: string
    Dishes: MenuDish[]
}

export interface RestaurantDataResponse {
    away: string
    id: string
    name: string
    ownerId: string
    city: string
    area: string
    address: string
    opensAt: string // ISO 8601 date string
    closesAt: string // ISO 8601 date string
    isActive: boolean
    phone: string
    note: string
    image: string
    titleTags: string // Comma-separated string
    subTitleTags: string // Comma-separated string
    minimumInCents: number
    deliveryFeesInCents: number
    Categories: MenuCategory[]
    RestaurentReviews: {
        totalReviews: number
        averageRating: string
    }
}

interface DishDataResponse {
    calories: number
    description: string
    highlight: string
    id: string
    image: string
    ingradients: string // Corrected from "ingradients"
    isAvaliable: boolean // Corrected from "isAvaliable"
    name: string
    priceInCents: number
    restaurantId: string
}

interface CheckOutResponse {
    ok: boolean
    data: {
        message: string
        data: {
            orderId: string
            restaurantId: string
            status: string
            totalValueInCents: number
            userId: string
        }
    }
    error: string | null
}

type PostBasketItemResponse = {
    ok: boolean
    data: {
        message: string
        data: {
            id: string
            dishId: string
            basketId: string
            amount: number
        }
    }
    error: string | null
}

type CreateBasketResponse = {
    ok: boolean
    data: {
        message: string
        data: {
            id: string
            userId: string
            restaurantId: string
        }
    }
    error: string | null
}

type GoogleOAuthDataResponse = {
    ok: boolean
    data: {
        success: boolean
        newUser: {
            id: string
            name: string
            email: string
            isOAuthUser: boolean
            oauthProvider: string
            oauthId: string
            role: string
            emailVerified: boolean
            updatedAt: string
            createdAt: string
        }
        refreshToken: string
        accessToken: string
    }
    error: string | null
}

type BasketCreateionResponse = {
    ok: boolean
    data: {
        message: string
        data: {
            id: string
            userId: string
            restaurantId: string
        }
    }
    error: string | null
}
