import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js";
import { getUsersStats , getUsersStatsWeek, getUsersStats3Months, getGananciasTotales, getIngresos
  , getIngresoUsuario, dashboardStats
} from "../controllers/statisticsController.js";

const router = express.Router();

//usuarios
router.get("/get-users-stats", authenticateToken, authorizeRoles('Administrador', 'Revisor', 'Co-admin'), getUsersStats);
router.get("/get-users-stats-week", authorizeRoles('Administrador', 'Revisor', 'Co-admin'),getUsersStatsWeek);
router.get("/get-users-stats-3months", authorizeRoles('Administrador', 'Revisor', 'Co-admin'),getUsersStats3Months);

//transacciones
router.get("/get-total-gains", authorizeRoles('Administrador', 'Revisor', 'Co-admin'), getGananciasTotales);
router.get("/get-ingresos",authorizeRoles('Administrador', 'Revisor', 'Co-admin'), getIngresos);
router.get("/get-ingreso-usuario", getIngresoUsuario);
router.get("/dashboard-stats", dashboardStats);

export {router as StatisticsRouter}