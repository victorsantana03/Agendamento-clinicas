import { Professional } from "../../models/professional/professional.js";
import { Clinic } from "../../models/clinic/clinic.js";

//CRIAR NOVO PROFISSIONAL LIGADO A UMA CLÍNICA
export const createProfessional = async (req, res) => {
  const { name, especialty, clinicId, agenda } = req.body;

  if (!name || !especialty || !clinicId) {
    res.status(400).json("Preencha todos os campos!");
    return;
  }
  //VERIFICA SE A CLÍNICA EXISTE
  const clinicIdExist = await Clinic.findById(clinicId);

  if (!clinicIdExist) {
    res.status(404).json("Clínica não encontrada!");
    return;
  }
  try {
    const newProfessional = await Professional.create({
      name,
      especialty,
      clinicId,
      agenda: agenda || [],
    });
    res.status(201).json("Profissional criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar profissional", error);
    res.status(500).json("Erro ao criar profissional");
  }
};

//LISTAR PROFISSIONAIS POR UMA CLÍNICA
export const getProfessionals = async (req, res) => {
  const { clinicId } = req.query;
  if (!clinicId) {
    res
      .status(400)
      .json("Selecione uma clínica para visualizar os profissionais");
    return;
  }
  try {
    const professional = await Professional.find({ clinicId });
    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json("Erro ao buscar profissionais", error);
  }
};
