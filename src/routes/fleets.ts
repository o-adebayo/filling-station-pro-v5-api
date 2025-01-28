import { createFleet, getBriefFleets, getFleets, getFleetsByCompanyId } from "@/controllers/fleets";
import express from "express";
const fleetRouter = express.Router();

fleetRouter.post("/fleets", createFleet);
fleetRouter.get("/fleets", getFleets);
fleetRouter.get("/fleets/company/:companyId", getFleetsByCompanyId);
fleetRouter.get("/fleets/brief/:companyId", getBriefFleets);
//fleetRouter.get("/drivers/seq", getNextDriverSeq);
// fleetRouter.get("/customers/:id", getCustomerById);
// fleetRouter.get("/api/v2/customers", getV2Customers);

export default fleetRouter;
