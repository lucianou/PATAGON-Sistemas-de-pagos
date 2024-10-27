import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";
import { getProducts, getProductById } from "../controllers/productsController.js";

const router = express.Router();

router.get("/get-products", authenticateToken, authorizeRoles('Administrador', 'Cliente', 'Revisor', 'Co-admin'), getProducts);
router.get("/get-product/:id",  authenticateToken, authorizeRoles('Administrador', 'Cliente', 'Revisor', 'Co-admin'), getProductById);

export {router as ProductsRouter}