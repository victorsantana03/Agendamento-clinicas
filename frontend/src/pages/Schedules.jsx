import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Schedules = () => {
  const { id } = useParams();
  const [schedules, setSchedules] = useState([] || null);

  //Chamada para buscar os agendamentos do usuário
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const response = await axios.get(`/schedule/user/${id}`);
        const { data } = response;
        setSchedules(data.schedules || []);
      } catch (error) {
        console.log("Erro ao buscar agendamentos", error);
      }
    };
    getSchedules();
  }, [id]);

  //Função para cancelar agendamento
  const cancelSchedule = async (scheduleId) => {
    try {
      const response = await axios.put(`/schedule/cancel/${scheduleId}`);
      const { data } = response;
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule._id === scheduleId
            ? { ...schedule, status: "cancelado" }
            : schedule,
        ),
      );
      alert(data.message);
    } catch (error) {
      console.error("Erro ao cancelar agendamento!", error);
    }
  };

  //Função para deletar agendamento
  const deletSchedule = async (scheduleId) => {
    try {
      const response = await axios.delete(`/schedule/delete/${scheduleId}`);
      const { data } = response;
      alert(data.message);
      setSchedules((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule._id !== scheduleId),
      );
    } catch (error) {
      console.error("Erro ao deletar agendamneto!", error);
    }
  };

  return (
    <div className="h-screen bg-gray-400 p-10 pt-30">
      <h1 className="pb-10 text-3xl font-semibold">Agendas</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {schedules.length === 0 ? (
          <>
            <p className="text-xl font-semibold text-gray-200">
              Sem agendamentos por enquanto
            </p>
          </>
        ) : (
          <>
            {schedules.map((schedule) => (
              <div
                key={schedule._id}
                className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-gray-200 p-4 shadow-2xl"
              >
                <div className="flex justify-between">
                  <div>
                    <h2>{schedule.clinic.name}</h2>
                    <p>{schedule.clinic.adress}</p>
                  </div>
                  {schedule.status === "cancelado" && (
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => {
                        deletSchedule(schedule._id);
                      }}
                    />
                  )}
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
                <div className="flex items-center justify-between">
                  <p
                    className={`${schedule.status === "cancelado" ? "text-red-500" : "text-orange-500"} underline`}
                  >
                    {schedule.status}
                  </p>

                  {schedule.status === "cancelado" ? (
                    <></>
                  ) : (
                    <button
                      className="cursor-pointer underline"
                      onClick={() => {
                        cancelSchedule(schedule._id);
                      }}
                    >
                      Cancelar agenda
                    </button>
                  )}
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
