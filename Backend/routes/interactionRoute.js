import express from "express";
import authenticateToken from "../middleware/authenticateToken.js"

import{
    getPatagonData,
    getSolicitudes,
    addRequest,
} from "../controllers/interactionControllers.js"

import { sendEmail } from "../controllers/nodeMailer.js";
import { newUserCreation } from "../controllers/newUserController.js";


const router = express.Router();

//rutas protegidas
router.get("/",authenticateToken, getPatagonData);

//Solicitudes locales
router.get("/solicitudes",getSolicitudes);
router.post("/addRequest", addRequest);

//Envio de correo
router.post("/send-email",sendEmail);


//Creación de usuario por solicitud
router.post("/new-user-creation", newUserCreation);
export {router as interactionRouter}