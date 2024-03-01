import { Router } from "express";
import validationRoute from "./api/validation/validation.route";

const apiRouter = Router();

apiRouter.use("/validation", validationRoute);

export default apiRouter