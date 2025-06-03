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
    <div>
      {redirect && <Navigate to={`/agendas/${user._id}`} />}
      <h1>Agendamento</h1>
      <div>
        <h2>{professional.name}</h2>
        <h3>{professional.especialty}</h3>
        <p>{dateFormated}</p>
        <p>{slot}</p>
        <p>
          {clinic.name}: {clinic.adress}
        </p>
        <button onClick={handleSubmit}>Confirmar</button>
      </div>
    </div>
  );
};

export default Scheduling;
