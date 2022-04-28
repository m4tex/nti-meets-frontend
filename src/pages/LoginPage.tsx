import styled from "styled-components";
import InputField from "../components/UI/InputField";
import Button from "../components/UI/Button";
import SlimContentCard from "../components/UI/SlimContentCard";
import LinkAnchor from "../components/UI/LinkAnchor";
import StyledHR from "../components/UI/StyledHR";

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
    return (
        <>
            <StyledCard>
                <h2>Logga In</h2>
                <InputField type="text" placeholder="Namn"/>
                <InputField type="password" placeholder="Lösenord"/>

                <Button>Logga In</Button>

                <div className={'breaker'}>
                    <StyledHR />
                    <p>eller</p>
                </div>

                <LinkAnchor nav={'/skapa-konto'}>Skapa ett konto</LinkAnchor>
            </StyledCard>
        </>
    );
}

export default LoginPage;