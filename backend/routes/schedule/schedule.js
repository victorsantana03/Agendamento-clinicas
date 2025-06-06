import express from "express";
import {
  getSchedule,
  addShedule,
  getSchedules,
  cancelSchedule,
  deleteSchedule,
} from "../../controllers/schedule/schedule.js";

const router = express.Router();

router.get("/:id", getSchedule);
router.post("/", addShedule);
router.get("/user/:id", getSchedules);
router.put("/cancel/:scheduleId", cancelSchedule);
router.delete("/delete/:scheduleId", deleteSchedule);

export default router;
