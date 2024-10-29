import express from "express";

import { createPayment, confirmPayment , cancelPayment} from "../controllers/orderControllers.js";
const router = express.Router();

router.post("/create-payment", createPayment);
router.get("/confirm-payment", confirmPayment);
router.get("/cancel-payment", cancelPayment);



export {router as PurchaseRouter}