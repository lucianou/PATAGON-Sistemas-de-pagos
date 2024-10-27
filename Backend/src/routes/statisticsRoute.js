import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";
import { getUsersStats } from "../controllers/statisticsController.js";

const router = express.Router();

router.get("/get-users-stats", getUsersStats);

export {router as StatisticsRouter}