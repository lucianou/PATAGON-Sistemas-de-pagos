import express from "express";

import{
    getPatagonData,
    getSolicitudes
} from "../controllers/interactionControllers.js"


const router = express.Router();

router.get("/", getPatagonData);
router.get("/solicitudes", getSolicitudes)


export {router as interactionRouter}