import {ChangeEvent} from "react";
import styled from "styled-components";

const FilterDropdown = styled.select` 
  position: relative;
  float: right;
  
  margin-left: auto;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 5px;
`

function MeetsFilter(props: { onFilter: (e:ChangeEvent<HTMLSelectElement>) => void, value:string}) {
    return (
        <FilterDropdown onChange={e => props.onFilter(e)} value={props.value}>
            <option value="0">Ordna resultat</option>
            <option value="1">Snarast</option>
            <option value="2">Alfabetisk Ordning</option>
            <option value="3">Skapare (alf. ordning)</option>
        </FilterDropdown>
    );
}

export default MeetsFilter;