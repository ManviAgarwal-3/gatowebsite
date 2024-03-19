import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";

import "./App.css";
const App = () => {
  return (
    <div>
      <svg className="blob" id="10015.io" viewBox="0 0 480 480">
        <path
          fill="#f7a478"
          d="M433,295.5Q432,351,394,396.5Q356,442,298,434.5Q240,427,180,437Q120,447,98,391Q76,335,60.5,287.5Q45,240,58.5,191.5Q72,143,100.5,95.5Q129,48,184.5,54Q240,60,284.5,73Q329,86,379,108.5Q429,131,431.5,185.5Q434,240,433,295.5Z"
        />
      </svg>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
