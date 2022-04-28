import Card from '../components/UI/Card';
import styled from "styled-components";
import MeetList from "../components/meet-components/MeetList";
import {useEffect, useState} from "react";

const StyledCard = styled(Card)`
  position: relative;
  top: 10px;
  width: 750px;
  margin: 0 auto;
  box-shadow: 0 0 6px -2px #000;
`

const PageTitle = styled.h2`
  font-size: 40px;
  text-align: center;
  padding-top: 25px;
  margin-bottom: 25px;
`

interface Article {
    title: string,
    author: string,
    date: Date,
    description: string,
}

const offdate = new Date();
offdate.setDate(20);

const DUMMY_DATA = [
    {
        title: "Super Viktigt",
        author: "Måns Rosenfors",
        date: new Date(),
        description: "På det här mötet kommer vi att diskutera om hur vi kan göra elevernas liv svårare och lidande.",
    },
    {
        title: "Auper Viktigt",
        author: "Aåns Rosenfors",
        date: new Date(),
        description: "På det här mötet kommer vi att diskutera om hur vi kan göra elevernas liv svårare och lidande.",
    },
    {
        title: "Duper Viktigt",
        author: "Zåns Rosenfors",
        date: new Date(),
        description: "På det här mötet kommer vi att diskutera om hur vi kan göra elevernas liv svårare och lidande.",
    },
    {
        title: "Super Viktiiiigt",
        author: "Måns Rosenfors",
        date: offdate,
        description: "På det här mötet kommer vi att diskutera om hur vi kan göra elevernas liv svårare och lidande.",
    },
]

function MeetsDisplayPage(props: {title: string, dataLocationIndex: number}) {
    const [articles, setArticles] = useState<Article[]>(DUMMY_DATA);

    useEffect(() => {

    }, []);

    return (
        <>
            <PageTitle>{props.title}</PageTitle>
            <StyledCard>
                <MeetList data={articles}/>
            </StyledCard>
        </>
    );
}

export default MeetsDisplayPage;