import express from "express";

import{addRequest, requests} from "../controllers/requestsController.js"

const router = express.Router();

router.get("/requests", requests);
router.post("/addRequest", addRequest);



export {router as RequestsRouter}