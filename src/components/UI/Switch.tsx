import styled from "styled-components";

const SwitchDIV = styled.div`
  width: 150px;
  border: 1px solid #a9a9a9;
  border-radius: 8px;
  user-select: none;
  
  &:hover {
    cursor: pointer;
  }
  
  > div {
    font-size: larger;
    text-align: center;
    display: inline-block;
    border-radius: 8px;
    width: 50%;
  }
  
  > div:${(props:{currentActive:boolean}) => props.currentActive ? 'nth-child(2)' : 'first-child'} {
    background-color: #ddd;
  }
`

function Switch(props: {option1:string, option2:string, onChange:(val:boolean) => void, value:boolean, className?:string}) {
    return (
        <SwitchDIV currentActive={props.value} className={props.className}>
            <div onClick={() => props.onChange(false)}>{props.option1}</div>
            <div onClick={() => props.onChange(true)}>{props.option2}</div>
        </SwitchDIV>
    )
}

export default Switch;