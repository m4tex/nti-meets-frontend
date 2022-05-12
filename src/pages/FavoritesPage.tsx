import Card from '../components/UI/Card';
import styled from "styled-components";
import MeetList from "../components/meet-components/MeetList";
import {useContext, useEffect, useState} from "react";
import {ArticleContext} from "../store/ArticleContextProvider";
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

function FavoritesPage() {
    const articleCtx = useContext(ArticleContext);
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        let test = true;
        axios.get('http://localhost:8000/api/v1/favorites', {withCredentials: true}).then(res => {
            if (test){
                setArticles(articleCtx.articles.filter(article => res.data.favorites.indexOf(article.id) !== -1));
            }
        }).catch(err => console.log(err));

        return () => {
            test = false;
        }
    }, [articleCtx.articles]);

    return (
        <>
            <PageTitle>Favoriter</PageTitle>
            <StyledCard>
                <MeetList data={articles} />
            </StyledCard>
        </>
    );
}

export default FavoritesPage;