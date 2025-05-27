import { useEffect, useState } from "react";
import axios from "axios";

const Professionals = ({ clinicId }) => {
  const [professionals, setProfessionals] = useState([]);

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
                  <select>
                    {professional.agenda.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <button>Agendar</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Selecione uma clínica para visualizar os especialistas</h2>
        </div>
      )}
    </div>
  );
};

export default Professionals;
