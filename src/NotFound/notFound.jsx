import react, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import jscookie from 'js-cookie';
import { useUserContext } from '../ContextApi/UserContext';
export default function NotFound(){
    const { isLogin } = useUserContext();
    const usenav = useNavigate();

    useEffect(() => {
      if (jscookie.get('token')) {
        usenav('/');
      }
    }, []);
  
    if (isLogin) {
      return <Navigate to="/" />;
    }
   return(
    <h2>
      Page Not found
    </h2>
   )
}