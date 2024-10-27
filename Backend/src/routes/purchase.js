import express from "express";

import { createPayment, confirmPayment } from "../controllers/orderControllers.js";
const router = express.Router();

router.post("/create-payment", createPayment);
router.post("/confirm-payment", confirmPayment);


export {router as PurchaseRouter}