import SlimContentCard from "../components/UI/SlimContentCard";
import Card from "../components/UI/Card";
import InputField from "../components/UI/InputField";
import LinkAnchor from "../components/UI/LinkAnchor";
import Button from "../components/UI/Button";
import styled from "styled-components";
import {FormEvent, useContext, useState} from "react";
import axios from "axios";
import MessageCard from "../components/UI/MessageCard";
import {GlobalContext} from "../store/GlobalContextProvider";

const StyledCard = styled(SlimContentCard)`
  text-align: center;

  h2 {
    font-size: 30px;
    padding: 10px 0;
  }

  a {
    display: block;
  }
`;

function SignUpPage() {
    const globalCtx = useContext(GlobalContext);

    const [message, setMessage] = useState<string>('');

    function signUpHandler(event: FormEvent) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const username = form.elements[0] as HTMLInputElement;
        const mail = form.elements[1] as HTMLInputElement;
        const password = form.elements[3] as HTMLInputElement;

        axios.post('http://localhost:8000/api/v1/skapa-konto', {
            username: username.value,
            email: mail.value,
            password: password.value
        }, { withCredentials: true }).then(res => {
            if (res.status === 201) {
                globalCtx.logIn(false, res.data.username, []);
            }
            else if (res.data.hasOwnProperty('err')) {
                setMessage(res.data.err);
            }
            else {
                console.error('Unhandled exception in sign up response');
            }
        }).catch(err => console.log(err));
    }

    return (
        <StyledCard as={'form'} onSubmit={signUpHandler}>
            <h2>Skapa ett konto</h2>
            {message !== '' && <MessageCard>{message}</MessageCard>}
            <InputField placeholder={'Namn'} required/>
            <InputField type={'email'} placeholder={'Mejladress'} required/>
            <InputField type={'password'} placeholder={'Lösenord'} required/>
            <InputField type={'password'} placeholder={'Bekräfta Lösenord'} required/>

            <Button type={'submit'}>Skapa</Button>

            <LinkAnchor nav={'/logga-in'}>Har du ett konto?</LinkAnchor>
        </StyledCard>
    )
}

export default SignUpPage;