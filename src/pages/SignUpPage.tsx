import SlimContentCard from "../components/UI/SlimContentCard";
import Card from "../components/UI/Card";
import InputField from "../components/UI/InputField";
import LinkAnchor from "../components/UI/LinkAnchor";
import Button from "../components/UI/Button";
import styled from "styled-components";
import {useState} from "react";

const StyledCard = styled(SlimContentCard)`
  text-align: center;

  h2 {
    font-size: 30px;
    padding: 10px 0;
  }

  a {
    display: block;
  }
`

const MessageCard = styled(Card)`
  display: inline-block;
  border: 1px solid #ffd4d4;
  width: 250px;
  padding: 5px 8px;

  color: #d00000;
  font-size: 12px;
  text-align: left;
  overflow: hidden;
  
  animation: entry 0.2s ease-in;
  
  @keyframes entry {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100%;
    }
  }
`

function SignUpPage() {
    const [message, setMessage] = useState<string>('');

    return (
        <StyledCard>
            <h2>Skapa ett konto</h2>

            { message !== '' && <MessageCard>{message}</MessageCard> }

            <InputField placeholder={'Namn'}/>
            <InputField type={'email'} placeholder={'Mejladress'}/>
            <InputField type={'password'} placeholder={'Lösenord'}/>
            <InputField type={'password'} placeholder={'Bekräfta Lösenord'}/>

            <Button onClick={() => setMessage('Ditt lösenord är för kort.')}>Skapa</Button>

            <LinkAnchor nav={'/logga-in'}>Har du ett konto?</LinkAnchor>

        </StyledCard>
    )
}

export default SignUpPage;