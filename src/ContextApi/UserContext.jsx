import { createContext, useContext, useEffect, useState } from "react";
import jscookie from 'js-cookie';
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Create a context for the user-related data
const UserContextApi = createContext();

// UserContextProvider component that wraps your app and provides user-related functionality
export const UserContextProvider = ({ children }) => {
    const usenav = useNavigate();

    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    // Function to log the user out
    const LogOut = () => {
        console.log("Logged Out");
        jscookie.remove('token');
        setIsLogin(false);
        usenav('/');
    }

    // Effect to check and set user status on component mount
    useEffect(() => {
        const token = jscookie.get('token');
        console.log('Token:', token);

        if (!token) {
            usenav('/');
        } else {
            try {
                const jwtdecoded = jwtDecode(token);
                console.log('Decoded JWT:', jwtdecoded);
                setEmail(jwtdecoded.email);
                setIsLogin(true);
            } catch (error) {
                console.error('Error decoding JWT:', error);
                usenav('/');
            }
        }
    }, []);

    return (
        // Provide user-related data to components
        <UserContextApi.Provider value={{ email, LogOut, isLogin, setIsLogin }}>
            {children}
        </UserContextApi.Provider>
    );
};

// Custom hook to access user-related data
export const useUserContext = () => {
    return useContext(UserContextApi);
};
