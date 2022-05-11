import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import GlobalContextProvider from "./store/GlobalContextProvider";
import ArticlePreviewContextProvider from "./store/ArticlePreviewContextProvider";
import ArticleContextProvider from "./store/ArticleContextProvider";

ReactDOM.render(
    <BrowserRouter>
        <GlobalContextProvider>
            <ArticlePreviewContextProvider>
                <ArticleContextProvider>
                    <App/>
                </ArticleContextProvider>
            </ArticlePreviewContextProvider>
        </GlobalContextProvider>
    </BrowserRouter>,
    document.getElementById('root'));