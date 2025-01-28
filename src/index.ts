import express from "express";
import companyRouter from "./routes/company";
import adminRouter from "./routes/admin";
import stateRouter from "./routes/states";
import userRouter from "./routes/users";
import driverRouter from "./routes/drivers";
import fleetRouter from "./routes/fleets";
import maintenanceRouter from "./routes/maintenance";
import managerRouter from "./routes/managers";
import attendantRouter from "./routes/attendants";
import analyticsRouter from "./routes/analytics";

require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
});

app.use("/api/v1", companyRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", stateRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", driverRouter);
app.use("/api/v1", fleetRouter);
app.use("/api/v1", maintenanceRouter);
app.use("/api/v1", managerRouter);
app.use("/api/v1", attendantRouter);
app.use("/api/v1", analyticsRouter);

