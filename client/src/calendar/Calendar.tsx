import MonthTable from "./MonthTable";
import {useState} from "react";

export default function Calendar () {
    const currentDate = new Date();

    const formatSelectedDate = (date: Date) => {
        const year = date.getFullYear();
        let month = (currentDate.getMonth() + 1).toString();
        month = month.length < 2 ? '0' + month : month;

        return year + '-' + month;
    }

    const [displayedMonth, setDisplayedMonth] = useState({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1
    });
    const [selectedDate, setSelectedDate] = useState(formatSelectedDate(currentDate));

    return <>
        <h1>Calendar</h1>

        <input type="month" id="selectedDate" name="selectedDate" defaultValue={selectedDate} onChange={(event) => {
            const date = event.target.value.split('-');
            setSelectedDate(event.target.value);
            setDisplayedMonth({
                year: parseInt(date[0]),
                month: parseInt(date[1])
            });
        }} />

        <form onSubmit={(event)=> event.preventDefault()}>
            <MonthTable
                year={displayedMonth.year}
                month={displayedMonth.month}
            />
        </form>
    </>;
}