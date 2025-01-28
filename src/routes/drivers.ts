import { createDriver, getBriefDrivers, getDrivers, getDriversByCompanyId, getNextDriverSeq } from "@/controllers/drivers";
import express from "express";
const driverRouter = express.Router();

driverRouter.post("/drivers", createDriver);
driverRouter.get("/drivers", getDrivers);
driverRouter.get("/drivers/company/:companyId", getDriversByCompanyId);
driverRouter.get("/drivers/seq/:companyId", getNextDriverSeq);
driverRouter.get("/drivers/brief/:companyId", getBriefDrivers);
// driverRouter.get("/customers/:id", getCustomerById);
// driverRouter.get("/api/v2/customers", getV2Customers);

export default driverRouter;
