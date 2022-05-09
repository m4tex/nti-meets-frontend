import Card from '../components/UI/Card';
import styled from "styled-components";
import MeetList from "../components/meet-components/MeetList";
import {useEffect, useState} from "react";
import axios from "axios";

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
    id:string,
    title: string,
    author: string,
    date: string,
    description: string,
}

function MeetsDisplayPage(props: {title: string}) {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/articles', { withCredentials: true })
            .then(res => setArticles(res.data.articles)).catch(err => console.log(err));
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