import express from "express";
import authenticateToken from "../middleware/authenticateToken.js"

import{
    getPatagonData,
    getSolicitudes,
    addRequest
} from "../controllers/interactionControllers.js"


const router = express.Router();

//rutas protegidas
router.get("/",authenticateToken, getPatagonData);
router.get("/solicitudes",getSolicitudes);


//ruta de solicitudes de usuarios
router.post("/addRequest", addRequest);

export {router as interactionRouter}