import {createPortal} from "react-dom";
import styled from "styled-components";
import Card from "./Card";
import Button from "./Button";

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
`

const ModalBox = styled(Card)`
  position: absolute;
  padding: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 4px -2px black;
  
  
`;

export interface ButtonData {
    name: string,
    event: () => void,
}

function Modal(props: { dialog: string, buttonData: ButtonData[] }) {
    return createPortal(
        <Background>
            <ModalBox>
                {props.dialog}
                {props.buttonData.map(bData => <Button onClick={bData.event}>{bData.name}</Button>)}
            </ModalBox>
        </Background>,
        document.getElementById('root') as HTMLElement
    );
}

export default Modal;