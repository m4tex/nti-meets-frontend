import {useEffect} from "react";

function Logger(props: { log:any, delay:number }) {

    useEffect(() => {
        setInterval(() => console.log(props.log), props.delay);
    }, [])

    return (
        <></>
    )
}

export default Logger;