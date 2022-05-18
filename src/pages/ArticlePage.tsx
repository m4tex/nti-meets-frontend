import Card from "../components/UI/Card";
import styled from "styled-components";
import DateDisplay from "../components/UI/DateDisplay";
import StyledHR from "../components/UI/StyledHR";
import {useSearchParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import { GlobalContext } from "../store/GlobalContextProvider";
import { ArticlePreviewContext } from '../store/ArticlePreviewContextProvider'
import HTMLReactParser from "html-react-parser";
import Button from "../components/UI/Button";
import axios from "axios";

const StyledCard = styled(Card)`
  position: relative;
  top: 26px;
  box-shadow: 0 0 6px -4px #000;
  width: 1000px;
  margin: auto;

  margin-bottom: 50px;

  text-align: center;

  h2 {
    font-size: 32px;
    margin: 5px 0;
  }

  hr {
    width: calc(100% - 40px);
    margin: 15px auto;
  }

  .material-icons {
    user-select: none;
    position: absolute;
    right: 12px;
    top: 10px;
    cursor: pointer;
  }

  .author {
    margin: 5px 0;
    color: #666666;
  }

  .date {
    position: absolute;
    right: -10px;
    top: 0;

    > div {
      position: fixed;
    }
  }
  
  .back-btn {
    position: absolute;
    right: -117px;
    top: 90px;
  }

  .content {
    text-align: left;
    padding: 0 20px;
    margin-bottom: 15px;
    word-break: break-word;
  }

  .optList {
    position: absolute;
    right: 5px;
    top: 35px;
    padding: 6px;
    border-radius: 8px;
    box-shadow: 0 0 4px -2px black;
    background-color: #fff;
    cursor: pointer;
  }
`

export interface Article {
    html: boolean,
    author: string,
    title: string,
    content: string,
    date: string,
}

function ArticlePage() {
    const [searchParams] = useSearchParams();
    const [articleData, setArticleData] = useState<Article>({
        html:false,
        author:'',
        title:'',
        content:'',
        date: '',
    });
    const [optListOpen, setOptListOpen] = useState<boolean>(false);
    const optRef = useRef<HTMLDivElement>(null);
    const globalCtx = useContext(GlobalContext);
    const artPreviewCtx = useContext(ArticlePreviewContext);
    const nav = useNavigate();

    function optListHandler() {
        setOptListOpen(true);
    }

    function backToPrevHandler() {
        nav('/skapa-mote?bfp');
    }

    //Shows a prompt on refresh
    useEffect(() => {
        const unloadCallback = (event:BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    useEffect(() => {
         if(searchParams.has('id')){
            axios.get('http://localhost:8000/api/v1/articles/' + searchParams.get('id'), { withCredentials: true })
                .then(res => {
                    setArticleData(res.data.article);
                    axios.get('http://localhost:8000/api/v1/user/' + res.data.article.author, { withCredentials: true }).
                        then(res => setArticleData(prevState => ({...prevState, author: res.data.username}))).
                    catch(err => console.log(err));
                }).catch(err => console.log(err));
        }
         else if (searchParams.has('prev')){
             setArticleData(artPreviewCtx.articlePreviewData);
        }
        else {
            nav('/flode');
         }
    }, [searchParams]);

    useEffect(() => {
        function checkForClickOutside(e:MouseEvent) {
            if (optRef.current && !optRef.current.contains(e.target as Node)) {
                setOptListOpen(false);
            }
        }
        document.addEventListener('mousedown', checkForClickOutside);
        return () => document.removeEventListener('mousedown', checkForClickOutside); //Yay, I caused a memory leak (this line fixes it)
    }, [])

    const id = searchParams.get('id') as string;

    function addFavoriteHandler() {
        if(globalCtx.favorites.includes(id)) {
            globalCtx.removeFavorite(id);
        }
        else {
            globalCtx.addFavorite(id);
        }
        setOptListOpen(false);
    }

    return (
        <StyledCard as={'article'}>
            { searchParams.has('prev') && <Button className={'back-btn'} onClick={backToPrevHandler}>Gå tillbaka</Button> }
            <span className={'material-icons'} onClick={optListHandler}>
                expand_more
            </span>
            {optListOpen && <div className={'optList'} ref={optRef} onClick={addFavoriteHandler}>{globalCtx.favorites.includes(id) ? 'Ta bort från favoriter' : 'Markera som favorit' }</div>}
            <div className={'date'}>
                <DateDisplay date={articleData.date}/>
            </div>
            <h2>{articleData.title}</h2>
            <p className={'author'}>{articleData.author}</p>
            <StyledHR/>
            <section className={'content'}>{articleData.html ? HTMLReactParser(articleData.content) : articleData.content}</section>
        </StyledCard>
    );
}

export default ArticlePage;