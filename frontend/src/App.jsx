import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Scheduling from "./pages/Scheduling";
import Schedules from "./pages/Schedules";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Register from "./pages/Register";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);

  //RESGATA O USUARIO DO COOKIE
  useEffect(() => {
    const axiosGet = async () => {
      const response = await axios.get("user/profile");
      setUser(response.data);
    };

    axiosGet();
  }, []);
  console.log(user);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/agendas/:id/:slot/:date"
          element={<Scheduling user={user} />}
        />
        <Route path="/agendas/:id" element={<Schedules user={user} />} />
        <Route path="/user" element={<Login setUser={setUser} user={user} />} />
        <Route
          path="/register"
          element={<Register setUser={setUser} user={user} />}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
