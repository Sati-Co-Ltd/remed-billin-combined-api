export type inputReMED = {
    expense: {
        sctId: string; // code of medicine, product
        value?: string;
    }[];
    indication: {
        // Accept both diagnosis and procedure code
        sctId: string; // code of diagnosis and procedure
        value?: string;
    }[];
};
