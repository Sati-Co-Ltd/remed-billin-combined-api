import { isUndefined } from "lodash";
import { inputReMED } from "./dto/inputDto";
import { sctDxSctMed } from "./repo/sctDxSctMed";

const validateSCTDxAndSCTProduct = async (payload: inputReMED) => {
    try {
        const { diagnosis, product } = payload;

        const flatDiagnosis = diagnosis.map((i) => i.sctId);

        const relate = (await sctDxSctMed.getMany(flatDiagnosis)).filter(
            (i) => !isUndefined(i)
        );

        return {
            relate: relate.map((i) => {
                return {
                    sctId: i?.sctId ?? "-",
                    value: i?.termReplace ?? "-",
                    product: product.filter((j) =>
                        i?.medSctId?.includes(j.sctId)
                    ),
                };
            }),
        };
    } catch (error) {
        throw error;
    }
};

const validationService = {
    validateSCTDxAndSCTProduct,
};

export default validationService;
