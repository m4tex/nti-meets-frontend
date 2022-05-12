import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import GlobalContextProvider from "./store/GlobalContextProvider";
import ArticlePreviewContextProvider from "./store/ArticlePreviewContextProvider";
import ArticleContextRenderer from "./store/ArticleContextRenderer";

ReactDOM.render(
    <BrowserRouter>
        <GlobalContextProvider>
            <ArticlePreviewContextProvider>
                <ArticleContextRenderer>
                    <App/>
                </ArticleContextRenderer>
            </ArticlePreviewContextProvider>
        </GlobalContextProvider>
    </BrowserRouter>,
    document.getElementById('root'));