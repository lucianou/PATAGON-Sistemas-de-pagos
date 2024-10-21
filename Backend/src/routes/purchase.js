import express from "express";
import { crearOrden } from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/crear-orden", crearOrden);

export {router as PurchaseRouter}