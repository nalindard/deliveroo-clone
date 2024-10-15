const BASE_URL = 'http://localhost:1337/api/';
// const BASE_URL = 'https://fakestoreapi.com/';
const REFRESH_TOKEN_URL = `${BASE_URL}auth/token`;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type Cache = 'default' | 'dont' | 'save';

const cacheMap: Record<Cache, RequestCache> = {
    default: 'default',
    dont: 'no-cache',
    save: 'force-cache',
};

interface FetchOptions {
    method?: HttpMethod;
    body?: { [key: string]: unknown };
    headers?: Record<string, string>;
    cache?: Cache;
    withAuth?: boolean;
}

interface FetchResult<T> {
    ok: boolean;
    data: T | null;
    error: string | null;
}

async function refreshToken(): Promise<boolean> {
    try {

        console.log('fetching refresh token...');        

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            return false;
        }
        // console.log('old-refresh-token:', refreshToken);
        

        const response = await fetch(REFRESH_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }),
        });

        // console.log('refresh token response:', response);
        

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const {newRefreshToken, newAccessToken} = await response.json();
        // console.log('data-tokens:', data);
        console.log('new-refresh-token:', newRefreshToken, 'new-access-token:', newAccessToken);
        
        
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        return true;
    } catch (error) {
        console.error('Error refreshing token:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return false;
    }
}

async function fetchData<T>(endpoint: string, options: FetchOptions = {}): Promise<FetchResult<T>> {
    const {
        method = 'GET',
        body = null,
        headers: customHeaders = {},
        cache = 'default',
        withAuth = true,
    } = options;

    try {
        const url = `${BASE_URL}${endpoint}`;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Custom-one': 'custom/header',
            ...customHeaders,
        };

        if (withAuth) {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }

        // console.table(options);
        

        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
            cache: cacheMap[cache],
        });

        // console.log('response --- FetchData', response);
        

        if ((response.status === 401 || response.status === 403) && withAuth) {
            const refreshed = await refreshToken();
            if (refreshed) {
                return await fetchData(endpoint, options);
            } else {
                throw new Error('Authentication failed');
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: T = await response.json();
        return { ok: true, data, error: null };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        return { ok: false, data: null, error: errorMessage };
    }
}

export default fetchData;