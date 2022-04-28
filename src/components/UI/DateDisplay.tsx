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

function DateDisplay(props: { date: Date, style?:object }) {
    const day = props.date.getDate();
    const year = props.date.getFullYear();
    const month = monthIndexToString(props.date.getMonth());

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
        }
    }

    return (
        <StyledDiv style={props.style} active={(props.date.getTime() - new Date().getTime()) < 0}>
            <p>{day}</p>
            <p>{month}</p>
            <p>{year}</p>
        </StyledDiv>
    );
}

export default DateDisplay;