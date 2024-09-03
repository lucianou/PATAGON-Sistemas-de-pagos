import express from "express";

import{
    getPatagonData
} from "../controllers/interactionControllers.js"



const router = express.Router();


router.get("/", getPatagonData);

export {router as interactionRouter}