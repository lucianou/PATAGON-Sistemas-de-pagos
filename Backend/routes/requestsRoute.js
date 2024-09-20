import express from "express";
import upload from '../controllers/multerConfig.js';


import{addRequest, requests} from "../controllers/requestsController.js"

const router = express.Router();

router.get("/requests", requests);
router.post("/addRequest", upload.fields([{ name: 'documento_pdf' }, { name: 'documento_pub' }]), addRequest);



export {router as RequestsRouter}