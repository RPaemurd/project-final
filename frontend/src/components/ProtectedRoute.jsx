import { Navigate } from 'react-router-dom'; //checks if the user is logged in, otherwise sends you to login
import useUserStore from '../store/userStore'; // checks isLoggedIn from Zustand

/* isLoggedIn = true  → show children (show whats inside the component)
isLoggedIn = false → <Navigate to="/login" /> */

const ProtectedRoute = ({ children }) => {

    const isLoggedIn = useUserStore(state => state.isLoggedIn);
    
    if (isLoggedIn){
        return children //show the site (component)
    } else {
        return <Navigate to = '/login' /> 
    }
};


export default ProtectedRoute;