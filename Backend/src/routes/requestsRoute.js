import express from "express";
import upload from '../config/multerConfig.js';


import{addRequest, requests} from "../controllers/requestsController.js"
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/requests", authenticateToken, authorizeRoles('Administrador', 'Revisor', 'Co-admin'), requests);
router.post('/addRequest', upload.fields([
    { name: 'documento_pdf', maxCount: 1 },
    { name: 'documento_pub', maxCount: 1 }
]), addRequest);
//router.post("/addRequest", addRequest);


export {router as RequestsRouter}