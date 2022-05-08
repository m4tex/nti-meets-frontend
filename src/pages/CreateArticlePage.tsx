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
import axiosConfig from "../utils/axiosConfig";

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

function CreateArticlePage() {
    const [contentType, setContentType] = useState<boolean>(false);
    const tref = useRef<HTMLInputElement>(null);
    const dref = useRef<HTMLInputElement>(null);
    const cref = useRef<HTMLTextAreaElement>(null);

    const previewCtx = useContext(ArticlePreviewContext);
    const nav = useNavigate();
    const [searchParams] = useSearchParams();

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
        if (searchParams.has('bfp')){
            tref.current!.value = previewCtx.articlePreviewData.title;
            dref.current!.value = previewCtx.articlePreviewData.date.toDateString();
            cref.current!.value = previewCtx.articlePreviewData.content;
            setContentType(previewCtx.articlePreviewData.html);
        }
    }, [searchParams])

    function previewArticleHandler() {
        previewCtx.setArticlePreviewData({
            html:contentType,
            title: tref.current!.value,
            author: "HELO",
            date: new Date(dref.current!.value),
            content: cref.current!.value,
        })
        nav('/artikel?prev');
    }

    function createArticleHandler(event: FormEvent){
        event.preventDefault();
        axios.post('http://localhost:8000/api/v1/articles', {data: "wooo"}, axiosConfig);
    }

    return  (
        <StyledCard as={'form'} onSubmit={createArticleHandler} >
            <h2>Skapa ett Möte</h2>
            <InputField placeholder={'Titel (inkludera ej i Artikeln, även i HTML)'} name={'title'} ref={tref} />
            <div>
                <label htmlFor="start-date">Påbörjelsedatum</label>
                <InputField id={'start-date'} type={'date'} name={'start-date'} ref={dref} />
            </div>
            <div>
                <label htmlFor="content">Innehåll</label>
                <Switch option1={'Text'} option2={'HTML'} onChange={val => setContentType(val)} value={contentType} />
            </div>
            { contentType && <div className={'warning'}>Varning, HTML attributer fungerar inte pga. att det går inte att skilja inmatade strängar från riktig kod. 'class' är den enda undantaget.</div> }
            <TextAreaAutosized id={'content'} name={'article-content'} placeholder={'Skriv artikeln här...'} className={'textarea'} ref={cref} />
            <div className={'button-row'}>
                <Button type={'button'} onClick={previewArticleHandler}>
                    Förhandsvisning
                </Button>
                <Button>
                    Skapa Möte
                </Button>
            </div>
        </StyledCard>
    )
}

export default CreateArticlePage;