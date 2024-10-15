import React from 'react'
// import { useSelector } from 'react-redux'
// import { login, logout } from '../../store/authSlice';
// import { RootState } from '../../store/store'
import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/UseAuth'

interface RouteGuardProps {
    children: React.ReactNode,
    inverse?: boolean,
    path?: string,
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, inverse = false, path }) => {
    // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    // console.log('isAuthenticated', isAuthenticated, 'inverse', inverse);

    const isAuthenticated = useAuth()
    
    
    if (!isAuthenticated && !inverse) {
        return <Navigate to={path || '/menu/london/covent-garden/tossed-st-martins-lane-new/'}/>
    }
    
    if (isAuthenticated && inverse) {
        // return <> {children} </> 
        return <Navigate to={path || '/menu/london/covent-garden/tossed-st-martins-lane-new/'}/>
    }

    return <>{children}</>
}

export default RouteGuard
