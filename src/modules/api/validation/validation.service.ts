import _ from 'lodash';
import { inputReMED } from './dto/inputDto';
import sctRemedDB from './repo/remed.db';
import sctBillinDB from './repo/billin.db';
import intersectArray from '../../../utils/intersectArray';
import { ILmdbScore, ILmdbSct } from './repo/lmdb.type';
import sctRemedScoreDB from './repo/remedScore.db';
import sctBillinScoreDB from './repo/billinScore.db';

const scoreTemplate: ILmdbScore = {
    label: true,
};

const validateSCTDxAndSCTProduct = async (input: inputReMED) => {
    try {
        const { indication, expense } = input;

        const groupedProduct = _.groupBy(expense ?? [], 'sctId');
        const flatProduct = Object.keys(groupedProduct);
        const flatDiagnosis = _.uniq((indication ?? []).map((i) => i.sctId));

        const relatedIndication = await Promise.all([
            sctRemedDB.sctDxToSctMed.getMany(flatDiagnosis),
            sctBillinDB.sctIndicationToSctConsumption.getMany(flatDiagnosis),
        ]);

        const reducedIndication = relatedIndication
            .flat()
            .filter((i): i is ILmdbSct => Boolean(i))
            .reduce(
                (acc, i) => {
                    const key = i.sctId;
                    if (key in acc) {
                        acc[key].evidence.push(...i.evidence);
                        acc[key].example.push(...i.example);
                    } else {
                        acc[key] = i;
                    }

                    return acc;
                },
                {} as Record<string, ILmdbSct>
            );
        const relate = Object.values(reducedIndication).map((indication) => {
            const intersectProduct = intersectArray(
                indication.evidence,
                flatProduct
            )
                .flatMap((p) => groupedProduct[p])
                .map((p) => {
                    const key = `${indication.sctId}:${p.sctId}`;
                    const scores =
                        sctRemedScoreDB.sctDxToSctMed.get(key) ??
                        sctBillinScoreDB.sctIndicationToSctConsumption.get(
                            key
                        ) ??
                        scoreTemplate;
                    return {
                        ...p,
                        ...scores,
                    };
                });

            return {
                sctId: indication.sctId,
                value: indication.value,
                product: intersectProduct,
            };
        });

        return relate;
    } catch (error) {
        throw error;
    }
};

const validateProduct = async (input: inputReMED) => {
    try {
        const { indication, expense } = input;

        const groupedIndication = _.groupBy(indication ?? [], 'sctId');
        const flatIndication = Object.keys(groupedIndication);
        const flatProduct = _.uniq((expense ?? []).map((i) => i.sctId));

        const relatedProduct = await Promise.all([
            sctRemedDB.sctMedToSctDx.getMany(flatProduct),
            sctBillinDB.sctConsumptionToSctIndication.getMany(flatProduct),
        ]);

        const reducedProduct = relatedProduct
            .flat()
            .filter((i): i is ILmdbSct => Boolean(i))
            .reduce(
                (acc, i) => {
                    const key = i.sctId;
                    if (key in acc) {
                        acc[key].evidence.push(...i.evidence);
                        acc[key].example.push(...i.example);
                    } else {
                        acc[key] = i;
                    }

                    return acc;
                },
                {} as Record<string, ILmdbSct>
            );

        const allProduct = Object.values(reducedProduct).map((item) => {
            const intersectIndication = intersectArray(
                item.evidence,
                flatIndication
            )
                .flatMap((p) => groupedIndication[p])
                .map((p) => {
                    const key = `${p.sctId}:${item.sctId}`;
                    const scores =
                        sctRemedScoreDB.sctDxToSctMed.get(key) ??
                        sctBillinScoreDB.sctIndicationToSctConsumption.get(
                            key
                        ) ??
                        scoreTemplate;
                    return {
                        ...p,
                        ...scores,
                    };
                });

            return {
                sctId: item.sctId,
                value: item.value,
                indication: intersectIndication,
            };
        });

        const notRelate = allProduct
            .filter((i) => i.indication.length <= 0)
            .map((i) => ({
                sctId: i.sctId,
                value: i.value,
            }));
        const relate = allProduct.filter((i) => i.indication.length > 0);

        return { relate, notRelate };
    } catch (error) {
        throw error;
    }
};

const validationService = {
    validateSCTDxAndSCTProduct,
    validateProduct,
};

export default validationService;
