import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const useAuth = () =>
    useSelector((state: RootState) => state.auth.isAuthenticated) ?? false

export default useAuth
