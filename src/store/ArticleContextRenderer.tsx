import ArticleContextProvider from "./ArticleContextProvider";
import {ReactNode, useContext} from "react";
import {GlobalContext} from "./GlobalContextProvider";

function ArticleContextRenderer(props: { children: ReactNode }) {
    const globalCtx = useContext(GlobalContext);

    if (globalCtx.triedSSO) {
        return (
            <ArticleContextProvider>
                {props.children}
            </ArticleContextProvider>
        )
    }
    else {
        return (
            <>{props.children}</>
        )
    }
}

export default ArticleContextRenderer;