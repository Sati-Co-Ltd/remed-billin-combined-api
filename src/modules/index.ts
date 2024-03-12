import { Router } from "express";
import validationRoute from "./api/validation/validation.route";
import appRoute from "modules/api/app/app.route";
import { verifyApiKey } from "middleware/verifyApiKey";

const apiRouter = Router();

apiRouter.use("/app", appRoute);

apiRouter.use("/validation", verifyApiKey, validationRoute);

export default apiRouter;
