import {useContext, useState} from "react";
import MeetItem from "./MeetItem";
import {GlobalContext} from "../../store/GlobalContextProvider";
import MeetsSearchBar from "./MeetsSearchBar";
import MeetsFilter from "./MeetsFilter";
import styled from "styled-components";

const Msg = styled.p`
  display: block;
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
  font-weight: bold;
`;

interface Article {
    id:string,
    title: string,
    author: string,
    date: string,
    description: string,
}

function MeetList(props: { data: Article[] }) {
    const {isAdmin} = useContext(GlobalContext);

    const [filter, setFilter] = useState<string>('0');
    const [searchValue, setSearchValue] = useState<string>('');

    function sortingFunction(a:Article, b:Article) {
        if (filter === '1'){
            const A = new Date(a.date);
            const B = new Date(b.date);
            return A.getTime() - B.getTime();
        }
        if(filter === '2'){
            const A = a.title.toUpperCase();
            const B = b.title.toUpperCase();
            return A < B ? -1 : A > B ? 1 : 0;
        }
        if(filter === '3'){
            const A = a.author.toUpperCase();
            const B = b.author.toUpperCase();
            return A < B ? -1 : A > B ? 1 : 0;
        }

        return 0;
    }
    function filteringFunction(val:Article){
        return val.title.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1;
    }

    const filteredArticles = props.data.filter(filteringFunction).sort(sortingFunction);

    return (
        <>
            <MeetsSearchBar onSearch={e=>setSearchValue(e.target.value)} value={searchValue} />
            <MeetsFilter onFilter={e=>setFilter(e.target.value)} value={filter}/>
            {filteredArticles.length ? filteredArticles.map(x => <MeetItem key={x.id} {...x} admin={isAdmin}/>) : <Msg>Inga resultat</Msg>}
        </>
    )
}

export default MeetList;