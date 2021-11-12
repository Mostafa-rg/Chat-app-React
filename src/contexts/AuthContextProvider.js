import React, { useEffect, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase';

// Contexts
export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)
    const history = useNavigate()

    useEffect(() =>{
        auth.onAuthStateChanged(user => {
            setUser(user)
            setLoading(false)
            if(user) history("/chats")
        })
    },[user, history])

    return (
        <div>
            <AuthContext.Provider value={user}>
            {!loading && children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthContextProvider;


