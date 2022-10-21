import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

interface News {
    id: number;
    title: string;
    content: string;

}

export default function News () {
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        async function getNews(): Promise<void> {
            const response = await fetch('/api/news');
            setNews(await response.json());
        }

        getNews();
    }, []);

    return <>
            <h1>News</h1>
            {
                news.map((element) => <div key={element.id}>
                        <Link to={`/news/${element.id}`}>
                        <h2>{element.title}</h2>
                        <p>{element.content}</p>
                    </Link>
                </div>)
            }
        </>;
}