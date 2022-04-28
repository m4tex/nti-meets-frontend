import styled from "styled-components";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { GlobalContext } from "../store/GlobalContextProvider";

const Msg = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  
  transform: translate(-50%, -50%);
  
  font-size: 50px;
`;

function NotFoundPage() {
    const nav = useNavigate();
    const { isLoggedIn } = useContext(GlobalContext);

    useEffect(() => {
        const t = setTimeout(() => {
            nav( isLoggedIn ? '/flode' : 'logga-in' );
        }, 5000)

        return () => {
            clearTimeout(t);
        }
    }, [])

    return (
        <>
            <Msg>404. Page Not Found. Redirecting in 5 seconds.</Msg>
        </>
    );
}

export default NotFoundPage;