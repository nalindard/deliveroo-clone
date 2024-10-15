import dotenv from 'dotenv'
dotenv.config()

export default {
    port: process.env.PORT || 3000,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? '',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? '',
    refresh_token_expire_time : '30d',
    access_token_expire_time : '2m',
    maximum_number_of_sessions: 5,
    google_client_id: process.env.GOOGLE_CLIENT_ID ?? '',
}
