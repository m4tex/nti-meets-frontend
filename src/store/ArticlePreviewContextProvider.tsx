import React, {ReactNode, useState} from "react";
import {Article} from "../pages/ArticlePage";

const ctxInit = {
    articlePreviewData: {
        html:false,
        author:"",
        title:"",
        date: "",
        content:"",
    },
    setArticlePreviewData: (data: Article) => {},
}

type ArticlePreviewContextData = typeof ctxInit;

export const ArticlePreviewContext = React.createContext(ctxInit)

function ArticlePreviewContextProvider(props: { children: ReactNode }) {
    const [ctxData, setCtxData] = useState<ArticlePreviewContextData>({
        ...ctxInit,
        setArticlePreviewData: (data: Article ) => {
            console.log(data);
            setCtxData(prevState => ({
                ...prevState,
                articlePreviewData: data
            }))
        },
    })

    return (
        <ArticlePreviewContext.Provider value={ctxData}>
            {props.children}
        </ArticlePreviewContext.Provider>
    )
}

export default ArticlePreviewContextProvider;