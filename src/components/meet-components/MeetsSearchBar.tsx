import InputField from "../UI/InputField";
import styled from "styled-components";
import React from "react";

const StyledInput = styled(InputField)`
  display: inline-block;
  margin: 0 0 5px 0;
  padding-left: 32px;
`

const SearchIcon = styled.span`
  color: #555;
  position: absolute;
  left: 10px;
  top: 10px;
`

function MeetsSearchBar(props: {onSearch: (e:React.ChangeEvent<HTMLInputElement>) => void, value:string}) {
    return (
        <>
            <StyledInput id={'input'} placeholder={'Sök'} onChange={e=>props.onSearch(e)} value={props.value}/>
            <SearchIcon className={'material-icons-outlined'}>
                search
            </SearchIcon>
        </>
    )
}

export default MeetsSearchBar;