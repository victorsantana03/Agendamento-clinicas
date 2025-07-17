import { autenticarAdmin } from "../../middleware/autenticarAdmin.js";

import express from "express";
import {
  createProfessional,
  getProfessionals,
} from "../../controllers/professional/professional.js";

const router = express.Router();

router.post("/", autenticarAdmin, createProfessional);
router.get("/", getProfessionals);

export default router;
