import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";
import { getUsersStats , getUsersStatsWeek, getUsersStats3Months} from "../controllers/statisticsController.js";

const router = express.Router();

router.get("/get-users-stats", getUsersStats);
router.get("/get-users-stats-week", getUsersStatsWeek);
router.get("/get-users-stats-3months", getUsersStats3Months);

export {router as StatisticsRouter}