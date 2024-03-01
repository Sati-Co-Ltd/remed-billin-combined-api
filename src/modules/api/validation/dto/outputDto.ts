export type outputReMED = {
    relate: {
        // code which is related to evidence.
        sctId: string; // code of validation target
        value: string; // value (description) of target
        medicine: {
            // evidence that supports correlation
            sctId: string; // code of evidence
            value: string; // value (description) of evidence
        }[];
    }[];
};
