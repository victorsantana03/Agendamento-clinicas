import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Professionals = ({ clinicId }) => {
  const [professionals, setProfessionals] = useState([]);
  const [optionSelected, setOptionselected] = useState({});
  const [dateSelected, setDateSeleceted] = useState("");

  useEffect(() => {
    if (clinicId) {
      const getProfessionals = async () => {
        try {
          const response = await axios.get("/professionals", {
            params: { clinicId },
          });
          const { data } = response;
          setProfessionals(data);

          console.log(data);
        } catch (error) {
          console.log("Erro ao buscar profissionais", error);
        }
      };
      getProfessionals();
    }
  }, [clinicId]);

  return (
    <div className="p-10">
      <h2 className="pb-10 text-3xl font-semibold">Especialistas:</h2>
      {professionals.length === 0 ? (
        <div>
          <p>Selecione uma clínica</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5">
            {professionals.map((professional) => (
              <div
                key={professional._id}
                className="flex max-w-sm flex-col gap-5 rounded-2xl bg-gray-200 p-4 shadow-2xl"
              >
                <h3 className="text-xl">Nome: {professional.name}</h3>
                <p className="text-lg">
                  Especialidade: {professional.especialty}
                </p>
                <div className="flex flex-col gap-3">
                  <p>Agenda:</p>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={dateSelected}
                      onChange={(e) => setDateSeleceted(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="cursor-pointer rounded-xl border border-gray-300 p-2"
                    />
                    <select
                      value={optionSelected[professional._id] || ""}
                      onChange={(e) =>
                        setOptionselected((prev) => ({
                          ...prev,
                          [professional._id]: e.target.value,
                        }))
                      }
                      className="cursor-pointer rounded-xl border border-gray-300 p-2"
                    >
                      <option value="" disabled>
                        Selecione um horário
                      </option>
                      {professional.agenda.map((slot, index) => (
                        <option key={index} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    to={
                      optionSelected[professional._id] && dateSelected
                        ? `/agendas/${professional._id}/${
                            optionSelected[professional._id]
                          }/${dateSelected}`
                        : "#"
                    }
                    onClick={(e) => {
                      if (!optionSelected[professional._id] || !dateSelected) {
                        e.preventDefault();
                        alert(
                          "Por favor, verifique se o horário e data foram preenchidos.",
                        );
                        return;
                      }
                    }}
                    className="cursor-pointer rounded-lg bg-gray-600 px-4 py-2 text-gray-200"
                  >
                    Agendar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Professionals;
