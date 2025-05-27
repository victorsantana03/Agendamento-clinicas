import { Professional } from "../../models/professional/professional.js";
import { Clinic } from "../../models/clinic/clinic.js";

//CRIAR NOVO PROFISSIONAL LIGADO A UMA CLÍNICA
export const createProfessional = async (req, res) => {
  const { name, especialty, clinicId, agenda } = req.body;

  if (!name || !especialty || !clinicId) {
    res.json("Preencha todos os campos!");
    return;
  }
  //VERIFICA SE A CLÍNICA EXISTE
  const clinicIdExist = await Clinic.findById(clinicId);

  if (!clinicIdExist) {
    res.json("Clínica não encontrada!");
    return;
  }
  try {
    const newProfessional = await Professional.create({
      name,
      especialty,
      clinicId,
      agenda: agenda || [],
    });
    res.json(newProfessional);
  } catch (error) {
    console.error("Erro ao criar profissional", error);
  }
};

//LISTAR PROFISSIONAIS POR UMA CLÍNICA
export const getProfessionals = async (req, res) => {
  const { clinicId } = req.query;
  if (!clinicId) {
    res.json("Selecione uma clínica para visualizar os profissionais");
    return;
  }
  try {
    const professional = await Professional.find({ clinicId });
    res.json(professional);
  } catch (error) {
    res.json("Erro ao buscar profissionais", error);
  }
};
