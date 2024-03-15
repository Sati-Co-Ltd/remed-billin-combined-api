import { Router } from 'express';
import validationController from './validation.controller';
import snapInputAndResult from 'middleware/snapInputAndResult';
import incrementUsage from 'middleware/incrementUsage';

const validationRoute = Router();

validationRoute.post(
    '/sct-indication-to-sct-expense',
    snapInputAndResult,
    incrementUsage,
    validationController.validationSCTDxAndSCTProduct
);

validationRoute.post(
    '/sct-expense-to-sct-indication',
    snapInputAndResult,
    incrementUsage,
    validationController.validationProductByIndication
);

validationRoute.post(
    '/aia-input/sct-indication-to-sct-expense',
    snapInputAndResult,
    incrementUsage,
    validationController.aiaInputValidationSCTDxAndSCTProduct
);

export default validationRoute;
