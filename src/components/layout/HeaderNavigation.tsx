import classes from "./HeaderNavigation.module.scss";
import styled from "styled-components";
import {GlobalContext} from '../../store/GlobalContextProvider'
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

const FavoritesBadge = styled.span`
  padding: 0 10px;
  border-radius: 16px;
  background-color: hsl(0, 100%, 30%);
  margin-right: 5px;
`

function HeaderNavigation() {
    const globalCtx = useContext(GlobalContext);
    const nav = useNavigate();

    return (
        <nav className={classes.navigation}>
            {
                globalCtx.isLoggedIn && <>
                    { globalCtx.isAdmin &&
                        <p className={classes['admin-button']} onClick={() => nav('/skapa-mote')}>
                            Skapa ett möte
                        </p> }
                    <p onClick={() => nav('/flode')}>Flöde</p>
                    <p onClick={() => nav('/arkiv')}>Arkiv</p>
                    <p onClick={() => nav('/favoriter')}>
                        <FavoritesBadge>{globalCtx.favorites.length}</FavoritesBadge>
                        Favoriter
                    </p>
                </>
            }
            <p onClick={() => globalCtx.isLoggedIn ? globalCtx.logOut() : nav('/logga-in')}>{globalCtx.isLoggedIn ? 'Logga Ut' : 'Logga In'}</p>
        </nav>
    );
}

export default HeaderNavigation;