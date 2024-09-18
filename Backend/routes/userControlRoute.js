import express from "express";
import authenticateToken from "../middleware/authenticateToken.js"

import{ getPatagonData} from "../controllers/interactionControllers.js"

import { sendEmail } from "../controllers/nodeMailer.js";
import { newUserCreation } from "../controllers/newUserController.js";


const router = express.Router();

//rutas protegidas
router.get("/",authenticateToken, getPatagonData);

router.post("/send-email", sendEmail);
router.post("/new-user-creation", newUserCreation);


export {router as interactionRouter}