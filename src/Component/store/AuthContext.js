import React, { useState } from "react";

const AuthContext = React.createContext({
    email :"",
    token : "",
    isLoggedIn : false,
    login : (token)=>{},
    logout : ()=>{}
})

export const AuthContextProvider=(props)=>{
    const initialToken = localStorage.getItem('token')
    const initialEmail = localStorage.getItem('email');
    console.log(initialToken);
    const[token , setToken] = useState(initialToken)
    const[email, setEmail] = useState(initialEmail)

    const userLoggedIn = !!token;
    const loginHandler =(token)=>{
    localStorage.setItem('token' , token)
   localStorage.setItem('email',email)
     setToken(token)
     setEmail(email)

    }
    const logoutHandler = ()=>{
        
        setToken(null);
        localStorage.removeItem('idToken')

    }

    const contextValue = {
        email:email,
        token : token,
        isLoggedIn : userLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}

export default AuthContext
