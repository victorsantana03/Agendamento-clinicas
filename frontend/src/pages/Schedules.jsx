import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Schedules = () => {
  const { id } = useParams();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const getSchedules = async () => {
      try {
        const response = await axios.get(`/schedule/user/${id}`);
        const { data } = response;
        setSchedules(data.schedules);
      } catch (error) {
        console.log("Erro ao buscar agendamentos", error);
      }
    };
    getSchedules();
  }, []);

  console.log(schedules);
  return (
    <div className="h-screen bg-gray-400 p-10">
      <h1>Agendas</h1>
      <div>
        {schedules.length === 0 ? (
          <>
            <p>Sem agendamentos por enquanto</p>
          </>
        ) : (
          <>
            {schedules.map((schedule) => (
              <div key={schedule._id}>
                <div>
                  <h2>{schedule.clinic.name}</h2>
                  <p>{schedule.clinic.adress}</p>
                </div>
                <h3>
                  {schedule.professional.name} -{" "}
                  {schedule.professional.especialty}
                </h3>
                <div>
                  <p>
                    {schedule.date} - {schedule.slot}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Schedules;
