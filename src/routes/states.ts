import { createState, createStation, getBriefStates, getBriefStations, getStates, getStatesByCompanyId, getStations, getStationsByCompanyId } from "@/controllers/states";
import express from "express";
const stateRouter = express.Router();

stateRouter.post("/states", createState);
stateRouter.get("/states", getStates);
stateRouter.get("/states/company/:companyId", getStatesByCompanyId);
stateRouter.get("/states/brief/:companyId", getBriefStates);
stateRouter.post("/stations", createStation);
stateRouter.get("/stations", getStations);
stateRouter.get("/stations/company/:companyId", getStationsByCompanyId);
stateRouter.get("/stations/brief/:companyId", getBriefStations);
// stateRouter.get("/customers/:id", getCustomerById);
// stateRouter.get("/api/v2/customers", getV2Customers);

export default stateRouter;
