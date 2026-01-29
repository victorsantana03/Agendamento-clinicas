import Home from "./pages/Home";
import Header from "./components/Header";
import Scheduling from "./pages/Scheduling";
import Schedules from "./pages/Schedules";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Register from "./pages/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import { useUserStore } from "./store/user.js";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const { setUser } = useUserStore();

  //RESGATA O USUARIO DO COOKIE
  useEffect(() => {
    const axiosGet = async () => {
      const response = await axios.get("user/profile");
      setUser(response.data);
    };

    axiosGet();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendas/:id/:slot/:date" element={<Scheduling />} />
        <Route path="/agendas/:id" element={<Schedules />} />
        <Route path="/user" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//victor@123.com
//admin@victoradmin123.com
