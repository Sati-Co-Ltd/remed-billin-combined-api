import { isUndefined } from "lodash";
import { inputReMED } from "./dto/inputDto";
import { sctDxSctMed } from "./repo/sctDxSctMed";
import { sctProcedureSctDevice } from "./repo/sctProcedureSctDevice";

const validateSCTDxAndSCTProduct = async (input: inputReMED) => {
    try {
        const { diagnosis, product } = input;

        const flatDiagnosis = diagnosis.map((i) => i.sctId);
        const flatProduct = product.map((i) => i.sctId);

        const remedRelate = (await sctDxSctMed.getMany(flatDiagnosis)).filter(
            (i) => !isUndefined(i)
        );

        const billInRelateDx = (
            await sctProcedureSctDevice.getMany([
                ...flatDiagnosis,
                ...flatProduct,
            ])
        ).filter((i) => !isUndefined(i));

        const relate = diagnosis
            .filter((i) => remedRelate.some((j) => j?.sctId === i.sctId))
            .map((i) => {
                const existRemedRelate = remedRelate.find(
                    (j) => j?.sctId === i.sctId
                );

                const existBillInRelate = billInRelateDx.find(
                    (j) => j?.sctId === i.sctId
                );

                const relateMed: string[] = [];

                if (!isUndefined(existRemedRelate)) {
                    relateMed.push(...existRemedRelate.evidence);
                }

                if (!isUndefined(existBillInRelate)) {
                    relateMed.push(...existBillInRelate.evidence);
                }

                return {
                    sctId: i.sctId,
                    value: i.value,
                    product: product.filter((j) => relateMed.includes(j.sctId)),
                };
            });

        const notRelate = input.diagnosis.filter((i) => {
            return !remedRelate.some((j) => j?.sctId === i.sctId);
        });

        return {
            relate,
            notRelate,
        };
    } catch (error) {
        throw error;
    }
};

const validationService = {
    validateSCTDxAndSCTProduct,
};

export default validationService;
