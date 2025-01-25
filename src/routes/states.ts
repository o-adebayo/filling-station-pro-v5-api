import { createState, createStation, getBriefStates, getBriefStations, getStates, getStations } from "@/controllers/states";
import express from "express";
const stateRouter = express.Router();

stateRouter.post("/states", createState);
stateRouter.get("/states", getStates);
stateRouter.get("/states/brief", getBriefStates);
stateRouter.post("/stations", createStation);
stateRouter.get("/stations", getStations);
stateRouter.get("/stations/brief", getBriefStations);
// stateRouter.get("/customers/:id", getCustomerById);
// stateRouter.get("/api/v2/customers", getV2Customers);

export default stateRouter;
