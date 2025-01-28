import { createMaintenance, getBriefMaintenances, getMaintenances, getMaintenancesByCompanyId } from "@/controllers/maintenance";
import express from "express";
const maintenanceRouter = express.Router();

maintenanceRouter.post("/maintenance", createMaintenance);
maintenanceRouter.get("/maintenance", getMaintenances);
maintenanceRouter.get("/maintenance/company/:companyId", getMaintenancesByCompanyId);
maintenanceRouter.get("/maintenance/brief/:companyId", getBriefMaintenances);
// maintenanceRouter.get("/customers/:id", getCustomerById);
// maintenanceRouter.get("/api/v2/customers", getV2Customers);

export default maintenanceRouter;
