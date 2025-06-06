import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Clinics = ({ setSelectedClinic, user }) => {
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
    <div className="px-5 py-10">
      {ready ? (
        <>
          <h1 className="text-3xl font-semibold text-gray-800">Clínicas</h1>
          <div className="pt-3">
            <p className="pb-10 text-lg text-gray-800">
              Bem-vindo a página de gerenciamento de clínicas. Seleciona sua
              clínica:
            </p>
            {user ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {clinics.map((clinic) => (
                  <div
                    key={clinic._id}
                    className="flex min-h-[244px] w-72 flex-col gap-5 rounded-2xl bg-gray-200 p-4 shadow-2xl lg:w-sm"
                  >
                    <h2 className="text-xl font-semibold">{clinic.name}</h2>
                    <p className="text-lg">Endereço: {clinic.adress}</p>
                    <p className="text-lg">
                      Especialidade: {clinic.especialty}
                    </p>
                    <div className="text-center">
                      <button
                        onClick={() => selectClinicId(clinic._id)}
                        className="cursor-pointer rounded-lg bg-gray-600 px-4 py-2 text-gray-200"
                      >
                        Selecionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Faça login para ter acesso aos nossos serviços!</p>
            )}
          </div>
        </>
      ) : (
        <p>Servidor desligado</p>
      )}
    </div>
  );
};

export default Clinics;
