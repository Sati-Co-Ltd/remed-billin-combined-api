import { NextFunction, Request, Response } from "express";
import { inputReMED } from "./dto/inputDto";
import validationService from "./validation.service";

const validationSCTDxAndSCTProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = req.body as inputReMED;

        const result = await validationService.validateSCTDxAndSCTProduct(
            payload
        );

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const aiaInputValidationSCTDxAndSCTProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = req.body as { input: string };
        const prepInput = payload.input.split(",").map((i) => i.trim());

        interface Concept {
            sctId: string;
            value: string;
        }

        const prepPayload: Concept[] = [];

        for (const item of prepInput) {
            const code_start = item.indexOf("[") + 1;
            const code_end = item.indexOf("]");
            const description_start = item.indexOf("#") + 1;

            const code = item.slice(code_start, code_end);
            const description = item.slice(description_start).trim();

            prepPayload.push({
                sctId: code,
                value: description,
            });
        }

        const relateResult = await validationService.validateSCTDxAndSCTProduct(
            {
                diagnosis: prepPayload,
                product: prepPayload,
            }
        );

        const aiaOutput = relateResult.relate
            .map((i) => {
                return `SNOMEDCT_US[${i.sctId}] # ${i.value} : ${i.product
                    .map((j) => `SNOMEDCT_US[${j.sctId}] # ${j.value ?? "-"}`)
                    .join(", ")}`;
            })
            .join(", ");
        res.json({
            output: aiaOutput,
        });
    } catch (error) {
        next(error);
    }
};

const validationController = {
    validationSCTDxAndSCTProduct,
    aiaInputValidationSCTDxAndSCTProduct,
};

export default validationController;
