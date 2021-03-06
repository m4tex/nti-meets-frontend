import React, {ReactNode, useEffect} from 'react';
import {useState} from "react";
import axios from "axios";

const ctxInit = {
    username: '',
    isLoggedIn: false,
    isAdmin: false,
    triedSSO: false,
    logIn: (admin: boolean, username:string, favorites: string[]) => {},
    logOut: () => {},
    addFavorite: (id:string) => {},
    removeFavorite: (id:string) => {},
    favorites: [] as string[],
}

export type GlobalContent = typeof ctxInit;

export let GlobalContext = React.createContext<GlobalContent>(ctxInit);

function GlobalContextProvider(props: {children:ReactNode}){
    //Single Sign On re-logger
    useEffect(() => {
        axios.post('http://localhost:8000/api/v1/sso', null, { withCredentials: true }).then(res => {
            if (res.status === 201){
                contextValue.logIn(res.data.admin, res.data.username, res.data.favorites);
                console.log(res.data.favorites)
            }
            setContextValue(prevState => ({
                ...prevState,
                triedSSO: true,
            }));
        }).catch(err => console.log(err));
    }, [])

    let [contextValue, setContextValue] = useState<GlobalContent>({
        ...ctxInit,
        logIn: (admin: boolean, username: string, favorites: string[]) => {
            setContextValue(prevState => ({
                ...prevState,
                isLoggedIn: true,
                isAdmin: admin,
                username: username,
                favorites: favorites
            }));
        },
        logOut: async () => {
            await axios.post('http://localhost:8000/api/v1/logout', null, { withCredentials: true });
            setContextValue(prevState => ({
                ...prevState,
                isLoggedIn: false,
                isAdmin: false,
            }));
        },
        addFavorite: async (id:string) => {
            await axios.post('http://localhost:8000/api/v1/favorites', {"favorite": id}, { withCredentials: true}).catch(err => console.log(err));
            setContextValue(prevState => ({
                ...prevState,
                favorites: [...prevState.favorites, id],
            }));
        },
        removeFavorite: async (id:string) => {
            await axios.delete('http://localhost:8000/api/v1/favorites/' + id, { withCredentials: true }).catch(err => console.log(err));
            console.log(contextValue.favorites.splice(contextValue.favorites.indexOf(id), 1));
            setContextValue(prevState => ({
                ...prevState,
                favorites: prevState.favorites.splice(prevState.favorites.indexOf(id), 1),
            }));
        }
    });

    return (
        <GlobalContext.Provider value={contextValue}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;