import styled from "styled-components";
import Card from "../components/UI/Card";
import {useState, useContext, useRef, useEffect, FormEvent} from "react";
import Switch from "../components/UI/Switch";
import Button from "../components/UI/Button";
import {useNavigate, useSearchParams} from "react-router-dom";
import InputField from "../components/UI/InputField";
import TextAreaAutosized from "../components/UI/TextAreaAutosized";
import {ArticlePreviewContext} from '../store/ArticlePreviewContextProvider';
import axios from "axios";
import {GlobalContext} from "../store/GlobalContextProvider";
import {ArticleContext} from "../store/ArticleContextProvider";

const StyledCard = styled(Card)`
  position: relative;
  top: 26px;
  box-shadow: 0 0 6px -4px #000;
  width: 750px;
  margin: auto;

  text-align: center;

  h2 {
    font-size: 35px;
    margin: 20px 0;
  }

  input {
    display: block;
    width: 600px;
    margin-top: 0;
    margin-bottom: 10px;
  }

  > div:not(.button-row) {
    display: flex;
    width: 600px;
    margin: 0 auto 10px auto;
    align-items: center;
    justify-content: space-between;
  }

  .button-row {
    width: fit-content;
    margin: 0 70px 10px auto;

    button:first-child {
      background-color: white;
      color: #6a0000;
      margin-right: 6px;

      &:hover {
        color: #8e0000;
        background-color: #f8f8f8;
      }
    }
  }

  #start-date {
    width: 180px;

    margin: 0;
    text-align: center;
  }

  .textarea {
    width: 600px;
    margin-bottom: 10px;
  }
  
  .warning {
    background-color: #ffd4d4;
    border-radius: 8px;
    padding: 4px;
  }
`

function EditArticlePage() {
    const globalCtx = useContext(GlobalContext);
    const articleCtx = useContext(ArticleContext);
    const [contentType, setContentType] = useState<boolean>(false);
    const tref = useRef<HTMLInputElement>(null);
    const dref = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState<string>('');

    const previewCtx = useContext(ArticlePreviewContext);
    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        const unloadCallback = (event:BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    function previewArticleHandler() {
        previewCtx.setArticlePreviewData({
            html:contentType,
            title: tref.current!.value,
            author: globalCtx.username,
            date: dref.current!.value,
            content: content,
        })
        nav('/artikel?prev');
    }

    function editArticleHandler(event: FormEvent){
        event.preventDefault();

        axios.patch('http://localhost:8000/api/v1/articles/' + id, {
            "html" : contentType,
            "title" : tref.current!.value,
            "date" : dref.current!.value,
            "content" : content,
        }, { withCredentials: true }).then(() => {
            articleCtx.refresh();
            nav('/flode');
        });
    }

    //Get the article data
    useEffect(() => {
        if (!searchParams.has('id')){
            nav('flode');
            return;
        }

        axios.get('http://localhost:8000/api/v1/articles/'+ id, { withCredentials: true }).then(res => {
            tref.current!.value = res.data.article.title;
            dref.current!.value = res.data.article.date;
            console.log(res.data.article.content);
            setContent(res.data.article.content);
            setContentType(res.data.article.html);
        }).catch(err => console.log(err));
    }, [searchParams]);


    return  (
        <StyledCard as={'form'} onSubmit={editArticleHandler} >
            <h2>Redigera ett Möte</h2>
            <InputField placeholder={'Titel (inkludera ej i Artikeln, även i HTML)'} name={'title'} maxLength={28} ref={tref} required />
            <div>
                <label htmlFor="start-date">Påbörjelsedatum</label>
                <InputField id={'start-date'} type={'date'} name={'start-date'} ref={dref} required />
            </div>
            <div>
                <label htmlFor="content">Innehåll</label>
                <Switch option1={'Text'} option2={'HTML'} onChange={val => setContentType(val)} value={contentType} />
            </div>
            { contentType && <div className={'warning'}>Varning, HTML attributer fungerar inte pga. att det går inte att skilja inmatade strängar från riktig kod. 'class' är den enda undantaget.</div> }
            <TextAreaAutosized id={'content'} name={'article-content'} placeholder={'Skriv artikeln här...'} className={'textarea'} value={content} onChange={val => setContent(val)} required />
            <div className={'button-row'}>
                <Button type={'button'} onClick={previewArticleHandler}>
                    Förhandsvisning (pre-alpha lol)
                </Button>
                <Button>
                    Redigera
                </Button>
            </div>
        </StyledCard>
    )
}

export default EditArticlePage;