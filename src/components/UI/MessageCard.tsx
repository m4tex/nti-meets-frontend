import styled from "styled-components";
import Card from "./Card";

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
`;

export default MessageCard;