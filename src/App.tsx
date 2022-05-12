import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { GlobalContext } from "./store/GlobalContextProvider";
import {useContext} from "react";
import NotFoundPage from "./pages/NotFoundPage";
import MeetsDisplayPage from "./pages/MeetsDisplayPage";
import LoginPage from "./pages/LoginPage";
import ArticlePage from "./pages/ArticlePage";
import SignUpPage from "./pages/SignUpPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import ArchivePage from "./pages/ArchivePage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
    let globalContext = useContext(GlobalContext);

  return (
    <Routes>
        <Route path={'/'} element={<Layout />}>
            { globalContext.isLoggedIn &&
                <>
                    <Route path={'/flode'} element={<MeetsDisplayPage  />} />
                    <Route path={'/arkiv'} element={<ArchivePage />} />
                    <Route path={'/favoriter'} element={<FavoritesPage />} />
                    {globalContext.isAdmin && <Route path={'/skapa-mote'} element={<CreateArticlePage />} />}
                    <Route path={'/artikel'} element={<ArticlePage />} />
                </>
            }
            { globalContext.triedSSO &&
                <>
                    <Route path={'/skapa-konto'} element={ globalContext.isLoggedIn ? <Navigate to={'/flode'}/> : <SignUpPage />} />
                    <Route path='logga-in' element={ globalContext.isLoggedIn ? <Navigate to={'/flode'}/> : <LoginPage />} />
                    <Route path={'*'} element={<NotFoundPage />} />
                </>
            }
        </Route>
    </Routes>
  );
}

export default App;