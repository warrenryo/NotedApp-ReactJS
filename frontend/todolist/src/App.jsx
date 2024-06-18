import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Home, Login, Signup } from "./components/components";
import "preline/preline";
const routes = (
  <Routes>
    <Route path="/dashboard" exact element={<Home />} />
    <Route path="/" exact element={<Login />} />
    <Route path="/signup" exact element={<Signup />} />
  </Routes>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);
  return <div>{routes}</div>;
}

export default App;
