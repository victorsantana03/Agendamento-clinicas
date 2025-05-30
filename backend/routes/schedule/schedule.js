import express from "express";
import {
  getSchedule,
  addShedule,
  getSchedules,
} from "../../controllers/schedule/schedule.js";

const router = express.Router();

router.get("/:id", getSchedule);
router.post("/", addShedule);
router.get("/user/:id", getSchedules);

export default router;
