import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";
import { getUsersStats , getUsersStatsWeek, getUsersStats3Months, getGananciasTotales, getIngresos
  , getIngresoUsuario, dashboardStats
} from "../controllers/statisticsController.js";

const router = express.Router();

//usuarios
router.get("/get-users-stats", getUsersStats);
router.get("/get-users-stats-week",getUsersStatsWeek);
router.get("/get-users-stats-3months",getUsersStats3Months);

//transacciones
router.get("/get-total-gains", getGananciasTotales);
router.get("/get-ingresos", getIngresos);
router.get("/get-ingreso-usuario", getIngresoUsuario);
router.get("/dashboard-stats", dashboardStats);

export {router as StatisticsRouter}