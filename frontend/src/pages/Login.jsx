import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/login", {
        email,
        password,
      });
      const { data } = response;
      alert(data.message);
      setUser(data);
    } catch (error) {
      console.log("Erro ao fazer login", error);
    }
  };

  //   if (user) return <Navigate to="/" />;

  return (
    <div className="h-screen bg-gray-400">
      <div className="flex h-screen flex-col items-center justify-center text-gray-200">
        <h1 className="pb-8 text-3xl font-bold">Login</h1>
        <form
          className="flex w-[450px] flex-col gap-10 rounded-3xl border border-gray-500 p-10"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-3">
            <label className="w-[20%] text-xl">Email:</label>
            <input
              className="w-full rounded-3xl border p-2 outline-none"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="w-[20%] text-xl">Senha:</label>
            <input
              className="w-full rounded-3xl border p-2 outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button className="cursor-pointer rounded-lg bg-gray-600 px-4 py-2 text-gray-200">
              Logar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
