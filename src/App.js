import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import { useEffect } from "react";
import users from "./User.json";
import films from './Film.json';
function App() {
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("films", JSON.stringify(films));
  }, []);



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
