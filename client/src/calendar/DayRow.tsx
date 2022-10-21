import {useEffect, useState} from "react";

type Props = {
    date: number,
    year: number,
    month: number,
    savedData: any[]
}

export default function DayRow({date, year, month, savedData}: Props): JSX.Element {
    const dateId: string = year + '/' + month + '/' + date;

    const [description, setDescription] = useState('');
    const [startAm, setStartAm] = useState('');
    const [endAm, setEndAm] = useState('');
    const [startPm, setStartPm] = useState('');
    const [endPm, setEndPm] = useState('');
    const [totalAm, setTotalAm] = useState('0:00');
    const [totalPm, setTotalPm] = useState('0:00');
    const [totalDay, setTotalDay] = useState('0:00');

    const getTotalDay = (): string => {
        const am = totalAm.split(':');
        const pm = totalPm.split(':');

        const hours = parseInt(am[0]) + parseInt(pm[0]);
        let minutes: number | string = parseInt(am[1]) + parseInt(pm[1]);
        minutes = minutes >= 10 ? minutes : '0' + minutes;

        return hours + ':' + minutes;
    }

    const saveData = async () => {
        const newTotalDay = getTotalDay();
        setTotalDay(newTotalDay);

        await fetch(`http://localhost:8080/api/calendar/${year}/${month}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                date: dateId,
                description: description,
                startAm: startAm || '',
                endAm: endAm || '',
                startPm: startPm || '',
                endPm: endPm || '',
                total: newTotalDay || ''
            })
        })
    }

    useEffect(() => {
        const originalData: any = savedData.find((item: any) => item.date === dateId);

        if (originalData) {
            setDescription(originalData.description);
            setStartAm(originalData.startAm);
            setEndAm(originalData.endAm);
            setStartPm(originalData.startPm);
            setEndPm(originalData.endPm);
        }
    }, [savedData]);

    useEffect(() => {
        const start: string[] = startAm.split(':');
        const end: string[] = endAm.split(':');

        if(start.length === 2 && end.length === 2) {
            const hours: number = parseInt(end[0]) - parseInt(start[0]);
            let minutes: number | string = parseInt(end[1]) - parseInt(start[1]);
            minutes = minutes >= 10 ? minutes : '0' + minutes;

            setTotalAm(hours + ':' + minutes);
        } else {
            setTotalAm('0:00');
        }
    }, [startAm, endAm]);

    useEffect(() => {
        const start: string[] = startPm.split(':');
        const end: string[] = endPm.split(':');

        if(start.length === 2 && end.length === 2) {
            const hours: number = parseInt(end[0]) - parseInt(start[0]);
            let minutes: number | string = parseInt(end[1]) - parseInt(start[1]);
            minutes = minutes >= 10 ? minutes : '0' + minutes;

            setTotalPm(hours + ':' + minutes);
        } else {
            setTotalPm('0:00');
        }
    }, [startPm, endPm]);

    useEffect(() => {
        if (totalAm !== '0:00') {
            saveData();
        }
    }, [totalAm]);

    useEffect(() => {
        if (totalPm !== '0:00') {
            saveData();
        }
    }, [totalPm]);

    return <tr>
        <td>{date}</td>
        <td>{new Date(year, month, date).toLocaleString('default', {weekday: 'long'})}</td>
        <td></td>
        <td></td>
        <td>
            <input
                id={'note-' + year + month + date}
                name={'note-' + year + month + date}
                type="text"
                defaultValue={description}
                onBlur={(event) => setDescription(event.target.value)}
            />
        </td>
        <td>
            <input
                id={'am-in-' + year + month + date}
                name={'am-in-' + year + month + date}
                type="time"
                defaultValue={startAm}
                onChange={(event) => setStartAm(event.target.value)}
            />
        </td>
        <td>
            {/*TODO: Manage negatives*/}
            <input
                id={'am-out-' + year + month + date}
                name={'am-out-' + year + month + date}
                type="time"
                defaultValue={endAm}
                onChange={(event) => setEndAm(event.target.value)}
            />
        </td>
        <td>{totalAm}</td>
        <td>
            {/*TODO: Manage negatives*/}
            <input
                id={'pm-in-' + year + month + date}
                name={'pm-in-' + year + month + date}
                type="time"
                defaultValue={startPm}
                onChange={(event) => setStartPm(event.target.value)}
            />
        </td>
        <td>
            {/*TODO: Manage negatives*/}
            <input
                id={'pm-out-' + year + month + date}
                name={'pm-out-' + year + month + date}
                type="time"
                defaultValue={endPm}
                onChange={(event) => setEndPm(event.target.value)}
            />
        </td>
        <td>{totalPm}</td>
        <td>{totalDay}</td>
        <td></td>
        <td></td>
    </tr>;
}
