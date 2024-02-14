// import './App.css';

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Page from "./components/Page";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home navbar={NavBar} page={Page} />} />
      <Route exact path="/Register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
