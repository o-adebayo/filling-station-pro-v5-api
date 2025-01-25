import { createManager, getBriefManagers, getManagers, getNextManagerSeq } from "@/controllers/managers";
import express from "express";
const managerRouter = express.Router();

managerRouter.post("/managers", createManager);
managerRouter.get("/managers", getManagers);
managerRouter.get("/managers/brief", getBriefManagers);
managerRouter.get("/managers/seq", getNextManagerSeq);
// managerRouter.get("/customers/:id", getCustomerById);
// managerRouter.get("/api/v2/customers", getV2Customers);

export default managerRouter;
