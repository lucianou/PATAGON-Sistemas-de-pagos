import express from "express";
import { Router } from "express";

import { 
  loginUser,
  registerUser} 
from "../controllers/authControllers.js";


const router = express.Router();


router.get("/user", loginUser);
router.post("/user", registerUser);

export {router as AuthRouter}