import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Scheduling from "./pages/Scheduling";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/users");
        const { data } = response;
        setUser(data[0]);
        console.log(data);
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
        <Route path="/" element={<Home />} />
        <Route path="/agendas/:id/:slot" element={<Scheduling />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
