import styled from 'styled-components';
import Card from '../UI/Card';
import DateDisplay from "../UI/DateDisplay";
import {useNavigate} from "react-router-dom";

const StyledDiv = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  box-shadow: none;
  border: 1px solid #a9a9a9;
  padding-left: 20px;

  .title-row {
    margin-top: 5px;

    > * {
      display: inline-block;
    }

    h3 {
      font-size: 24px;
      margin-right: 12px;
      cursor: pointer;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .main-content {
    justify-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .admin-buttons {
    display: flex;
    gap: 15px;
    float: right;
    margin-right: 15px;

    button {
      padding: 8px 14px;
      border-radius: 6px;
      border: 1px solid #a9a9a9a9;
      background-color: #fff;
      font-size: x-small;

      &:hover {
        background-color: #eeeeee;
      }
    }
  }

  .description {
    font-weight: bold;
    color: #6b6b6b;
    max-width: 620px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
  }

  .author {
    color: #838383;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &:only-child {
    margin-bottom: 0;
  }
`

export interface MeetData {
    id: string,
    title: string,
    author: string,
    description: string,
    date: Date,
    admin: boolean,
}

function MeetItem(props: MeetData) {
    const nav = useNavigate();

    function titleClickHandler(){
        nav('/artikel?id=' + props.id)
    }

    return (
        <StyledDiv>
            <div className={'main-content'}>
                <div className={'title-row'}>
                    <h3 onClick={titleClickHandler}>{props.title}</h3>
                    <p className={'author'}>{props.author}</p>
                    { props.admin &&
                        <div className={'admin-buttons'}>
                            <button>Ta bort</button>
                            <button>Redigera</button>
                        </div> }
                </div>
                <p className={'description'}>{props.description}</p>
            </div>
            <DateDisplay date={props.date}/>
        </StyledDiv>
    );
}

export default MeetItem;