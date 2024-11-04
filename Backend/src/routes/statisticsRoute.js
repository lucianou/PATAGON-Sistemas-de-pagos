import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";
import { getUsersStats , getUsersStatsWeek, getUsersStats3Months, getGananciasTotales} from "../controllers/statisticsController.js";

const router = express.Router();

router.get("/get-users-stats", getUsersStats);
router.get("/get-users-stats-week", getUsersStatsWeek);
router.get("/get-users-stats-3months", getUsersStats3Months);
router.get("/get-total-gains", getGananciasTotales);

export {router as StatisticsRouter}