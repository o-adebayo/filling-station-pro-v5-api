import { createDriver, getBriefDrivers, getDrivers, getNextDriverSeq } from "@/controllers/drivers";
import express from "express";
const driverRouter = express.Router();

driverRouter.post("/drivers", createDriver);
driverRouter.get("/drivers", getDrivers);
driverRouter.get("/drivers/seq", getNextDriverSeq);
driverRouter.get("/drivers/brief", getBriefDrivers);
// driverRouter.get("/customers/:id", getCustomerById);
// driverRouter.get("/api/v2/customers", getV2Customers);

export default driverRouter;
