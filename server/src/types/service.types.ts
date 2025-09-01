export interface ServiceResponse<T = any> {
    success: boolean
    data?: T
    message?: string
    error?: any
}

export interface PaginationOptions {
    limit?: number
    offset?: number
    orderBy?: string
    sortInvert?: boolean
}

export interface FilterOptions {
    userId?: string
    restaurantId?: string
    status?: string
    startDate?: string
    endDate?: string
    filterBy?: string
    sortBy?: 'ASC' | 'DESC'
}