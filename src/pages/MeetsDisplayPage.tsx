import Card from '../components/UI/Card';
import styled from "styled-components";
import MeetList from "../components/meet-components/MeetList";
import {useContext} from "react";
import {ArticleContext} from "../store/ArticleContextProvider";

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

function MeetsDisplayPage() {
    const articleCtx = useContext(ArticleContext);

    return (
        <>
            <PageTitle>Uppkommande Möten</PageTitle>
            <StyledCard>
                <MeetList data={articleCtx.articles}/>
            </StyledCard>
        </>
    );
}

export default MeetsDisplayPage;