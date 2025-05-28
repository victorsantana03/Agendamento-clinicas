import Professionals from "../../models/professional/professional.js";

export const getSchedule = async (req, res) => {
  const { id, slot } = req.params;

  const professional = await Professionals.findById(id);
};
