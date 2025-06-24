import express from "express";
import {
  createUser,
  getUser,
  adminLogin,
  loginUser,
} from "../../controllers/user/user.js";

const router = express.Router();

router.post("/", createUser);
router.get("/profile", getUser);
router.post("/admin/login", adminLogin);
router.post("/login", loginUser);

export default router;
