import express from "express";
import { crearOrden, confirmarPago } from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/crear-orden", crearOrden);
router.post("/confirmacion", confirmarPago);

export {router as PurchaseRouter}