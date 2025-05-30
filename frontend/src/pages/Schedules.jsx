import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Schedules = () => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getSchedules = async () => {
      try {
        const response = await axios.get(`/schedule/user/${id}`);
        const { data } = response;
        console.log(data);
      } catch (error) {
        console.log("Erro ao buscar agendamentos", error);
      }
    };
    getSchedules();
  }, []);
  return (
    <div>
      <h1>Agendas</h1>
    </div>
  );
};

export default Schedules;
