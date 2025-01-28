import { createContact, getContacts } from "@/controllers/admin";
import { getAnalyticsByCompanyId } from "@/controllers/analytics";
import express from "express";
const analyticsRouter = express.Router();

//analyticsRouter.post("/contacts", createContact);
analyticsRouter.get("/analytics/company/:companyId", getAnalyticsByCompanyId);
// analyticsRouter.get("/customers/:id", getCustomerById);
// analyticsRouter.get("/api/v2/customers", getV2Customers);

export default analyticsRouter;
