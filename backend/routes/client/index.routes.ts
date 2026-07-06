import { Express } from "express";
import taskRoutes from "./task.routes";

export const clientRoutes = (app: Express) => {
  app.use("/tasks", taskRoutes);
};
