import { Link } from "react-router-dom";

export default function TopNavigation () {
    return <nav>
        <nav>
            <Link to="/">Home | </Link>
            <Link to="/news">News | </Link>
            <Link to="/calendar">Calendar</Link>
        </nav>
    </nav>;
}