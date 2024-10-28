import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";
import { getUsersStats , getUsersStatsWeek} from "../controllers/statisticsController.js";

const router = express.Router();

router.get("/get-users-stats", getUsersStats);
router.get("/get-users-stats-week", getUsersStatsWeek);

export {router as StatisticsRouter}