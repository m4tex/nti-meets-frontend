import {createPortal} from "react-dom";
import styled from "styled-components";
import Card from "./Card";
import Button from "./Button";

const Background = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  width: 100%;
  height: 100%;
`

const ModalBox = styled(Card)`
  position: absolute;
  padding: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 4px -2px black;
  
  > div {
    margin-top: 10px;
    
    display: grid;
    grid-auto-flow: column;
    gap: 8px;
  }
`;

export interface ButtonData {
    name: string,
    event: () => void,
}

function Modal(props: { dialog: string, buttonData: ButtonData[], onBGClick:()=>void }) {
    return createPortal(
        <Background onClick={() => props.onBGClick()}>
            <ModalBox>
                {props.dialog}
                <div>{props.buttonData.map(bData => <Button key={Math.random()} onClick={bData.event}>{bData.name}</Button>)}</div>
            </ModalBox>
        </Background>,
        document.getElementById('root') as HTMLElement
    );
}

export default Modal;