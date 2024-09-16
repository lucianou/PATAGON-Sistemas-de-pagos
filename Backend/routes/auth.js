import express from "express";

import { 
  loginUser,
  registerUser,
} 
from "../controllers/authControllers.js";

import{loginUserDB, register} from '../controllers/authControllersDB.js'
const router = express.Router();


router.post("/userLog", loginUser);
router.post("/userReg", registerUser);

//LOGIN Y REGISTRO EN BASE DE DATOS
router.post("/userLogDB", loginUserDB);
router.post("/register", register);

export {router as AuthRouter}