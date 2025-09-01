import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/UseAuth'

interface RouteGuardProps {
    children: React.ReactNode,
    inverse?: boolean,
    path?: string,
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, inverse = false, path }) => {
    const isAuthenticated = useAuth()
    
    if (!isAuthenticated && !inverse) {
        return <Navigate to={path || '/menu/london/covent-garden/tossed-st-martins-lane-new/'}/>
    }
    
    if (isAuthenticated && inverse) {
        return <Navigate to={path || '/menu/london/covent-garden/tossed-st-martins-lane-new/'}/>
    }

    return <>{children}</>
}

export default RouteGuard
