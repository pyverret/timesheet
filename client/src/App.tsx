import { useState } from 'react'
import './App.css'
import TopNavigation from "./global/TopNavigation";
import Home from "./Home";
import {Route, Routes} from "react-router-dom";
import News from "./news/News";
import NewsItem from "./news/NewsItem";
import Calendar from "./calendar/Calendar";

function App() {
  return (
      <div className="App">
          <TopNavigation />
          <hr />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsItem />} />
              <Route path="/calendar" element={<Calendar />} />
          </Routes>
    </div>
  )
}

export default App
