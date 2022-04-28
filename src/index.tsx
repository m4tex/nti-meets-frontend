import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import GlobalContextProvider from "./store/GlobalContextProvider";
import ArticlePreviewContextProvider from "./store/ArticlePreviewContextProvider";

ReactDOM.render(
    <GlobalContextProvider>
        <ArticlePreviewContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ArticlePreviewContextProvider>
    </GlobalContextProvider>,
    document.getElementById('root'));