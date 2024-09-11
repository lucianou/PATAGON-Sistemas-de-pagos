import express from "express";

import{
    getPatagonData,
    getSolicitudes,
    addRequest
} from "../controllers/interactionControllers.js"


const router = express.Router();

router.get("/", getPatagonData);
router.get("/solicitudes", getSolicitudes);


//ruta de solicitudes de usuarios
router.post("/addRequest", addRequest);

export {router as interactionRouter}