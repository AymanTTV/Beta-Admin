import {React, useEffect} from "react";

import { useNavigate } from "react-router-dom";

import jscookie from 'js-cookie';
import { useUserContext } from "../ContextApi/UserContext";

export default function LogOut(){
    const {setIsLogin} = useUserContext();
    const usenav = useNavigate();

    useEffect(()=>{
        jscookie.remove('token');
        setIsLogin(false);
        usenav("/");
    },[])
    
}