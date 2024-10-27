import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";
import { getPdf, getPub } from "../controllers/filesController.js";

const router = express.Router();

router.get("/viewPDF/:id", authenticateToken, authorizeRoles('Administrador', 'Revisor', 'Co-admin'), getPdf);
router.get("/viewPUB/:id", authenticateToken, authorizeRoles('Administrador', 'Revisor', 'Co-admin'), getPub);

export {router as FilesRouter}