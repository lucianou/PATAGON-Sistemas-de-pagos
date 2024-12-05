import express from "express";

import { createPayment, confirmPayment , cancelPayment, createOrderMercadoPago, webhookMercadoPago, getReceipt, validateToken} from "../controllers/orderControllers.js";
const router = express.Router();

//Paypal
router.post("/create-payment", createPayment);
router.get("/confirm-payment", confirmPayment);
router.get("/cancel-payment", cancelPayment);

//MercadoPago
router.post("/create-order", createOrderMercadoPago);
// router.get("/success", successMercadoPago);
// router.get("/failure", failureMercadoPago);
// router.get("/pending", pendingMercadoPago);
router.post("/webhook", webhookMercadoPago);

//boletas
router.get("/receipt/:orderId", getReceipt);
router.get('/validate-token', validateToken);





export {router as PurchaseRouter}