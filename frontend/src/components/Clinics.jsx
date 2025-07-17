import axios from "axios";
import { useEffect, useState } from "react";
import { GoAlert } from "react-icons/go";

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
  }, []);

  const selectClinicId = (clinicId) => {
    setSelectedClinic(clinicId);
  };

  return (
    <div className="bg-gray-400 px-5 py-10">
      {ready ? (
        <>
          <div className="pt-3">
            {user ? (
              <>
                <h1 className="text-3xl font-semibold text-gray-800">
                  Clínicas
                </h1>
                <p className="pb-10 text-lg text-gray-800">
                  Bem-vindo a página de gerenciamento de clínicas. Seleciona sua
                  clínica:
                </p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {clinics.map((clinic) => (
                    <div
                      key={clinic._id}
                      className="flex min-h-[244px] w-full max-w-sm flex-col gap-5 rounded-2xl bg-gray-200 p-4 shadow-2xl"
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
              </>
            ) : (
              <div className="flex w-full items-center gap-4 rounded-xl bg-gray-200 px-4 py-2">
                <GoAlert className="text-lg" />
                <p className="text-md">
                  Faça login para ter acesso aos nossos serviços!
                </p>
              </div>
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
