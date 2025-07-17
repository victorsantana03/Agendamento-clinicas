import axios from "axios";
import { useState } from "react";
import AdminPosts from "../components/AdminPosts";

const Admin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/user/admin/login", {
        email,
        password,
      });
      const { data } = response;
      if (data.message === "Acesso liberado!") {
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.log("Erro ao acessar com Admin", error);
      alert("Credenciais inválidas!");
    }
  };

  //   if (user) return <Navigate to="/login" />;

  return (
    <div className="bg-gray-400">
      {!token ? (
        <div className="flex h-screen flex-col items-center justify-center text-gray-200">
          <h1 className="pb-8 text-3xl font-bold">Admin</h1>

          <form
            className="flex w-[450px] flex-col gap-10 rounded-3xl border border-gray-500 p-10"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-3">
              <label className="w-[20%] text-xl">Email:</label>
              <input
                type="text"
                value={email}
                placeholder="Digite o seu nome:"
                className="w-full rounded-3xl border p-2 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="w-[20%] text-xl">Senha:</label>
              <input
                type="password"
                value={password}
                placeholder="Digite a sua senha:"
                className="w-full rounded-3xl border p-2 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button className="cursor-pointer rounded-lg bg-gray-600 px-4 py-2 text-gray-200">
                Logar como Admin
              </button>
            </div>
            <div>
              <p className="text-center">
                Entre como Admin para cadastrar clínicas e profissionais
              </p>
            </div>
          </form>
        </div>
      ) : (
        <AdminPosts />
      )}
    </div>
  );
};

export default Admin;
