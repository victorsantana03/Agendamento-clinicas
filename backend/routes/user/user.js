import express from "express";
import {
  createUser,
  getUsers,
  adminLogin,
} from "../../controllers/user/user.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.post("/admin/login", adminLogin);

export default router;
