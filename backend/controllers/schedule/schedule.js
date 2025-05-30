import { Professional } from "../../models/professional/professional.js";
import { Clinic } from "../../models/clinic/clinic.js";
import { Schedule } from "../../models/schedule/schedule.js";

//Confirmar agendamento
export const getSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const professional = await Professional.findById(id);

    if (!professional) {
      res.json("Profissional não encontrado!");
    }

    const clinic = await Clinic.findOne({ _id: professional.clinicId });

    if (!clinic) {
      return res.json("Clínica não encontrada!");
    }
    res.json({
      professional,
      clinic,
    });
  } catch (error) {
    console.error("Erro ao Agendar!", error);
    res.status(500).json("Erro ao Agendar!");
  }
};

//Adicionar agendamento
export const addShedule = async (req, res) => {
  const { userId, professionalId, date, slot } = req.body;

  if (!userId || !professionalId || !date || !slot) {
    res.json("Preencha todos os campos!");
  }

  const scheduleExists = await Schedule.findOne({ userId, professionalId });
  if (scheduleExists) {
    res.json({ message: "Você já tem um agendamento com esse profissional!" });
    return;
  }

  const dateExists = await Schedule.findOne({ userId, date, slot });
  if (dateExists) {
    res.json({ message: "Você já tem um agendamento nesse dia e horário!" });
    return;
  }

  try {
    const newSchedule = await Schedule.create({
      userId,
      professionalId,
      date,
      slot,
    });
    res.json({
      message: "Agendamento confirmado!",
      schedule: newSchedule,
    });
  } catch (error) {
    console.error("Erro ao adicionar agendamento!", error);
    res.json({ message: "Erro ao adicionar agendamento!", error: error });
  }
};

//Lista agendmentos do usuário

export const getSchedules = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const schedules = await Schedule.find({ userId: id });
    if (schedules.length === 0) {
      return res.json("Nenhum agendamento encontrado!");
    }
    res.json(schedules);
  } catch (error) {
    console.error("Erro ao listar agendamentos!", error);
    res.status(500).json("Erro ao listar agendamentos!");
  }
};
