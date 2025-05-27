import express from "express";

import { createClinic, getClinics } from "../../controllers/clinic/clinic.js";

const router = express.Router();

router.get("/", getClinics);
router.post("/", createClinic);

export default router;
