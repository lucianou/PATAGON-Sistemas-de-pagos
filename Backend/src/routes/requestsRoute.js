import express from "express";
import upload from '../config/multerConfig.js';


import{addRequest, requests} from "../controllers/requestsController.js"
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/requests", authenticateToken, authorizeRoles('Administrador', 'Revisor', 'Co-admin'), requests);
router.post('/addRequest', upload.fields([
    { name: 'upload-application', maxCount: 1 },
    { name: 'upload-public-key', maxCount: 1 }
]), addRequest);

export {router as RequestsRouter}