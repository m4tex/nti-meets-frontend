import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/* eslint-disable  */

const StyledAnchor = styled.a`
  display: inline-block;

  color: dodgerblue;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  margin: 15px 0;
`;

function LinkAnchor(props : { children : React.ReactNode, nav : string }) {
    // eslint-disable-next-line no-console
    const nav = useNavigate();

    return <StyledAnchor onClick={() => nav(props.nav)}>{props.children}</StyledAnchor>
}

export default LinkAnchor;