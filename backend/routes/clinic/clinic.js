import express from "express";
import { autenticarAdmin } from "../../middleware/autenticarAdmin.js";

import { createClinic, getClinics } from "../../controllers/clinic/clinic.js";

const router = express.Router();

router.get("/", getClinics);
router.post("/", autenticarAdmin, createClinic);

export default router;
