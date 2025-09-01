import { OAuth2Client, TokenPayload } from 'google-auth-library'
import defaultConfig from '../../configs/default.config'

export async function varifyGoogleTokenAndGetData(token: string) {
    const client = new OAuth2Client()
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: defaultConfig.google_client_id,
        })
        const payload: TokenPayload | null = ticket.getPayload() ?? null

        if (payload?.email_verified !== true) throw 'Unverified Email'

        // const userid = payload['sub']
        const userData = {
            googleId: payload?.sub ?? '',
            name: payload?.name ?? '',
            email: payload?.email ?? '',
            picture: payload?.picture ?? '',
        }
        // If the request specified a Google Workspace domain:
        // const domain = payload['hd'];

        return userData
    }

    // verify().catch(console.error)

    try {
        // verify().then(verifyData => {})
        return await verify()
    } catch (error) {
        throw error
    }
}

export async function varifyGoogleTokenAndGetDataByAccessToken(token: string) {
    // async function getGoogleUserData(access_token: string) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const data: googleAccessTokenData = await response.json()
        console.log(data)

        const userData = {
            googleId: data?.id ?? '',
            name: data?.name ?? '',
            email: data?.email ?? '',
            picture: data?.picture ?? '',
        }

        console.log('userData--->', userData);
        

        return userData
    } catch (error) {
        throw new Error('Failed to fetch user info: ' + error)
    }
}

type googleTokenPayload = {
    iss: string
    azp: string
    aud: string
    sub: string
    email: string
    email_verified: boolean
    nbf: string
    name: string
    picture: string
    given_name: string
    family_name: string
    iat: number
    exp: number
    jti: string
}

type googleAccessTokenData = {
    email: string
    given_name: string
    id: string
    name: string
    picture: string
    verified_email: boolean
}
