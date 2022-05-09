import styled from 'styled-components';
import Card from './Card';

const StyledDiv = styled(Card)`
  box-shadow: none;
  border: 2px solid #a9a9a9;

  background-color: ${(props : {active:boolean}) => props.active ? '#a9a9a9' : 'transport'};
  color: ${(props : {active:boolean}) => props.active ? '#6b6b6b' : 'black'};  
  width: 80px;
  height: 80px;
  
  text-align: center;
  font-weight: bold;
  
  p:not(:last-child){
    font-size: larger;
    height: 22px;
  }
  
  p:last-child {
    margin-top: 4px;
    font-size: smaller;
    color: #6b6b6b;
  }
`

function DateDisplay(props: { date: string, style?:object }) {
    const date =  new Date(props.date);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = monthIndexToString(date.getMonth());

    function monthIndexToString(index: number) {
        switch (index) {
            case 0:
                return 'Jan';
            case 1:
                return 'Feb';
            case 2:
                return 'Mar';
            case 3:
                return 'Apr';
            case 4:
                return 'Maj';
            case 5:
                return 'Jun';
            case 6:
                return 'Jul';
            case 7:
                return 'Agu';
            case 8:
                return 'Sep';
            case 9:
                return 'Okt';
            case 10:
                return 'Nov';
            case 11:
                return 'Dec';
            default:
                return 'NaM';
        }
    }

    return (
        <StyledDiv style={props.style} active={(date.getTime() - new Date().getTime()) < 0}>
            <p>{day.toString()}</p>
            <p>{month.toString()}</p>
            <p>{year.toString()}</p>
        </StyledDiv>
    );
}

export default DateDisplay;