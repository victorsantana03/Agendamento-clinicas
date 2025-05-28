import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Scheduling = () => {
  const { id } = useParams();
  const { slot } = useParams();
  console.log(id, slot);

  useEffect(() => {
    const getScheduling = async () => {
      try {
        const response = await axios.get(`/schedules/${id}/${slot}`);
      } catch (error) {}
    };
  }, [id || slot]);

  return (
    <div>
      <h1>Agendamento</h1>
      <div>
        <h2>Nome Especialista</h2>
        <h3>Especialidade</h3>
        <p>Horario</p>
        <p>Nome e endereço da clinica</p>
        <button>Confirmar</button>
      </div>
    </div>
  );
};

export default Scheduling;
