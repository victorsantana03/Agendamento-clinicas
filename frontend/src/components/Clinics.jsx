import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Clinics = ({ setSelectedClinic }) => {
  const [clinics, setClinics] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getClinics = async () => {
      try {
        const response = await axios.get("/clinics");
        const { data } = response;
        setClinics(data);
        setReady(true);
      } catch (error) {
        console.log("Erro ao buscas clientes", error);
      }
    };
    getClinics();
  }, [clinics]);

  const selectClinicId = (clinicId) => {
    setSelectedClinic(clinicId);
  };
  return (
    <div>
      {ready ? (
        <>
          <h1>Clínicas</h1>
          <div>
            <p>
              Bem-vindo a página de gerenciamento de clínicas. Seleciona sua
              clínica:
            </p>
            <div>
              {clinics.map((clinic) => (
                <div key={clinic._id}>
                  <h2>{clinic.name}</h2>
                  <p>Endereço: {clinic.adress}</p>
                  <p>Especialidade: {clinic.especialty}</p>
                  <button onClick={() => selectClinicId(clinic._id)}>
                    Selecionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Servidor desligado</p>
      )}
    </div>
  );
};

export default Clinics;
