import express from "express";
import {
  createProfessional,
  getProfessionals,
} from "../../controllers/professional/professional.js";

const router = express.Router();

router.post("/", createProfessional);
router.get("/", getProfessionals);

export default router;
