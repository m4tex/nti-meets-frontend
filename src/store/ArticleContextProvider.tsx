import React, {ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";
import {GlobalContext} from "./GlobalContextProvider";

interface Article {
    id: string,
    title: string,
    author: string,
    date: string,
    description: string,
}

interface ArticleCtx {
    articles: Article[],
    refresh: () => void
}

const initState = {
    articles: [] as Article[],
    refresh: () => {},
}

export const ArticleContext = React.createContext(initState);

function ArticleContextProvider(props: { children: ReactNode }) {
    const [artCtx, setArtCtx] = useState<ArticleCtx>(initState);
    const globalCtx = useContext(GlobalContext);

    function fetchArticles() {
        axios.get('http://localhost:8000/api/v1/articles/', {withCredentials: true}).then(res => {
            setArtCtx({
                articles: res.data.articles,
                refresh: fetchArticles
            });
            if (globalCtx.favorites) {
                globalCtx.favorites.forEach((id) => {
                    if (!res.data.articles.includes(id)) {
                        globalCtx.removeFavorite(id);
                    }
                });
            }
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <ArticleContext.Provider value={artCtx}>
            {props.children}
        </ArticleContext.Provider>
    )
}

export default ArticleContextProvider;