import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider clientId='964450336282-cne0kgn0vqhjvjok2p8h0tf9ms30qepp.apps.googleusercontent.com'>
                <App />
            </GoogleOAuthProvider>
        </Provider>
    </StrictMode>
)
