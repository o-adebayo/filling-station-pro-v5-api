import { createManager, getBriefManagers, getManagers, getManagersByCompanyId, getNextManagerSeq } from "@/controllers/managers";
import express from "express";
const managerRouter = express.Router();

managerRouter.post("/managers", createManager);
managerRouter.get("/managers", getManagers);
managerRouter.get("/managers/company/:companyId", getManagersByCompanyId);
managerRouter.get("/managers/brief/:companyId", getBriefManagers);
managerRouter.get("/managers/seq/:companyId", getNextManagerSeq);
// managerRouter.get("/customers/:id", getCustomerById);
// managerRouter.get("/api/v2/customers", getV2Customers);

export default managerRouter;
