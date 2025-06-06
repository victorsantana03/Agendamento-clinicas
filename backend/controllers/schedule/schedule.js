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
  const { userId, professionalId, clinicId, date, slot } = req.body;

  if ((!userId || !professionalId || !date || !clinicId, !slot)) {
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
      clinicId,
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

//Lista agendamentos do usuário
export const getSchedules = async (req, res) => {
  const { id } = req.params;

  try {
    const schedules = await Schedule.find({ userId: id });
    if (schedules.length === 0) {
      return res.json("Nenhum agendamento encontrado!");
    }
    //BUSCA OS PROFISSIONAIS RELACIONADOS AOS AGENDAMENTOS
    const professionalId = schedules.map((schedule) =>
      schedule.professionalId.toString()
    );
    const professionals = await Professional.find({
      _id: { $in: professionalId },
    });

    //BUSCA AS CLÍNICAS RELACIONADAS AOS AGENDAMENTOS
    const clinicId = schedules.map((schedule) => schedule.clinicId.toString());
    const clinics = await Clinic.find({ _id: { $in: clinicId } });

    //PERCORRE OS AGENDAMENTOS E ASSOCIA OS PROFISSIONAIS E CLÍNICAS
    const result = schedules.map((schedule) => {
      const professional = professionals.find(
        (prof) => prof._id.toString() === schedule.professionalId.toString()
      );

      const clinic = clinics.find(
        (cli) => cli._id.toString() === schedule.clinicId.toString()
      );

      return {
        _id: schedule._id,
        userId: schedule.userId,
        professional: professional,
        clinic: clinic,
        date: schedule.date,
        slot: schedule.slot,
        status: schedule.status,
      };
    });

    res.json({ message: "Agendamentos encontrados!", schedules: result });
  } catch (error) {
    console.error("Erro ao listar agendamentos!", error);
    res.status(500).json("Erro ao listar agendamentos!");
  }
};

//Cancelar agendamento
export const cancelSchedule = async (req, res) => {
  const { scheduleId } = req.params;

  if (!scheduleId) {
    res.json({ message: "Id do agendamento não informado!" });
    return;
  }

  const schedule = await Schedule.findById(scheduleId);
  if (!schedule) {
    res.json({ message: "Agendamento não encontrado!" });
    return;
  }

  try {
    schedule.status = "cancelado";
    await schedule.save();
    res.json({ message: "Agendamento cancelado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cancelar agendamneto!", error);
    res.json({ message: "Erro ao cancelar agendamento!" });
  }
};

//Deletar agendamento
export const deleteSchedule = async (req, res) => {
  const { scheduleId } = req.params;

  if (!scheduleId) {
    res.json({ message: "Id do agendamento não informado!" });
    return;
  }

  try {
    const schedule = await Schedule.findByIdAndDelete(scheduleId);
    if (!schedule) {
      res.json({ message: "Agendamento não encontrado!" });
      return;
    }
    res.json({ message: "Agendamento deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar agendamento!", error);
    res.status(500).json("Erro ao deletar agendamento!");
  }
};
