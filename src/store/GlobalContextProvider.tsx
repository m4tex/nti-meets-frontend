import React, {ReactNode} from 'react';
import {useState} from "react";

const ctxInit = {
    isLoggedIn: true,
    isAdmin: true,
    favorites: [],
    logIn: () => {},
    logOut: () => {},
    addFavorite: (id:string|null) => {},
    removeFavorite: (id:string|null) => {},
}

export type GlobalContent = typeof ctxInit;

export let GlobalContext = React.createContext<GlobalContent>(ctxInit);

function GlobalContextProvider(props: {children:ReactNode}){
    let [contextValue, setContextValue] = useState<GlobalContent>(ctxInit);

    return (
        <GlobalContext.Provider value={contextValue}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;