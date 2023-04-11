import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from './About';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about/:id" element={<About />} />

    </Routes>
  );
};

export default MainRoute;
