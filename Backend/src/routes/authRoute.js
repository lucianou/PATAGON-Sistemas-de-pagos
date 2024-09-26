import express from "express";
import { validateApiKey} from "../middleware/validateApiKey.js"
import{loginUserDB, register} from '../controllers/authControllersDB.js'
import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();


//LOGIN Y REGISTRO CON BASE DE DATOS
router.post("/login", validateApiKey, loginUserDB);
router.post("/register",validateApiKey, register);

//refreshToken
router.post("/token/refresh", refreshToken);


export {router as AuthRouter}