import { Router } from "express";
import validationController from "./validation.controller";

const validationRoute = Router();

validationRoute.post(
    "/sct-diagnosis-to-sct-product",
    validationController.validationSCTDxAndSCTProduct
);

validationRoute.post(
    "/aia-input/sct-diagnosis-to-sct-product",
    validationController.aiaInputValidationSCTDxAndSCTProduct
);

export default validationRoute;
