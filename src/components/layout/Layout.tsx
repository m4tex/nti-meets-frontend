import classes from './Layout.module.scss';
import {Outlet, useNavigate} from "react-router-dom";
import HeaderNavigation from "./HeaderNavigation";
import { GlobalContext } from "../../store/GlobalContextProvider";
import {useContext} from "react";

function Layout(){
    const nav = useNavigate();
    const { isLoggedIn } = useContext(GlobalContext);

    return (
        <>
            <header className={classes.header}>
                <h1 className={classes.logo} onClick={() => nav( isLoggedIn ? '/flode' : 'logga-in' )}>NTI Möten</h1>
                <HeaderNavigation />
            </header>
            <main className={classes.main}>
                <Outlet />
            </main>
            <footer className={classes.footer}>
                Made by m4tex.
            </footer>
        </>
    )
}

export default Layout;