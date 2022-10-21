import reactLogo from './assets/react.svg'
import {useState} from "react";

export default function Home () {
    const [count, setCount] = useState(0)

    return <>
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
            <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

        <h3>TODO</h3>
        <ul>
            <li>Calendar</li>
            <li>Timesheet</li>
            <li>Time Category</li>
            <li>Total amount of hours needed to meet goal</li>
            <li>Administration / Customization panel</li>
            <li>Default start end time</li>
        </ul>
    </>;
}