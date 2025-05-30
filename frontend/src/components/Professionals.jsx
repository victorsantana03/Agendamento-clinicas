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
    <div>
      {clinicId ? (
        <div>
          <h2>Especialistas:</h2>
          <div>
            {professionals.map((professional) => (
              <div key={professional._id}>
                <h3>Nome: {professional.name}</h3>
                <p>Especialidade: {professional.especialty}</p>
                <div>
                  <p>Agenda:</p>
                  <div>
                    <input
                      type="date"
                      value={dateSelected}
                      onChange={(e) => setDateSeleceted(e.target.value)}
                    />
                    <select
                      value={optionSelected[professional._id] || ""}
                      onChange={(e) =>
                        setOptionselected((prev) => ({
                          ...prev,
                          [professional._id]: e.target.value,
                        }))
                      }
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
                        "Por favor, verifique se o horário e data foram preenchidos."
                      );
                      return;
                    }
                  }}
                >
                  Agendar
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Professionals;
