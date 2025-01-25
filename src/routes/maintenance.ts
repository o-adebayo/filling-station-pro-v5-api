import { createMaintenance, getBriefMaintenances, getMaintenances } from "@/controllers/maintenance";
import express from "express";
const maintenanceRouter = express.Router();

maintenanceRouter.post("/maintenance", createMaintenance);
maintenanceRouter.get("/maintenance", getMaintenances);
maintenanceRouter.get("/maintenance/brief", getBriefMaintenances);
// maintenanceRouter.get("/customers/:id", getCustomerById);
// maintenanceRouter.get("/api/v2/customers", getV2Customers);

export default maintenanceRouter;
