import express from "express";

import { 
  loginUser,
  registerUser,
} 
from "../controllers/authControllers.js";

import{loginUserDB} from '../controllers/authControllersDB.js'
const router = express.Router();


router.post("/userLog", loginUser);
router.post("/userReg", registerUser);

router.post("/userLogDB", loginUserDB);

export {router as AuthRouter}