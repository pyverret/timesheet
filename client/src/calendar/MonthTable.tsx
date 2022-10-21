import {useEffect, useState} from "react";
import DayRow from "./DayRow";

type Props = {
    year: number;
    month: number;
}

export default function MonthTable({year, month}: Props): JSX.Element {
    const numberOfDays = new Date(year, month, 0).getDate();
    const [savedData, setSavedData] = useState([]);

    async function getData () {
        const response = await fetch(`http://localhost:8080/api/calendar/${year}/${month}`)
        return await response.json();
    }

    useEffect(() => {
        getData().then(data => {
            if (data) {
                setSavedData(data);
            }
        });

        return () => {
            console.log('CLEAN');
            setSavedData([]);
        };
    }, [year, month]);

    return <table>
        <thead>
        <tr>
            <th>Date</th>
            <th>Jour</th>
            <th>Category</th>
            <th>Note</th>
            <th>AM In</th>
            <th>AM Out</th>
            <th>AM Total</th>
            <th>PM In</th>
            <th>PM Out</th>
            <th>PM Total</th>
            <th>Day Total</th>
            <th>Day Balance</th>
            <th>Needed</th>
        </tr>
        </thead>
        <tbody>
        {
            numberOfDays && [...Array(numberOfDays)].map((e, i) => {
                const date = i + 1;

                return <DayRow key={year+month+i} date={date} year={year} month={month} savedData={savedData} />;
            })
        }
        </tbody>
    </table>;
}