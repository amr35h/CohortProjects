import express from "express";

const app = express();

//router imports
import healthCheckRouter from "./routes/healthcheck.routes.js";
import userRoutes from "./routes/auth.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users", userRoutes);

export default app;
