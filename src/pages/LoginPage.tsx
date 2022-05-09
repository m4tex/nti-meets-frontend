import styled from "styled-components";
import InputField from "../components/UI/InputField";
import Button from "../components/UI/Button";
import SlimContentCard from "../components/UI/SlimContentCard";
import {GlobalContext} from "../store/GlobalContextProvider";
import LinkAnchor from "../components/UI/LinkAnchor";
import StyledHR from "../components/UI/StyledHR";
import {FormEvent, useContext, useState} from "react";
import MessageCard from "../components/UI/MessageCard";
import axios from "axios";

const StyledCard = styled(SlimContentCard)`
  text-align: center;

  h2 {
    font-size: 30px;
    padding: 10px 0;
    text-align: center;
  }

  .breaker {
    position: relative;

    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -62%);
      background-color: #fff;
      padding: 0 15px;
    }
  }
`

function LoginPage() {
    const globalCtx = useContext(GlobalContext);
    const [message, setMessage] = useState('');

    function handleLogin(event: FormEvent) {
        event.preventDefault();
        setMessage('');

        const form = event.target as HTMLFormElement;
        const usernameInput = form.elements[0] as HTMLInputElement;
        const passwordInput = form.elements[1] as HTMLInputElement;

        axios.post('http://localhost:8000/api/v1/logga-in', {
            username: usernameInput.value,
            password: passwordInput.value,
        }, {withCredentials: true}).then(res => {
            if (res.status === 201) {
                globalCtx.logIn(res.data.admin, res.data.username);
            } else if (res.data.hasOwnProperty('err')) {
                setMessage(res.data.err);
            } else {
                console.error('Unhandled exception in login response');
            }
        });
    }

    return (
        <StyledCard as={'form'} onSubmit={handleLogin}>
            <h2>Logga In</h2>
            {message !== '' && <MessageCard>{message}</MessageCard>}
            <InputField type="text" placeholder="Namn" name={'username'} required/>
            <InputField type="password" placeholder="Lösenord" name={'password'} required/>

            <Button>Logga In</Button>

            <div className={'breaker'}>
                <StyledHR/>
                <p>eller</p>
            </div>

            <LinkAnchor nav={'/skapa-konto'}>Skapa ett konto</LinkAnchor>
        </StyledCard>
    );
}

export default LoginPage;