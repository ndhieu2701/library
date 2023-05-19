import express from "express";
import { userSignin, userSignup } from "../controller/userController.js";
const router = express.Router();

router.post("/signin", userSignin);
router.post("/signup", userSignup);

export default router;
