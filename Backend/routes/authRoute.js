import express from "express";

import { loginUser, registerUser,} from "../controllers/authControllers.js";
import { validateApiKey} from "../middleware/validateApiKey.js"

import{loginUserDB, register} from '../controllers/authControllersDB.js'
const router = express.Router();

//LOGIN Y REGISTRO CON JSON
router.post("/userLog", loginUser);
router.post("/userReg", registerUser);

//LOGIN Y REGISTRO CON BASE DE DATOS
router.post("/login", validateApiKey, loginUserDB);
router.post("/register", register);

export {router as AuthRouter}