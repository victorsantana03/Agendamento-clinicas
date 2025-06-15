import { Clinic } from "../../models/clinic/clinic.js";

//LISTAR TODAS AS CLÍNICAS
export const getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find({});
    res.json(clinics);
  } catch (error) {
    res.json("Erro ao encontrar clinicas!", error);
  }
};

//CRIAR NOVA CLÍNICA
export const createClinic = async (req, res) => {
  const { name, adress, especialty } = req.body;

  if (!name || !adress || !especialty) {
    res.json("Preencha todos os campos!");
    return;
  }

  const clinicExists = await Clinic.find({ adress, especialty });

  if (clinicExists.length > 0) {
    res.json({ message: "Clínica ja existe!" });
    return;
  }

  try {
    const newClinic = await Clinic.create({
      name,
      adress,
      especialty,
    });
    res.status(200).json({ message: "Clínica criada!", newClinic });
  } catch (error) {
    console.error("Falha ao criar nova clinica!", error);
  }
};
