import { createCompany, getCompanies, getCompanyById } from "@/controllers/companies";
import express from "express";
const companyRouter = express.Router();

companyRouter.post("/companies", createCompany);
companyRouter.get("/companies", getCompanies);
companyRouter.get("/companies/:id", getCompanyById);
// companyRouter.get("/customers/:id", getCustomerById);
// companyRouter.get("/api/v2/customers", getV2Customers);

export default companyRouter;
