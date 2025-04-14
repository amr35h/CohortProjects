import express from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.post("/me", isLoggedIn, getMe);
router.post("/logout", isLoggedIn, logoutUser);

export default router;
