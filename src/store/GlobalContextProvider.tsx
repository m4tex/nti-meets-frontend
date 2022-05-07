import React, {ReactNode, useEffect} from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ctxInit = {
    isLoggedIn: false,
    isAdmin: false,
    triedLogin: false,
    favorites: [],
    logIn: (admin: boolean) => {},
    logOut: () => {},
    addFavorite: (id:string|null) => {},
    removeFavorite: (id:string|null) => {},
}

export type GlobalContent = typeof ctxInit;

export let GlobalContext = React.createContext<GlobalContent>(ctxInit);

function GlobalContextProvider(props: {children:ReactNode}){
    let nav = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:8000/api/v1/sso').then(res => {
            if (res.status === 201){
                contextValue.logIn(res.data.admin);
            }
            setContextValue(prevState => ({
                ...prevState,
                triedLogin: true,
            }));
        }).catch(err => console.log(err));
    }, [])

    let [contextValue, setContextValue] = useState<GlobalContent>({
        ...ctxInit,
        logIn: (admin: boolean) => {
            setContextValue(prevState => ({
                ...prevState,
                isLoggedIn: true,
                isAdmin: admin,
            }));
        },
        logOut: () => {
            setContextValue(prevState => ({
                ...prevState,
                isLoggedIn: false,
                isAdmin: false,
            }));
            nav('/logga-in');
        }
    });

    return (
        <GlobalContext.Provider value={contextValue}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;