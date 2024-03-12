import { Router } from "express";
import validationController from "./validation.controller";
import snapInputAndResult from "middleware/snapInputAndResult";
import incrementUsage from "middleware/increamentUsage";

const validationRoute = Router();

validationRoute.post(
    "/sct-diagnosis-to-sct-product",
    snapInputAndResult,
    incrementUsage,
    validationController.validationSCTDxAndSCTProduct,
);

validationRoute.post(
    "/aia-input/sct-diagnosis-to-sct-product",
    snapInputAndResult,
    incrementUsage,
    validationController.aiaInputValidationSCTDxAndSCTProduct,
);

export default validationRoute;
