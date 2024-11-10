import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";
import { getProducts, getProductById, getTimeRemaining } from "../controllers/productsController.js";

const router = express.Router();

router.get("/get-products", authenticateToken, authorizeRoles('Administrador', 'Cliente', 'Revisor', 'Co-admin'), getProducts);
router.get("/get-product/:id",  authenticateToken, authorizeRoles('Administrador', 'Cliente', 'Revisor', 'Co-admin'), getProductById);
router.get("/get-time-remaining", getTimeRemaining);

export {router as ProductsRouter}