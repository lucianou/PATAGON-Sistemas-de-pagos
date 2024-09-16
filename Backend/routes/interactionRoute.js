import express from "express";
import authenticateToken from "../middleware/authenticateToken.js"

import{
    getPatagonData,
    getSolicitudes,
    addRequest,
} from "../controllers/interactionControllers.js"

import { sendEmail } from "../controllers/nodeMailer.js";


const router = express.Router();

//rutas protegidas
router.get("/",authenticateToken, getPatagonData);


router.get("/solicitudes",getSolicitudes);
router.post("/addRequest", addRequest);

router.post("/send-email",sendEmail);

export {router as interactionRouter}