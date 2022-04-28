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
    date: Date,
}

const DUMMY_DATA = {
    html: false,
    title: "Super Viktigt",
    author: "Måns Rosenfors",
    date: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum metus tellus, sagittis a tincidunt at, imperdiet non justo. Donec id magna nunc. Sed dapibus sollicitudin nibh eu molestie. Duis quis mauris eget dui efficitur rutrum. Proin commodo purus id erat maximus commodo. Suspendisse vehicula dui hendrerit sapien porta sodales. Maecenas posuere lorem in sem iaculis tincidunt. Nulla bibendum enim at turpis auctor, quis viverra dui semper. Praesent rhoncus pulvinar justo at viverra. Aenean ultricies varius iaculis." +
        "Phasellus auctor suscipit ligula, sit amet interdum enim congue vehicula. Proin bibendum augue non diam sollicitudin ultrices. Quisque tempor mollis mauris vel varius. Phasellus ut vulputate ipsum. Nullam ac feugiat lacus. Praesent tempus bibendum lorem vitae porttitor. Maecenas ac gravida nulla." +
        "Aliquam quis velit ac orci mattis sagittis. Quisque quis quam dapibus, facilisis sapien id, accumsan urna. Nunc non dolor vel eros ultrices hendrerit nec ac nibh. Sed condimentum dolor et maximus iaculis. Aenean malesuada purus at nisl rutrum, id tempus turpis tincidunt. Vivamus hendrerit laoreet enim vel aliquet. In vitae elit eu felis cursus molestie. Quisque at magna ut lorem rutrum iaculis." +
        "Nam ante eros, vestibulum quis diam vitae, interdum fringilla augue. Quisque tempor tristique mauris quis aliquet. In hac habitasse platea dictumst. Nullam aliquam orci vel arcu tincidunt, eget luctus nunc sagittis. Quisque eget aliquam urna. Suspendisse potenti. Curabitur venenatis sodales ante in ornare. Vivamus venenatis, eros a gravida tempor, libero metus molestie tellus, at accumsan sem diam sed est." +
        "Duis vitae ex feugiat, vulputate erat a, sagittis metus. Mauris vel aliquet enim, nec feugiat erat. Etiam faucibus, elit at pretium vulputate, dui elit semper orci, quis semper lacus diam mattis ligula. Vestibulum eu justo interdum, malesuada mi quis, faucibus massa. Donec auctor ante lectus, vitae hendrerit ex posuere et. Aliquam sodales urna eu elit maximus efficitur. Proin auctor ipsum dignissim nisl dignissim efficitur. Ut nec porttitor nisi. Maecenas aliquam ultrices sem sed porttitor. Donec imperdiet pellentesque iaculis. Duis id augue velit." +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum metus tellus, sagittis a tincidunt at, imperdiet non justo. Donec id magna nunc. Sed dapibus sollicitudin nibh eu molestie. Duis quis mauris eget dui efficitur rutrum. Proin commodo purus id erat maximus commodo. Suspendisse vehicula dui hendrerit sapien porta sodales. Maecenas posuere lorem in sem iaculis tincidunt. Nulla bibendum enim at turpis auctor, quis viverra dui semper. Praesent rhoncus pulvinar justo at viverra. Aenean ultricies varius iaculis." +
        "Phasellus auctor suscipit ligula, sit amet interdum enim congue vehicula. Proin bibendum augue non diam sollicitudin ultrices. Quisque tempor mollis mauris vel varius. Phasellus ut vulputate ipsum. Nullam ac feugiat lacus. Praesent tempus bibendum lorem vitae porttitor. Maecenas ac gravida nulla." +
        "Aliquam quis velit ac orci mattis sagittis. Quisque quis quam dapibus, facilisis sapien id, accumsan urna. Nunc non dolor vel eros ultrices hendrerit nec ac nibh. Sed condimentum dolor et maximus iaculis. Aenean malesuada purus at nisl rutrum, id tempus turpis tincidunt. Vivamus hendrerit laoreet enim vel aliquet. In vitae elit eu felis cursus molestie. Quisque at magna ut lorem rutrum iaculis." +
        "Nam ante eros, vestibulum quis diam vitae, interdum fringilla augue. Quisque tempor tristique mauris quis aliquet. In hac habitasse platea dictumst. Nullam aliquam orci vel arcu tincidunt, eget luctus nunc sagittis. Quisque eget aliquam urna. Suspendisse potenti. Curabitur venenatis sodales ante in ornare. Vivamus venenatis, eros a gravida tempor, libero metus molestie tellus, at accumsan sem diam sed est." +
        "Duis vitae ex feugiat, vulputate erat a, sagittis metus. Mauris vel aliquet enim, nec feugiat erat. Etiam faucibus, elit at pretium vulputate, dui elit semper orci, quis semper lacus diam mattis ligula. Vestibulum eu justo interdum, malesuada mi quis, faucibus massa. Donec auctor ante lectus, vitae hendrerit ex posuere et. Aliquam sodales urna eu elit maximus efficitur. Proin auctor ipsum dignissim nisl dignissim efficitur. Ut nec porttitor nisi. Maecenas aliquam ultrices sem sed porttitor. Donec imperdiet pellentesque iaculis. Duis id augue velit." +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum metus tellus, sagittis a tincidunt at, imperdiet non justo. Donec id magna nunc. Sed dapibus sollicitudin nibh eu molestie. Duis quis mauris eget dui efficitur rutrum. Proin commodo purus id erat maximus commodo. Suspendisse vehicula dui hendrerit sapien porta sodales. Maecenas posuere lorem in sem iaculis tincidunt. Nulla bibendum enim at turpis auctor, quis viverra dui semper. Praesent rhoncus pulvinar justo at viverra. Aenean ultricies varius iaculis." +
        "Phasellus auctor suscipit ligula, sit amet interdum enim congue vehicula. Proin bibendum augue non diam sollicitudin ultrices. Quisque tempor mollis mauris vel varius. Phasellus ut vulputate ipsum. Nullam ac feugiat lacus. Praesent tempus bibendum lorem vitae porttitor. Maecenas ac gravida nulla." +
        "Aliquam quis velit ac orci mattis sagittis. Quisque quis quam dapibus, facilisis sapien id, accumsan urna. Nunc non dolor vel eros ultrices hendrerit nec ac nibh. Sed condimentum dolor et maximus iaculis. Aenean malesuada purus at nisl rutrum, id tempus turpis tincidunt. Vivamus hendrerit laoreet enim vel aliquet. In vitae elit eu felis cursus molestie. Quisque at magna ut lorem rutrum iaculis." +
        "Nam ante eros, vestibulum quis diam vitae, interdum fringilla augue. Quisque tempor tristique mauris quis aliquet. In hac habitasse platea dictumst. Nullam aliquam orci vel arcu tincidunt, eget luctus nunc sagittis. Quisque eget aliquam urna. Suspendisse potenti. Curabitur venenatis sodales ante in ornare. Vivamus venenatis, eros a gravida tempor, libero metus molestie tellus, at accumsan sem diam sed est." +
        "Duis vitae ex feugiat, vulputate erat a, sagittis metus. Mauris vel aliquet enim, nec feugiat erat. Etiam faucibus, elit at pretium vulputate, dui elit semper orci, quis semper lacus diam mattis ligula. Vestibulum eu justo interdum, malesuada mi quis, faucibus massa. Donec auctor ante lectus, vitae hendrerit ex posuere et. Aliquam sodales urna eu elit maximus efficitur. Proin auctor ipsum dignissim nisl dignissim efficitur. Ut nec porttitor nisi. Maecenas aliquam ultrices sem sed porttitor. Donec imperdiet pellentesque iaculis. Duis id augue velit." +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum metus tellus, sagittis a tincidunt at, imperdiet non justo. Donec id magna nunc. Sed dapibus sollicitudin nibh eu molestie. Duis quis mauris eget dui efficitur rutrum. Proin commodo purus id erat maximus commodo. Suspendisse vehicula dui hendrerit sapien porta sodales. Maecenas posuere lorem in sem iaculis tincidunt. Nulla bibendum enim at turpis auctor, quis viverra dui semper. Praesent rhoncus pulvinar justo at viverra. Aenean ultricies varius iaculis." +
        "Phasellus auctor suscipit ligula, sit amet interdum enim congue vehicula. Proin bibendum augue non diam sollicitudin ultrices. Quisque tempor mollis mauris vel varius. Phasellus ut vulputate ipsum. Nullam ac feugiat lacus. Praesent tempus bibendum lorem vitae porttitor. Maecenas ac gravida nulla." +
        "Aliquam quis velit ac orci mattis sagittis. Quisque quis quam dapibus, facilisis sapien id, accumsan urna. Nunc non dolor vel eros ultrices hendrerit nec ac nibh. Sed condimentum dolor et maximus iaculis. Aenean malesuada purus at nisl rutrum, id tempus turpis tincidunt. Vivamus hendrerit laoreet enim vel aliquet. In vitae elit eu felis cursus molestie. Quisque at magna ut lorem rutrum iaculis." +
        "Nam ante eros, vestibulum quis diam vitae, interdum fringilla augue. Quisque tempor tristique mauris quis aliquet. In hac habitasse platea dictumst. Nullam aliquam orci vel arcu tincidunt, eget luctus nunc sagittis. Quisque eget aliquam urna. Suspendisse potenti. Curabitur venenatis sodales ante in ornare. Vivamus venenatis, eros a gravida tempor, libero metus molestie tellus, at accumsan sem diam sed est." +
        "Duis vitae ex feugiat, vulputate erat a, sagittis metus. Mauris vel aliquet enim, nec feugiat erat. Etiam faucibus, elit at pretium vulputate, dui elit semper orci, quis semper lacus diam mattis ligula. Vestibulum eu justo interdum, malesuada mi quis, faucibus massa. Donec auctor ante lectus, vitae hendrerit ex posuere et. Aliquam sodales urna eu elit maximus efficitur. Proin auctor ipsum dignissim nisl dignissim efficitur. Ut nec porttitor nisi. Maecenas aliquam ultrices sem sed porttitor. Donec imperdiet pellentesque iaculis. Duis id augue velit.",
}

function ArticlePage() {
    const [searchParams] = useSearchParams();
    const [articleData, setArticleData] = useState<Article>(DUMMY_DATA);
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
        if (searchParams.has('prev')){
            setArticleData(artPreviewCtx.articlePreviewData);
        }
    }, [searchParams]);

    useEffect(() => {
        function checkForClickOutside(e:MouseEvent) {
            if (e.target && e.target !== optRef.current) {
                setOptListOpen(false);
            }
        }
        document.addEventListener('mousedown', checkForClickOutside);
        return () => document.removeEventListener('mousedown', checkForClickOutside); //Yay, I caused a memory leak (this line fixes it)
    }, [])

    return (
        <StyledCard as={'article'}>
            { searchParams.has('prev') && <Button className={'back-btn'} onClick={backToPrevHandler}>Gå tillbaks</Button>}
            <span className={'material-icons'} onClick={optListHandler}>
                expand_more
            </span>
            {optListOpen && <div className={'optList'} onClick={() => globalCtx.addFavorite(searchParams.get('id'))}>Markera som favorit</div>}
            <div className={'date'} ref={optRef}>
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