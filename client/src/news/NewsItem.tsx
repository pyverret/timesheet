import {useParams} from "react-router-dom";
import {useEffect} from "react";

export default function NewsItem () {
    const {id} = useParams();

    useEffect(() => {
        console.log(id);
    }, []);

    return <h1>Something</h1>;
}