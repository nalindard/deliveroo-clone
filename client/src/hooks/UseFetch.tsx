
import { useState, useEffect, useCallback } from 'react'

const BASE_URL = 'http://localhost:1337/api/'
const REFRESH_TOKEN_URL = `${BASE_URL}refresh-token`

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
type Cache = 'default' | 'dont' | 'save'

const cacheMap = {
    default: 'default',
    dont: 'no-cache',
    save: 'force-cache',
}

interface FetchOptions {
    method?: HttpMethod
    body?: { [key: string]: unknown }
    headers?: Record<string, string>
    cache?: Cache
    // dependencies?: unknown[]
    withAuth?: boolean
}


function useFetch(endpoint: string, options: FetchOptions) {
    const {
        method = 'GET',
        body = null,
        headers: customHeaders = {},
        cache = 'no-cache',
        // dependencies = [],
        withAuth = true,
    } = options

    const [data, setData] = useState<unknown | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const url = `${BASE_URL}${endpoint}`
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                ...customHeaders,
            }

            if (withAuth) {
                const accessToken = localStorage.getItem('accessToken')
                if (accessToken) {
                    headers['Authorization'] = `Bearer ${accessToken}`
                }
            }

            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
                // cache: cacheMap[cache] || 'default',
                cache:
                    (cacheMap[cache as Cache] as RequestCache) ||
                    ('default' as RequestCache),
            })

            if (response.status === 401 && withAuth) {
                // Token expired, try to refresh
                const refreshed = await refreshToken()
                if (refreshed) {
                    // Retry the original request
                    return fetchData()
                } else {
                    throw new Error('Authentication failed')
                }
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result: unknown = await response.json()
            setData(result)
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e))
        } finally {
            setLoading(false)
        }
    }, [endpoint, customHeaders, withAuth, method, body, cache])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const refreshToken = async (): Promise<boolean> => {
        try {
            const refreshToken = localStorage.getItem('refreshToken')
            if (!refreshToken) {
                return false
            }

            const response = await fetch(REFRESH_TOKEN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            })

            if (!response.ok) {
                throw new Error('Failed to refresh token')
            }

            const { accessToken, newRefreshToken } = await response.json()
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', newRefreshToken)
            return true
        } catch (error) {
            console.error('Error refreshing token:', error)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            return false
        }
    }

    return { data, loading, error, refetch: fetchData }
}

export default useFetch
