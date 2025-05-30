import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Scheduling from "./pages/Scheduling";
import Schedules from "./pages/Schedules";
import Login from "./pages/Login";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/user");
        const { data } = response;
        setUser(data[0]);
      } catch (error) {
        console.log("Erro ao buscar usuários", error);
      }
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/agendas/:id/:slot/:date"
          element={<Scheduling user={user} />}
        />
        <Route path="/agendas/:id" element={<Schedules />} />
        <Route path="/user" element={<Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
