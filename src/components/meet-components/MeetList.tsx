import {useContext, useState} from "react";
import MeetItem from "./MeetItem";
import {GlobalContext} from "../../store/GlobalContextProvider";
import MeetsSearchBar from "./MeetsSearchBar";
import MeetsFilter from "./MeetsFilter";

interface Article {
    title: string,
    author: string,
    date: Date,
    description: string,
}

function MeetList(props: { data: Article[] }) {
    const {isAdmin} = useContext(GlobalContext);

    const [filter, setFilter] = useState<string>('0');
    const [searchValue, setSearchValue] = useState<string>('');

    function sortingFunction(a:Article, b:Article) {
        if (filter === '1'){
            return a.date.getTime() - b.date.getTime();
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
            {filteredArticles.map(x => <MeetItem key={Math.random()} id={'super-viktigt'} {...x} admin={isAdmin}/>)}
        </>
    )
}

export default MeetList;