import express from "express";
<<<<<<< Updated upstream
import { crearOrden, confirmarPago } from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/crear-orden", crearOrden);
router.post("/confirmacion", confirmarPago);
=======
import { createPayment, confirmPayment } from "../controllers/orderControllers.js";
const router = express.Router();


router.post("/create-payment", createPayment);
router.post("/confirm-payment", confirmPayment);

>>>>>>> Stashed changes

export {router as PurchaseRouter}