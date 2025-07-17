import axios from "axios";
import { useState } from "react";

const AdminPostsClinic = () => {
  const [name, setName] = useState();
  const [adress, setAdress] = useState();
  const [especialty, setEspecialty] = useState();

  const token = localStorage.getItem("token");

  const handleClinic = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/clinics",
        {
          name,
          adress,
          especialty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data } = response;
      alert(data.message);
    } catch (error) {
      console.log("Erro ao criar clínica", error);
    }
  };

  return (
    <div className="w-full max-w-[400px] px-3">
      <h1 className="pb-8 text-2xl font-bold">Cadastrar nova clínica:</h1>
      <form
        className="flex w-full flex-col gap-10 rounded-3xl border border-gray-500 p-5"
        onSubmit={handleClinic}
      >
        <div className="flex flex-col">
          <label className="text-xl">Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome da clínica"
            className="w-full rounded-3xl border p-2 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xl">Endereço:</label>
          <input
            type="text"
            placeholder="Digite o endereço da clínica"
            className="w-full rounded-3xl border p-2 outline-none"
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xl">Especialidade:</label>
          <input
            type="text"
            placeholder="Digite a especialidade da clínica"
            className="w-full rounded-3xl border p-2 outline-none"
            onChange={(e) => setEspecialty(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button className="cursor-pointer rounded-lg bg-gray-600 px-4 py-2 text-gray-200">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPostsClinic;
