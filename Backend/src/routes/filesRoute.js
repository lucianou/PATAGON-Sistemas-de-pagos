import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";
import { getPdf, getPub , getPUBKey} from "../controllers/filesController.js";

const router = express.Router();

router.get("/viewPDF/:id", authenticateToken, authorizeRoles('Administrador', 'Revisor', 'Co-admin'), getPdf);
router.get("/viewPUB/:id", authenticateToken, authorizeRoles('Administrador', 'Revisor', 'Co-admin'), getPub);
router.get("/get-pub-key/:id", authenticateToken, authorizeRoles('Administrador', 'Revisor', 'Co-admin'), getPUBKey);
export {router as FilesRouter}