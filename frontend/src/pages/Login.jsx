import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user", {
        name,
        email,
      });
      const { data } = response;
      alert(data.message);
      setUser(data);
    } catch (error) {
      console.log("Erro ao fazer login", error);
    }
  };
  return (
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button>Logar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
