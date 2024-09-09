import express from "express";

import { 
  loginUser,
  registerUser} 
from "../controllers/authControllers.js";


const router = express.Router();


router.post("/userLog", loginUser);
router.post("/userReg", registerUser);

export {router as AuthRouter}