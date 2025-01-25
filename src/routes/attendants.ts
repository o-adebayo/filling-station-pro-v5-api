import { createAttendant, getAttendants, getBriefAttendants, getNextAttendantSeq } from "@/controllers/attendants";
import express from "express";
const attendantRouter = express.Router();

attendantRouter.post("/attendants", createAttendant);
attendantRouter.get("/attendants", getAttendants);
attendantRouter.get("/attendants/brief", getBriefAttendants);
attendantRouter.get("/attendants/seq", getNextAttendantSeq);
// attendantRouter.get("/customers/:id", getCustomerById);
// attendantRouter.get("/api/v2/customers", getV2Customers);

export default attendantRouter;
