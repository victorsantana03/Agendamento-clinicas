import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const Scheduling = ({ user }) => {
  const { id } = useParams();
  const { slot } = useParams();
  const { date } = useParams();
  const dateFormated = new Date(date).toLocaleDateString("pt-BR");

  const [clinic, setClinic] = useState({});
  const [professional, setProfessional] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const getScheduling = async () => {
      try {
        const response = await axios.get(`/schedule/${id}`);
        const { data } = response;
        setClinic(data.clinic);
        setProfessional(data.professional);
      } catch (error) {
        console.error("Erro ao buscar agendamento", error);
      }
    };

    getScheduling();
  }, []);
  console.log(clinic);
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/schedule", {
        userId: user._id,
        professionalId: id,
        clinicId: clinic._id,
        date: dateFormated,
        slot,
      });
      const { data } = response;
      console.log(data);
      alert(data.message);
      if (data.message === "Agendamento confirmado!") {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Erro ao confirmar agendamento!", error);
    }
  };

  return (
    <div className="h-screen bg-gray-400 p-10">
      {redirect && <Navigate to={`/agendas/${user._id}`} />}
      <h1 className="pb-10 text-3xl font-semibold">Agendamento</h1>
      <div className="flex max-w-sm flex-col gap-5 rounded-2xl bg-gray-200 p-4 shadow-2xl">
        <h2 className="text-xl">{professional.name}</h2>
        <h3 className="text-lg">{professional.especialty}</h3>
        <p className="text-lg font-semibold">{dateFormated}</p>
        <p className="text-lg font-semibold">{slot}</p>
        <p className="text-lg">
          {clinic.name}: {clinic.adress}
        </p>
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="cursor-pointer rounded-lg bg-gray-600 px-4 py-2 text-gray-200"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
