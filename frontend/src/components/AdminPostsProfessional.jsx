import axios from "axios";
import React, { useState } from "react";

const AdminPostsProfessional = () => {
  const [name, setName] = useState();
  const [especialty, setEspecialty] = useState();
  const [clinicId, setClinicId] = useState();
  const [agenda, setAgenda] = useState();

  const token = localStorage.getItem("token");

  const handleProfessional = async (e) => {
    e.preventDefault();

    //TRANSFORMA O TEXTO EM ARRAY
    const agendaArray = agenda
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      const response = await axios.post(
        "/professionals",
        {
          name,
          especialty,
          clinicId,
          agenda: agendaArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data } = response;
      alert(data);
    } catch (error) {
      console.log("Erro ao criar profissional", error);
    }
  };

  return (
    <div className="w-full max-w-[400px] px-3">
      <h1 className="pb-8 text-2xl font-bold">Cadastrar novo profissional:</h1>
      <form
        className="flex flex-col gap-10 rounded-3xl border border-gray-500 p-5"
        onSubmit={handleProfessional}
      >
        <div className="flex flex-col">
          <label className="text-xl">Nome:</label>
          <input
            type="text"
            value={name}
            placeholder="Digite o nome do profissional"
            className="w-full rounded-3xl border p-2 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xl">Especialidade:</label>
          <input
            type="text"
            value={especialty}
            placeholder="Digite a especialidade do profissional"
            className="w-full rounded-3xl border p-2 outline-none"
            onChange={(e) => setEspecialty(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xl">ID da clínica:</label>
          <input
            type="text"
            value={clinicId}
            placeholder="Digite o ID da clínica referente ao profissional"
            className="w-full rounded-3xl border p-2 outline-none"
            onChange={(e) => setClinicId(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xl">Horários disponíveis:</label>
          <input
            type="text"
            value={agenda}
            placeholder="08:00, 09:00, 10:00"
            className="w-full rounded-3xl border p-2 outline-none"
            onChange={(e) => setAgenda(e.target.value)}
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

export default AdminPostsProfessional;
