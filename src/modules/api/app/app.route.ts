import { Router } from "express";
import appController from "modules/api/app/app.controller";
const appRoute = Router();

appRoute.post("/", appController.create);
appRoute.get("/", appController.getUsage);

export default appRoute;
